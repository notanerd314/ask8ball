import { useEffect } from 'react';

const INPUT_EVENTS = ['click', 'touchstart', 'pointerdown', 'keydown'];

export function useAudioUnlock(playFn: () => void) {
  useEffect(() => {
    if (typeof playFn !== 'function') return;

    const unlock = () => {
      try {
        playFn();
      } catch (e) {
        console.warn('Audio unlock failed:', e);
      }
      cleanup();
    };

    const cleanup = () => {
      INPUT_EVENTS.forEach(event =>
        window.removeEventListener(event, unlock)
      );
    };

    INPUT_EVENTS.forEach(event =>
      window.addEventListener(event, unlock, { once: true, passive: true })
    );

    return cleanup;
  }, [playFn]);
}
