/**
 * LiveKit token + explicit agent dispatch (LiveKit Cloud).
 * Same env as backend: LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET, optional LIVEKIT_ROOM_NAME, LIVEKIT_AGENT_NAME.
 */
import express from 'express';
import dotenv from 'dotenv';
import { AccessToken, AgentDispatchClient, RoomServiceClient } from 'livekit-server-sdk';

dotenv.config({ path: '.env.local' });

try {
  process.stdin.resume();
} catch {
  /* ignore */
}

const app = express();
const port = Number(process.env.ADVISOR_API_PORT || 8787);

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL?.trim();

/** Server SDK (RoomService, AgentDispatch) expects `https://…`; browser client still uses `wss://…`. */
function livekitUrlForServerSdk(url) {
  if (!url) return url;
  return url.replace(/^wss:\/\//i, 'https://').replace(/^ws:\/\//i, 'http://');
}

const LIVEKIT_URL_SERVER = livekitUrlForServerSdk(LIVEKIT_URL) || LIVEKIT_URL;
const LIVEKIT_ROOM =
  process.env.LIVEKIT_ROOM_NAME || process.env.LIVEKIT_ROOM || 'roomName';
const LIVEKIT_AGENT_NAME = process.env.LIVEKIT_AGENT_NAME || 'advisor-voice';

async function createParticipantToken(userInfo, roomName) {
  const at = new AccessToken(API_KEY, API_SECRET, userInfo);
  at.ttl = '5m';
  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
  });
  return at.toJwt();
}

async function ensureRoomAndAgentDispatch() {
  if (process.env.LIVEKIT_SKIP_AGENT_DISPATCH === '1') {
    return;
  }
  const roomSvc = new RoomServiceClient(LIVEKIT_URL_SERVER, API_KEY, API_SECRET);
  const dispatchSvc = new AgentDispatchClient(LIVEKIT_URL_SERVER, API_KEY, API_SECRET);

  try {
    await roomSvc.createRoom({ name: LIVEKIT_ROOM, emptyTimeout: 600 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (!/already exists|already exist|duplicate|identical|409/i.test(msg)) {
      console.warn('[api] createRoom:', msg);
    }
  }

  // Each `createDispatch` adds another worker job for the same room. Re-fetching the
  // token (reload, dev HMR, multiple tabs) stacks dispatches so several agents subscribe
  // to the same mic — duplicate LLM/TTS work and confusing "no response" / races.
  const dedup =
    process.env.LIVEKIT_AGENT_DISPATCH_DEDUP !== '0' &&
    process.env.LIVEKIT_LEGACY_AGENT_DISPATCH !== '1';
  if (dedup) {
    try {
      const dispatches = await dispatchSvc.listDispatch(LIVEKIT_ROOM);
      for (const d of dispatches) {
        if (d.agentName !== LIVEKIT_AGENT_NAME) continue;
        await dispatchSvc.deleteDispatch(d.id, LIVEKIT_ROOM);
        console.log(`[api] removed prior dispatch ${d.id} for agent=${LIVEKIT_AGENT_NAME}`);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn('[api] list/delete agent dispatches:', msg);
    }
  }

  try {
    await dispatchSvc.createDispatch(LIVEKIT_ROOM, LIVEKIT_AGENT_NAME);
    console.log(`[api] agent dispatch: room=${LIVEKIT_ROOM} agent=${LIVEKIT_AGENT_NAME}`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (/already|duplicate|exists|409|conflict/i.test(msg)) {
      console.log('[api] agent dispatch skipped:', msg);
    } else {
      console.warn('[api] createDispatch:', msg);
    }
  }
}

app.get('/api/connection-details', async (_req, res) => {
  try {
    if (!API_KEY || !API_SECRET || !LIVEKIT_URL) {
      res.status(500).json({
        error: 'Missing LIVEKIT_API_KEY, LIVEKIT_API_SECRET, or LIVEKIT_URL in .env.local',
      });
      return;
    }

    await ensureRoomAndAgentDispatch();

    const participantIdentity = `voice_assistant_user_${Math.round(Math.random() * 10_000)}`;
    const participantToken = await createParticipantToken(
      { identity: participantIdentity },
      LIVEKIT_ROOM,
    );

    res.json({
      serverUrl: LIVEKIT_URL,
      roomName: LIVEKIT_ROOM,
      participantName: participantIdentity,
      participantToken,
      livekitAgentName: LIVEKIT_AGENT_NAME,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).send(error.message);
      return;
    }
    res.status(500).json({ error: 'Unknown error' });
  }
});

app.listen(port, () => {
  console.log(`Advisor API http://localhost:${port} (room=${LIVEKIT_ROOM} agent=${LIVEKIT_AGENT_NAME})`);
});
