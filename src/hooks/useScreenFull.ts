import { useLayoutEffect, useState, MutableRefObject } from 'react';
import screenfull, { Screenfull } from 'screenfull';

export default function useScreenFull(
  containerRef: MutableRefObject<HTMLElement | null>
) {
  const [isFull, setIsFull] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (!isFull) {
      if (screenfull.isEnabled) {
        try {
          screenfull.exit();
        } catch (error) {
          console.error(error);
        }
      }
      return;
    }

    const onChange = () => {
      if (screenfull.isEnabled) {
        const { isFullscreen } = screenfull as Screenfull;
        setIsFull(isFullscreen);
      }
    };

    if (screenfull.isEnabled && containerRef.current) {
      try {
        screenfull.request(containerRef.current);
        screenfull.on('change', onChange);
      } catch (error) {}
    }

    return () => {
      if (screenfull.isEnabled) {
        try {
          screenfull.off('change', onChange);
          screenfull.exit();
        } catch (error) {}
      }
    };
  }, [isFull, containerRef]);

  return { isFullscreen: isFull, toggleFullscreen: () => setIsFull(!isFull) };
}
