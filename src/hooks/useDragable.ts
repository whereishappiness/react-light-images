import { useEffect, MutableRefObject, useState, useRef } from 'react';

export interface DragPosition {
  x: number;
  y: number;
}

const POSITION_DEFAULT: DragPosition = { x: 0, y: 0 };

export default function useDragable(
  ref: MutableRefObject<HTMLImageElement | null>
) {
  const [position, setPosition] = useState<DragPosition>({ x: 0, y: 0 });
  const offset = useRef<DragPosition>({ x: 0, y: 0 });
  const initial = useRef<DragPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const target = ref.current;
    let dragging = false;

    if (!target) {
      return;
    }

    const onStart = (e: MouseEvent | TouchEvent) => {
      dragging = true;
      e.preventDefault();

      if (e.type === 'touchstart') {
        const ev = e as TouchEvent;

        initial.current = {
          x: ev.touches[0].clientX - offset.current.x,
          y: ev.touches[0].clientY - offset.current.y,
        };

        window.addEventListener('touchmove', onMove);
        window.addEventListener('touchend', onEnd);
      } else {
        const ev = e as MouseEvent;

        initial.current = {
          x: ev.clientX - offset.current.x,
          y: ev.clientY - offset.current.y,
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
      }
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();

      if (!dragging) {
        return;
      }

      let offsetX: number, offsetY: number;

      if (e.type === 'touchmove') {
        const ev = e as TouchEvent;
        offsetX = ev.touches[0].clientX - initial.current.x;
        offsetY = ev.touches[0].clientY - initial.current.y;
      } else {
        const ev = e as MouseEvent;
        offsetX = ev.clientX - initial.current.x;
        offsetY = ev.clientY - initial.current.y;
      }

      offset.current = {
        x: offsetX,
        y: offsetY,
      };

      setPosition(offset.current);
    };

    const onEnd = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();

      initial.current = offset.current;

      if (e.type === 'touchend') {
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onEnd);
      } else {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onEnd);
      }
      dragging = false;
    };

    target.addEventListener('mousedown', onStart);
    target.addEventListener('touchstart', onStart);

    // clean up
    return () => {
      target.removeEventListener('mousedown', onStart);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('mousemove', onMove);

      target.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchmove', onMove);
    };
  }, [ref, offset, initial]);

  return {
    position,
    reset() {
      initial.current = offset.current = POSITION_DEFAULT;
      setPosition(POSITION_DEFAULT);
    },
  };
}
