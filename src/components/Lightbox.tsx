import React, {
  FunctionComponent,
  CSSProperties,
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
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

export interface LightboxProps {
  className?: string;
  style?: CSSProperties;
  autoHideControls?: boolean;
  dataSource: Array<ImageDataItem>;
  autoplay?: boolean;
  playDuration?: number;
  indicator?: boolean;
  zoomMin?: number;
  zoomMax?: number;
  arrow?: boolean;
  onClose?: () => void;
}

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 5;
const TIMEOUT_AUTOHIDE = 1000 * 5;
const TIMEOUT_PLAYING = 1000 * 3;

export const Lightbox: FunctionComponent<LightboxProps> = (props) => {
  const {
    className,
    style,
    autoplay,
    playDuration,
    autoHideControls,
    dataSource,
    indicator,
    zoomMax = ZOOM_MAX,
    zoomMin = ZOOM_MIN,
    arrow = true,
    onClose,
  } = props;

  const [active, setActive] = useState<number>(0);
  const [degree, setDegree] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [playing, setPlaying] = useState<boolean>(false);
  const [reseting, setReseting] = useState<boolean>(false);
  const [current, setCurrent] = useState<ImageDataItem | null>(null);
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
      timerPlay.current = setInterval(() => {
        setActive((x) => {
          const last = dataSource.length - 1;
          return x === last ? 0 : x + 1;
        });
      }, playDuration);
    } else {
      if (timerPlay.current) {
        clearInterval(timerPlay.current);
      }
    }

    return () => {
      if (timerPlay.current) {
        clearInterval(timerPlay.current);
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
        clearTimeout(timerHide.current);
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
    setCurrent(item);
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
        zoomInDisabled={scale < zoomMin}
        zoomOutDisabled={scale > zoomMax}
        fullscreen={canFullscreen}
        isFullscreen={isFullscreen}
        autoplay={autoplay}
        playing={playing}
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
      {current && (
        <ImageItem
          key={active}
          src={current.src}
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
      <Footer
        description
        titlePosition="center"
        active={active}
        dataSource={dataSource}
        indicator={indicator}
        onIndicatorChange={handleIndicatorChange}
      />
    </div>
  );
};

Lightbox.defaultProps = {
  autoHideControls: true,
  dataSource: [],
  autoplay: true,
  playDuration: TIMEOUT_PLAYING,
  indicator: true,
  zoomMax: ZOOM_MAX,
  zoomMin: ZOOM_MIN,
  arrow: true,
  onClose: FUNC_EMPTY,
};
