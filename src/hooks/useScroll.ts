import { UIEvent, useEffect, useRef } from 'react';
import { getScrollOffset } from '@/utils/common';

interface UseDocumentScrollProps {
  isLoading: boolean;
  callback: () => void;
  delay: number;
  offset: number;
  canScroll?: boolean;
}

export const useDocumentScroll = ({
  isLoading,
  canScroll,
  offset,
  callback,
  delay = 200,
}: UseDocumentScrollProps) => {
  const timerDebounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      if (timerDebounceRef.current) {
        clearTimeout(timerDebounceRef.current);
      }

      timerDebounceRef.current = setTimeout(() => {
        if (!canScroll) return;

        const endOfPage =
          window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;
        if (endOfPage && !isLoading) {
          callback();
        }
      }, delay);
    };

    if (typeof canScroll === 'boolean' && !canScroll) {
      document.removeEventListener('scroll', handleScroll);
    } else {
      document.addEventListener('scroll', handleScroll);
    }
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [canScroll, isLoading, offset, delay, callback]);
};

interface UseElementScrollProps {
  isLoading: boolean;
  callback: () => void;
  delay: number;
  offset: [number, number];
  canScroll?: boolean;
}

export const useElementScroll = ({
  isLoading,
  canScroll,
  offset,
  callback,
  delay = 200,
}: UseElementScrollProps) => {
  const timerDebounceRef = useRef<NodeJS.Timeout>();

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    if (timerDebounceRef.current) {
      clearTimeout(timerDebounceRef.current);
    }

    timerDebounceRef.current = setTimeout(() => {
      if (!canScroll) return;
      const scrollOffset = getScrollOffset(e);
      const validOffset = scrollOffset >= offset[0] && scrollOffset <= offset[1];
      if (validOffset && !isLoading) {
        callback();
      }
    }, delay);
  };

  return {
    handleScroll,
  };
};
