import {
  inference,
  type JobContext,
  type JobProcess,
  WorkerOptions,
  cli,
  defineAgent,
  voice,
} from '@livekit/agents';
import * as silero from '@livekit/agents-plugin-silero';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { BASE_INSTRUCTIONS } from './prompts/base-instructions.js';
import { CONVERSATION_FLOW } from './prompts/conversation-flow.js';

const agentDir = path.dirname(fileURLToPath(import.meta.url));
// Token API loads Advisor-AI/.env.local; worker cwd is livekit-voice-agent — load both so LIVEKIT_AGENT_NAME stays in sync.
dotenv.config({ path: path.join(agentDir, '..', '.env.local') });
dotenv.config({ path: path.join(agentDir, '.env.local'), override: true });

if (!process.env.OPENAI_API_KEY?.trim()) {
  process.env.OPENAI_API_KEY = 'livekit-inference-gateway-placeholder';
}

const agentName = process.env.LIVEKIT_AGENT_NAME || 'advisor-voice';

/** Match RoomIO default output (24 kHz mono) so TTS frames are not resampled in `forwardAudio`. */
const CARTESIA_VOICE_ID = '9626c31c-bec5-4cca-baa8-f8ba9e84c8bc';

export default defineAgent({
  prewarm: async (proc: JobProcess) => {
    proc.userData.vad = await silero.VAD.load();
  },
  entry: async (ctx: JobContext) => {
    if (!process.env.OPENAI_API_KEY?.trim()) {
      process.env.OPENAI_API_KEY = 'livekit-inference-gateway-placeholder';
    }

    const vad = ctx.proc.userData.vad! as silero.VAD;

    await ctx.connect();

    // Build TTS here, not at module scope: job subprocess imports this file before
    // `initializeLogger()`, and `inference.TTS` calls `log()` in its constructor.
    const inferenceTts = new inference.TTS({
      model: 'cartesia/sonic-2',
      voice: CARTESIA_VOICE_ID,
      sampleRate: 24000,
    });

    const assistant = new voice.Agent({
      instructions: BASE_INSTRUCTIONS,
    });

    const session = new voice.AgentSession({
      vad,
      stt: 'assemblyai/universal-streaming:en',
      llm: 'openai/gpt-4.1-mini',
      tts: inferenceTts,
      // Use AssemblyAI end-of-turn instead of the local EOU ONNX+tokenizer bundle
      // (`@livekit/agents-plugin-livekit`), which often fails until tokenizer files resolve in CI/new clones.
      turnDetection: 'stt',
      voiceOptions: {
        // Room output uses `syncTranscription: false` below; keep session aligned.
        useTtsAlignedTranscript: false,
      },
    });

    await session.start({
      agent: assistant,
      room: ctx.room,
      outputOptions: {
        // `TranscriptionSynchronizer` + rapid interrupt can throw RtcError
        // "sample_rate and num_channels don't match" and break the reply pipeline.
        syncTranscription: false,
      },
    });

    session.generateReply({ instructions: CONVERSATION_FLOW.GREETING });
  },
});

cli.runApp(
  new WorkerOptions({
    agent: fileURLToPath(import.meta.url),
    agentName,
  }),
);
