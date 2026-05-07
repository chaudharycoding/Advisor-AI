import express from 'express';
import dotenv from 'dotenv';
import { AccessToken } from 'livekit-server-sdk';

dotenv.config({ path: '.env.local' });

const app = express();
const port = Number(process.env.ADVISOR_API_PORT || 8787);

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

app.get('/api/connection-details', async (_req, res) => {
  try {
    if (!API_KEY || !API_SECRET || !LIVEKIT_URL) {
      res.status(500).json({
        error: 'Missing LIVEKIT_API_KEY, LIVEKIT_API_SECRET, or LIVEKIT_URL in .env.local',
      });
      return;
    }

    const participantIdentity = `voice_assistant_user_${Math.round(Math.random() * 10_000)}`;
    const token = new AccessToken(API_KEY, API_SECRET, { identity: participantIdentity });

    token.ttl = '5m';
    token.addGrant({
      room: 'roomName',
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    });

    res.json({
      serverUrl: LIVEKIT_URL,
      roomName: 'voice_assistant_room',
      participantName: participantIdentity,
      participantToken: await token.toJwt(),
    });
  } catch (error) {
    console.error('Connection details error:', error);
    res.status(500).json({ error: 'Failed to generate connection details' });
  }
});

app.listen(port, () => {
  console.log(`Advisor API server listening on http://localhost:${port}`);
});
