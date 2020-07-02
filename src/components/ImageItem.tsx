import React, {
  FunctionComponent,
  CSSProperties,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import classnames from 'classnames';
import { Spin } from './Spin';
import { Info } from '../icons';
import useDragable, { DragPosition } from '../hooks/useDragable';
import { FUNC_EMPTY } from '../helper';
import './ImageItem.less';

export interface ImageItemProps {
  className?: string;
  style?: CSSProperties;
  src: string;
  title?: string;
  active?: boolean;
  reseting?: boolean;
  degree: number;
  scale: number;
  spinType?:
    | 'rotating-plane'
    | 'double-bounce'
    | 'wave'
    | 'wandering-cubes'
    | 'spinner-pulse'
    | 'chasing-dots'
    | 'three-bounce'
    | 'circle'
    | 'cube-grid'
    | 'fading-circle'
    | 'folding-cube';
  onRest?: () => void;
}

function getTranslate(
  position: DragPosition,
  scale: number,
  degree: number
): DragPosition {
  let { x, y } = position;
  x = x / scale;
  y = y / scale;

  const val = degree / 90;
  const mod = val % 4;
  switch (mod) {
    case 0:
      return { x, y };
    case -3:
    case 1:
      return { x: y, y: -x };
    case -2:
    case 2:
      return { x: -x, y: -y };
    case -1:
    case 3:
      return { x: -y, y: x };
    default:
      return { x, y };
  }
}

export const ImageItem: FunctionComponent<ImageItemProps> = (
  props: ImageItemProps
) => {
  const {
    className,
    style,
    src,
    active,
    title,
    scale,
    degree,
    reseting,
    spinType,
    onRest,
  } = props;

  const [url, setUrl] = useState<string>(src);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadfail, setLoadFail] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { position, reset } = useDragable(imgRef);
  const { x: transX, y: transY } = getTranslate(position, scale, degree);
  const imageStyle = {
    transform: `scale3d(${scale}, ${scale}, 1) rotate(${degree}deg) translate(${transX}px, ${transY}px)`,
  };

  useEffect(() => {
    if (reseting) {
      reset();
      if (onRest) {
        onRest();
      }
    }
  }, [reseting, onRest]);

  useEffect(() => {
    if (src) {
      setUrl(src);
      setLoadFail(false);
      setLoading(true);
    }
  }, [src]);

  // need polyfill
  // const handleLoadStart = useCallback(() => {
  //   setLoadFail(false);
  //   setLoading(true);
  // }, []);

  const handleLoad = useCallback(() => {
    setLoading(false);
    setLoadFail(false);
  }, []);

  const handleError = useCallback(() => {
    setLoadFail(true);
    setLoading(false);
  }, []);

  const handleReload = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      if (src) {
        const flag = src.indexOf('?') > -1;
        const newUrl = `${src}${flag ? '&' : '?'}t=${new Date().getTime()}`;
        setUrl(newUrl);
        setLoading(true);
        setLoadFail(false);
      }
    },
    [src]
  );

  return (
    <div
      className={classnames([
        'riv-image-item',
        active ? 'active' : '',
        className,
      ])}
      style={style}
    >
      <Spin type={spinType} spinning={loading} />
      {loadfail && (
        <div className="riv-image-fail">
          <Info />
          加载图片失败，
          <span className="riv-image-reload" onClick={handleReload}>
            重新加载
          </span>
        </div>
      )}
      <img
        className={loading ? 'loading' : ''}
        ref={imgRef}
        src={url}
        alt={title}
        style={imageStyle}
        // onLoadStart={handleLoadStart}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

ImageItem.defaultProps = {
  className: '',
  style: {},
  active: false,
  reseting: false,
  onRest: FUNC_EMPTY,
};
