import { useState, useCallback, useRef, useEffect } from 'react';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const cancelRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (asyncFunction: (signal: AbortSignal) => Promise<T>) => {
    // Cancel previous request
    if (cancelRef.current) {
      cancelRef.current.abort();
    }

    const controller = new AbortController();
    cancelRef.current = controller;

    setState({ data: null, loading: true, error: null });

    try {
      const data = await asyncFunction(controller.signal);
      
      if (!controller.signal.aborted) {
        setState({ data, loading: false, error: null });
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setState({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error : new Error('Unknown error') 
        });
      }
    }
  }, []);

  const reset = useCallback(() => {
    if (cancelRef.current) {
      cancelRef.current.abort();
    }
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    return () => {
      if (cancelRef.current) {
        cancelRef.current.abort();
      }
    };
  }, []);

  return { ...state, execute, reset };
}