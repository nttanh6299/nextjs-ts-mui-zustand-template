import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { cache } from '@/store/static';

interface UseImageLoaderProps {
  src: string;
  lazy?: boolean;
  selector?: string;
  dataAttrKey?: string;
}

const useImageLoader = ({ src, lazy, selector, dataAttrKey }: UseImageLoaderProps) => {
  const [imgSrc, setImgSrc] = useState('');
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [imgLoading, setImgLoading] = useState(false);

  const selectorRef = useRef('');
  useLayoutEffect(() => {
    selectorRef.current = selector || '';
  }, [selector]);

  const dataAttrKeyRef = useRef('');
  useLayoutEffect(() => {
    dataAttrKeyRef.current = dataAttrKey || '';
  }, [dataAttrKey]);

  const handleLoadImage = useCallback((imageSrcUrl: string) => {
    if (cache.images[imageSrcUrl]) {
      setImgSrc(imageSrcUrl);
      setDimension(cache.images[imageSrcUrl]);
    } else {
      setImgLoading(true);
      const img = new Image();
      img.src = imageSrcUrl;
      img.onload = () => {
        cache.images[imageSrcUrl] = {
          width: img.width,
          height: img.height,
        };
        setImgSrc(imageSrcUrl);
        setDimension(cache.images[imageSrcUrl]);
        setImgLoading(false);
      };
      img.onerror = (error) => {
        setImgLoading(false);
        console.error('imageLoader error:', error);
      };
    }
  }, []);

  const imgObserver = useCallback(
    (node: Element, key: string) => {
      const intObs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const currentImg = en.target as HTMLDivElement;
            const newImgSrc = currentImg.dataset[key];
            if (newImgSrc) {
              handleLoadImage(newImgSrc);
            }
            intObs.unobserve(node);
          }
        });
      });
      intObs.observe(node);
    },
    [handleLoadImage],
  );

  useLayoutEffect(() => {
    if (!src) return;

    if (!lazy) {
      handleLoadImage(src);
      return;
    }

    if (cache.images[src]) {
      setImgSrc(src);
      setDimension(cache.images[src]);
    } else {
      const element = selectorRef.current ? document.querySelector(selectorRef.current) : null;
      if (element) {
        imgObserver(element, dataAttrKeyRef.current);
      }
    }
  }, [src, lazy, handleLoadImage, imgObserver]);

  return {
    imgSrc,
    imgLoading,
    dimension,
  };
};

export default useImageLoader;
