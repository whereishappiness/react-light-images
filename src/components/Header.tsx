import React, {
  FunctionComponent,
  ReactNode,
  CSSProperties,
  useCallback,
  useContext,
} from 'react';
import classnames from 'classnames';
import {
  ZoomIn,
  ZoomOut,
  RotateLeft,
  RotateRight,
  Play,
  FullScreen,
  FullScreenExit,
  Download,
  RectOnRect,
  Close,
  Stop,
} from '../icons';
import { ConfigContext } from '../Config';
import { FUNC_EMPTY } from '../helper';
import './Header.less';

export interface HeaderButtonProps {
  disabled?: boolean;
  icon: ReactNode;
  title?: string;
  onClick?: () => void;
}

export const HeaderButton: FunctionComponent<HeaderButtonProps> = (props) => {
  const { disabled, icon, title, onClick } = props;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      if (!disabled && onClick) {
        onClick();
      }
    },
    [disabled, onClick]
  );

  return (
    <div
      className={classnames(['riv-header-btn', disabled ? 'disabled' : ''])}
      title={title}
      onClick={handleClick}
    >
      {icon}
    </div>
  );
};

HeaderButton.defaultProps = {
  disabled: false,
  onClick: FUNC_EMPTY,
};

export interface HeaderProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  visible?: boolean;
  reset?: boolean;
  zoom?: boolean;
  zoomInDisabled?: boolean;
  zoomOutDisabled?: boolean;
  rotate?: boolean;
  rotateLeft?: boolean;
  rotateRight?: boolean;
  autoplay?: boolean;
  autoPlayDisabled?: boolean;
  playing?:boolean;
  fullscreen?: boolean;
  download?: boolean;
  isFullscreen?: boolean;
  onReset?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onRotateLeft?: () => void;
  onRotateRight?: () => void;
  onAutoPlay?: () => void;
  onFullscreen?: () => void;
  onDownload?: () => void;
  onExit?: () => void;
}

export const Header: FunctionComponent<HeaderProps> = (props) => {
  const {
    children,
    className,
    style,
    visible,
    reset,
    zoom,
    rotate,
    rotateLeft,
    rotateRight,
    autoplay,
    fullscreen,
    download,
    zoomInDisabled,
    zoomOutDisabled,
    autoPlayDisabled,
    playing,
    isFullscreen,
    onReset,
    onZoomIn,
    onZoomOut,
    onRotateLeft,
    onRotateRight,
    onAutoPlay,
    onFullscreen,
    onDownload,
    onExit,
  } = props;
  const config = useContext(ConfigContext);

  return (
    <div
      className={classnames(['riv-header', visible ? '' : 'hide', className])}
      style={style}
    >
      <div className="riv-header-title">{children}</div>
      <div className="riv-header-btns">
        {reset && (
          <HeaderButton
            icon={<RectOnRect viewBox="0 0 1200 1200" />}
            title={config.locale.RESET}
            onClick={onReset}
          />
        )}
        {zoom && (
          <>
            <HeaderButton
              disabled={zoomOutDisabled}
              icon={<ZoomOut />}
              title={config.locale.ZOOM_OUT}
              onClick={onZoomOut}
            />
            <HeaderButton
              disabled={zoomInDisabled}
              icon={<ZoomIn />}
              title={config.locale.ZOOM_IN}
              onClick={onZoomIn}
            />
          </>
        )}
        {rotate && (
          <>
            {rotateLeft && (
              <HeaderButton
                icon={<RotateLeft />}
                title={config.locale.ROTATE_LEFT}
                onClick={onRotateLeft}
              />
            )}
            {rotateRight && (
              <HeaderButton
                icon={<RotateRight />}
                title={config.locale.ROTATE_RIGHT}
                onClick={onRotateRight}
              />
            )}
          </>
        )}
        {autoplay && (
          <HeaderButton
            disabled={autoPlayDisabled}
            icon={playing ? <Stop /> : <Play />}
            title={
              playing
                ? config.locale.AUTOPLAY_STOP
                : config.locale.AUTOPLAY_PLAY
            }
            onClick={onAutoPlay}
          />
        )}
        {fullscreen && (
          <HeaderButton
            icon={isFullscreen ? <FullScreenExit /> : <FullScreen />}
            title={
              isFullscreen
                ? config.locale.FULLSCREEN_EXIT
                : config.locale.FULLSCREEN_ENTER
            }
            onClick={onFullscreen}
          />
        )}
        {download && (
          <HeaderButton
            icon={<Download width={20} height={20} />}
            title={config.locale.DOWNLOAD}
            onClick={onDownload}
          />
        )}
        <HeaderButton
          icon={<Close width={20} height={20} />}
          title={config.locale.EXIT}
          onClick={onExit}
        />
      </div>
    </div>
  );
};

Header.defaultProps = {
  className: '',
  style: {},
  visible: true,
  reset: true,
  zoom: true,
  zoomInDisabled: false,
  zoomOutDisabled: false,
  rotate: true,
  rotateLeft: true,
  rotateRight: true,
  autoplay: true,
  playing: false,
  fullscreen: true,
  download: true,
  isFullscreen: false,
  onReset: FUNC_EMPTY,
  onZoomIn: FUNC_EMPTY,
  onZoomOut: FUNC_EMPTY,
  onRotateLeft: FUNC_EMPTY,
  onRotateRight: FUNC_EMPTY,
  onAutoPlay: FUNC_EMPTY,
  onFullscreen: FUNC_EMPTY,
  onDownload: FUNC_EMPTY,
  onExit: FUNC_EMPTY,
};
