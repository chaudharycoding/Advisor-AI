import { useEffect, useRef, useState } from 'react';
import type { AgentState } from '@livekit/components-react';

interface NoAgentNotificationProps {
  state: AgentState;
}

export function NoAgentNotification({ state }: NoAgentNotificationProps) {
  const timeoutRef = useRef<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const agentHasConnected = useRef(false);

  if (['listening', 'thinking', 'speaking'].includes(state) && !agentHasConnected.current) {
    agentHasConnected.current = true;
  }

  useEffect(() => {
    if (state === 'connecting') {
      timeoutRef.current = window.setTimeout(() => {
        if (state === 'connecting' && !agentHasConnected.current) {
          setShowNotification(true);
        }
      }, 10_000);
    } else {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      setShowNotification(false);
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [state]);

  if (!showNotification) {
    return null;
  }

  return (
    <div className="fixed left-1/2 top-6 z-50 flex max-w-[90vw] -translate-x-1/2 items-center gap-3 rounded-lg border border-dark-border bg-dark-panel px-4 py-3 text-sm text-slate-200">
      <p>Agent has not connected yet. Make sure the LiveKit worker is running.</p>
      <button
        className="rounded border border-dark-border px-2 py-1 text-xs text-slate-300"
        onClick={() => setShowNotification(false)}
      >
        Dismiss
      </button>
    </div>
  );
}
