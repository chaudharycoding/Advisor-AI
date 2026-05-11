import { useCallback, useEffect, useState } from 'react';
import {
  AgentState,
  AudioTrack,
  BarVisualizer,
  DisconnectButton,
  LiveKitRoom,
  VoiceAssistantControlBar,
  useVoiceAssistant,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { AnimatePresence, motion } from 'framer-motion';
import { MediaDeviceFailure } from 'livekit-client';
import { NoAgentNotification } from './NoAgentNotification';

type ConnectionDetails = {
  serverUrl: string;
  roomName: string;
  participantName: string;
  participantToken: string;
  /** Same name the API used for AgentDispatch — worker must use this LIVEKIT_AGENT_NAME */
  livekitAgentName?: string;
};

export function VoiceAssistantLiveKit() {
  const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails>();
  const [agentState, setAgentState] = useState<AgentState>('disconnected');
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isFetchingToken, setIsFetchingToken] = useState(false);

  const onConnectButtonClicked = useCallback(async () => {
    setConnectionError(null);
    setIsFetchingToken(true);
    try {
      const endpoint = import.meta.env.VITE_CONN_DETAILS_ENDPOINT ?? '/api/connection-details';
      const url = new URL(endpoint, window.location.origin);
      const response = await fetch(url.toString());

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(body || `Token server returned ${response.status}`);
      }

      const details = (await response.json()) as ConnectionDetails;
      setConnectionDetails(details);
    } catch (err) {
      const raw = err instanceof Error ? err.message : String(err);
      const unreachable =
        /failed to fetch|networkerror|load failed|econnrefused/i.test(raw) || err instanceof TypeError;
      setConnectionError(
        unreachable
          ? 'Cannot reach the token API (port 8787). Run npm run dev from Advisor-AI (API + voice agent + Vite). Use npm run dev:web for API + Vite only.'
          : raw,
      );
    } finally {
      setIsFetchingToken(false);
    }
  }, []);

  return (
    <main data-lk-theme="default" className="h-full min-h-[280px]">
      <LiveKitRoom
        token={connectionDetails?.participantToken}
        serverUrl={connectionDetails?.serverUrl}
        connect={connectionDetails !== undefined}
        audio={{
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }}
        video={false}
        onMediaDeviceFailure={onDeviceFailure}
        onDisconnected={() => {
          setConnectionDetails(undefined);
          setConnectionError(null);
        }}
        className="grid grid-rows-[2fr_1fr] items-center"
      >
        <SimpleVoiceAssistant onStateChange={setAgentState} />
        <ControlBar
          onConnectButtonClicked={onConnectButtonClicked}
          agentState={agentState}
          connectionError={connectionError}
          isFetchingToken={isFetchingToken}
        />
        <NoAgentNotification
          state={agentState}
          dispatchedAgentName={connectionDetails?.livekitAgentName}
        />
      </LiveKitRoom>
    </main>
  );
}

function SimpleVoiceAssistant({ onStateChange }: { onStateChange: (state: AgentState) => void }) {
  const { state, audioTrack } = useVoiceAssistant();

  useEffect(() => {
    onStateChange(state);
  }, [onStateChange, state]);

  return (
    <>
      {audioTrack ? (
        <div className="hidden" aria-hidden>
          <AudioTrack trackRef={audioTrack} />
        </div>
      ) : null}
      <div className="mx-auto h-[200px] w-full max-w-[520px] rounded-2xl border border-dark-border/40 bg-dark-bg/40 p-6">
        <BarVisualizer state={state} barCount={7} trackRef={audioTrack} options={{ minHeight: 20 }} />
      </div>
    </>
  );
}

function ControlBar({
  onConnectButtonClicked,
  agentState,
  connectionError,
  isFetchingToken,
}: {
  onConnectButtonClicked: () => void;
  agentState: AgentState;
  connectionError: string | null;
  isFetchingToken: boolean;
}) {
  return (
    <div className="flex min-h-[100px] flex-col items-center justify-center gap-3">
      {connectionError && (
        <p className="max-w-md rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-center text-xs text-red-200">
          {connectionError}
        </p>
      )}
      <AnimatePresence>
        {agentState === 'disconnected' && (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            disabled={isFetchingToken}
            className="rounded-full bg-gradient-to-r from-accent-purple to-accent-blue px-5 py-2 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60"
            onClick={() => void onConnectButtonClicked()}
          >
            {isFetchingToken ? 'Connecting…' : 'Start Voice Conversation'}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {agentState !== 'disconnected' && agentState !== 'connecting' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center gap-2"
          >
            <VoiceAssistantControlBar controls={{ leave: false }} />
            <DisconnectButton className="rounded border border-dark-border bg-dark-panel px-3 py-1 text-sm text-slate-200">
              End
            </DisconnectButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function onDeviceFailure(error?: MediaDeviceFailure) {
  console.error(error);
  alert('Microphone permission is required for voice chat. Please allow access and reload.');
}
