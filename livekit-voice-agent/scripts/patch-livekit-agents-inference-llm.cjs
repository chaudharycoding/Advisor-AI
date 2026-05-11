#!/usr/bin/env node
/**
 * @livekit/agents inference LLM constructs `new OpenAI({ apiKey: "" })`.
 * Recent `openai` versions throw before LiveKit's inference JWT path runs.
 * Replace with a non-empty placeholder (agent.ts also sets OPENAI_API_KEY).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const inferenceDir = path.join(
  __dirname,
  '..',
  'node_modules',
  '@livekit',
  'agents',
  'dist',
  'inference',
);

const PATCHED_MARKER =
  'apiKey: process.env.OPENAI_API_KEY || "livekit-inference-gateway-placeholder"';

function patchFile(name) {
  const fp = path.join(inferenceDir, name);
  if (!fs.existsSync(fp)) {
    console.warn(`[patch-livekit-agents-inference-llm] missing ${fp} (skip)`);
    return;
  }
  let s = fs.readFileSync(fp, 'utf8');
  if (s.includes(PATCHED_MARKER)) {
    console.log(`[patch-livekit-agents-inference-llm] already applied (${name})`);
    return;
  }
  if (!s.includes('apiKey: ""')) {
    console.warn(
      `[patch-livekit-agents-inference-llm] no apiKey: "" in ${name} (skip — upstream changed?)`,
    );
    return;
  }
  s = s.replaceAll('apiKey: ""', PATCHED_MARKER);
  s = s.replace(
    '// leave a temporary empty string to avoid OpenAI complain about missing key',
    '// OpenAI SDK rejects ""; LiveKit inference supplies auth per request',
  );
  fs.writeFileSync(fp, s);
  console.log(`[patch-livekit-agents-inference-llm] patched ${name}`);
}

for (const name of ['llm.js', 'llm.cjs']) {
  patchFile(name);
}
