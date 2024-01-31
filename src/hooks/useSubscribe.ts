import { useEffect } from 'react';
import { NotifyEvent } from '@/enums/common';
import { subscribe, unSubscribe, notify as notifyEvent } from '@/utils/subscriber';

interface UseSubscribeProps<T> {
  event: NotifyEvent;
  onCatch: (data: T) => void;
}

export const useSubscribe = <T = unknown>({ event, onCatch }: UseSubscribeProps<T>) => {
  useEffect(() => {
    subscribe(event, onCatch);
    return () => {
      unSubscribe(event, onCatch);
    };
  });
};

export const useDeepSubscribe = <T = unknown>(
  { event, onCatch }: UseSubscribeProps<T>,
  deps: unknown[] = [],
) => {
  useEffect(() => {
    subscribe(event, onCatch);
    return () => {
      unSubscribe(event, onCatch);
    };
  }, [event, ...deps]);
};

export const notify = <T>(event: NotifyEvent, data: T) => notifyEvent(event, data);
