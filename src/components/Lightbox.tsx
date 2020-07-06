import React, {
  CSSProperties,
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
  FC,
} from 'react';
import classnames from 'classnames';
import FileSaver from 'file-saver';
import screenfull from 'screenfull';
import useScreenFull from '../hooks/useScreenFull';
import { Arrow } from './Arrow';
import { Header } from './Header';
import { ImageItem } from './ImageItem';
import { Footer } from './Footer';
import { ImageDataItem } from './interfaces';
import { ConfigContext } from '../Config';
import { FUNC_EMPTY } from '../helper';
import './Lightbox.less';

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 5;
const TIMEOUT_AUTOHIDE = 1000 * 5;
const TIMEOUT_PLAYING = 1000 * 3;

export interface LightboxProps {
  className?: string;
  style?: CSSProperties;
  dataSource: Array<ImageDataItem>;
  current?: number;
  autoHideControls?: boolean;
  footer?: boolean;
  indicator?: boolean;
  arrow?: boolean;
  autoplay?: boolean;
  playDuration?: number;
  rotate?: boolean;
  zoom?: boolean;
  zoomMin?: number;
  zoomMax?: number;
  onClose?: () => void;
}

export const Lightbox: FC<LightboxProps> = (props) => {
  const {
    className,
    style,
    current = 0,
    dataSource,
    footer = true,
    indicator = true,
    arrow = true,
    autoplay = true,
    playDuration = TIMEOUT_PLAYING,
    autoHideControls = true,
    rotate = true,
    zoom = true,
    zoomMax = ZOOM_MAX,
    zoomMin = ZOOM_MIN,
    onClose = FUNC_EMPTY,
  } = props;

  const [active, setActive] = useState<number>(current);
  const [degree, setDegree] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [playing, setPlaying] = useState<boolean>(false);
  const [reseting, setReseting] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<ImageDataItem | null>(null);
  const [controlVisible, setControlVisible] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerHide = useRef<number | undefined>();
  const timerPlay = useRef<number | undefined>();
  const { isFullscreen, toggleFullscreen } = useScreenFull(containerRef);

  const config = useContext(ConfigContext);

  const handleAutoPlay = useCallback(() => {
    if (dataSource.length <= 1) {
      return;
    }

    const newValue = !playing;
    setPlaying(newValue);

    if (newValue) {
      timerPlay.current = window.setInterval(() => {
        setActive((x) => {
          const last = dataSource.length - 1;
          return x === last ? 0 : x + 1;
        });
      }, playDuration);
    } else {
      if (timerPlay.current) {
        window.clearInterval(timerPlay.current);
      }
    }

    return () => {
      if (timerPlay.current) {
        window.clearInterval(timerPlay.current);
      }
    };
  }, [playing, timerPlay, dataSource]);

  const handleDownload = useCallback(() => {
    const target = dataSource[active];
    if (target) {
      const { src: fileURL, title } = target;
      FileSaver.saveAs(fileURL, title);
    }
  }, [active]);

  const handleExit = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, []);

  const handleFullscreen = useCallback(() => {
    toggleFullscreen();
  }, [toggleFullscreen]);

  const handleReset = useCallback(() => {
    setDegree(0);
    setScale(1);
    setReseting(true);
  }, [active, reseting]);

  const handleRotateLeft = useCallback(() => {
    setDegree(degree - 90);
  }, [degree]);

  const handleRotateRight = useCallback(() => {
    setDegree(degree + 90);
  }, [degree]);

  const handleZoomIn = useCallback(() => {
    setScale(scale > 1 ? scale - 1 : scale * 0.5);
  }, [scale]);

  const handleZoomOut = useCallback(() => {
    setScale(scale + 1);
  }, [scale]);

  const handlePrev = useCallback(() => {
    setActive(active - 1);
    handleReset();
  }, [active, handleReset]);

  const handleNext = useCallback(() => {
    setActive(active + 1);
    handleReset();
  }, [active, handleReset]);

  const handleReseted = useCallback(() => {
    setReseting(false);
  }, [reseting]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();

      if (!autoHideControls) {
        return;
      }

      setControlVisible(true);
      if (timerHide.current) {
        window.clearTimeout(timerHide.current);
        // rebuild timer
        timerHide.current = window.setTimeout(() => {
          setControlVisible(false);
        }, TIMEOUT_AUTOHIDE);
      }
    },
    [autoHideControls, timerHide]
  );

  const handleIndicatorChange = useCallback(
    (index: number) => {
      if (!indicator) {
        return;
      }
      setActive(index);
      handleReset();
    },
    [indicator]
  );

  useEffect(() => {
    const item =
      dataSource && dataSource.length > active ? dataSource[active] : null;
    setCurrentItem(item);
  }, [dataSource, active]);

  useEffect(() => {
    if (autoHideControls) {
      timerHide.current = window.setTimeout(() => {
        setControlVisible(false);
      }, TIMEOUT_AUTOHIDE);
    }

    return () => {
      if (timerHide.current) {
        clearTimeout(timerHide.current);
      }
    };
  }, [autoHideControls, controlVisible, timerHide]);

  const canPrev = active > 0;
  const canNext = active < dataSource.length - 1;
  const canFullscreen = screenfull.isEnabled;

  return (
    <div
      className={classnames(['riv-lightbox', className])}
      style={style}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseEnter}
    >
      <Header
        visible={controlVisible}
        fullscreen={canFullscreen}
        isFullscreen={isFullscreen}
        autoplay={autoplay}
        playing={playing}
        rotate={rotate}
        zoom={zoom}
        zoomInDisabled={scale < zoomMin}
        zoomOutDisabled={scale > zoomMax}
        onAutoPlay={handleAutoPlay}
        onDownload={handleDownload}
        onExit={handleExit}
        onFullscreen={handleFullscreen}
        onReset={handleReset}
        onRotateLeft={handleRotateLeft}
        onRotateRight={handleRotateRight}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      >
        <span className="riv-header-title--index">{active + 1}</span>
        <span>{dataSource.length}</span>
      </Header>
      {currentItem && (
        <ImageItem
          src={currentItem.src}
          reseting={reseting}
          onRest={handleReseted}
          degree={degree}
          scale={scale}
          spinType="double-bounce"
        />
      )}
      {arrow && (
        <>
          <Arrow
            type="left"
            title={canPrev ? config.locale.PREV : config.locale.IS_FIRST}
            disabled={!canPrev}
            visible={controlVisible}
            onClick={handlePrev}
          />
          <Arrow
            type="right"
            title={canNext ? config.locale.NEXT : config.locale.IS_LAST}
            disabled={!canNext}
            visible={controlVisible}
            onClick={handleNext}
          />
        </>
      )}
      {footer && (
        <Footer
          description
          titlePosition="center"
          active={active}
          dataSource={dataSource}
          indicator={indicator}
          onIndicatorChange={handleIndicatorChange}
        />
      )}
    </div>
  );
};
