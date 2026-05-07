import { useCallback, useEffect, useState } from 'react';
import {
  AgentState,
  BarVisualizer,
  DisconnectButton,
  LiveKitRoom,
  RoomAudioRenderer,
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
};

export function VoiceAssistantLiveKit() {
  const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails>();
  const [agentState, setAgentState] = useState<AgentState>('disconnected');

  const onConnectButtonClicked = useCallback(async () => {
    const endpoint = import.meta.env.VITE_CONN_DETAILS_ENDPOINT ?? '/api/connection-details';
    const url = new URL(endpoint, window.location.origin);
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Connection details failed: ${response.status}`);
    }

    const details = (await response.json()) as ConnectionDetails;
    setConnectionDetails(details);
  }, []);

  return (
    <main data-lk-theme="default" className="h-full">
      <LiveKitRoom
        token={connectionDetails?.participantToken}
        serverUrl={connectionDetails?.serverUrl}
        connect={connectionDetails !== undefined}
        audio
        video={false}
        onMediaDeviceFailure={onDeviceFailure}
        onDisconnected={() => setConnectionDetails(undefined)}
        className="grid grid-rows-[2fr_1fr] items-center"
      >
        <SimpleVoiceAssistant onStateChange={setAgentState} />
        <ControlBar onConnectButtonClicked={onConnectButtonClicked} agentState={agentState} />
        <RoomAudioRenderer />
        <NoAgentNotification state={agentState} />
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
    <div className="mx-auto h-[200px] w-full max-w-[520px] rounded-2xl border border-dark-border/40 bg-dark-bg/40 p-6">
      <BarVisualizer state={state} barCount={7} trackRef={audioTrack} options={{ minHeight: 20 }} />
    </div>
  );
}

function ControlBar({
  onConnectButtonClicked,
  agentState,
}: {
  onConnectButtonClicked: () => void;
  agentState: AgentState;
}) {
  return (
    <div className="relative h-[90px]">
      <AnimatePresence>
        {agentState === 'disconnected' && (
          <motion.button
            initial={{ opacity: 0, top: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, top: '-10px' }}
            transition={{ duration: 0.5 }}
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue px-5 py-2 text-sm font-semibold text-white"
            onClick={onConnectButtonClicked}
          >
            Start Voice Conversation
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {agentState !== 'disconnected' && agentState !== 'connecting' && (
          <motion.div
            initial={{ opacity: 0, top: '10px' }}
            animate={{ opacity: 1, top: 0 }}
            exit={{ opacity: 0, top: '-10px' }}
            transition={{ duration: 0.4 }}
            className="absolute left-1/2 flex -translate-x-1/2 justify-center gap-2"
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
