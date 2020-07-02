export interface Locale {
  RESET: string;
  ZOOM_OUT: string;
  ZOOM_IN: string;
  ROTATE_LEFT: string;
  ROTATE_RIGHT: string;
  AUTOPLAY_PLAY: string;
  AUTOPLAY_STOP: string;
  FULLSCREEN_ENTER: string;
  FULLSCREEN_EXIT: string;
  DOWNLOAD: string;
  EXIT: string;
  LOAD_FAIL: string;
  LOAD_RETRY: string;
  PREV: string;
  NEXT: string;
  IS_FIRST: string;
  IS_LAST: string;
}

export const EN_US: Locale = {
  RESET: 'reset',
  ZOOM_OUT: 'zoom out',
  ZOOM_IN: 'zoom in',
  ROTATE_LEFT: 'rotate 90 deg CCW',
  ROTATE_RIGHT: 'rotate 90 deg CW',
  AUTOPLAY_PLAY: 'auto play',
  AUTOPLAY_STOP: 'stop',
  FULLSCREEN_ENTER: 'enter fullscreen',
  FULLSCREEN_EXIT: 'exit fullscreen',
  DOWNLOAD: 'download',
  EXIT: 'exit',
  LOAD_FAIL: 'load failed',
  LOAD_RETRY: 'reload',
  PREV: 'previous page',
  NEXT: 'next page',
  IS_FIRST: 'This is the first page',
  IS_LAST: 'This is the last page',
};

export const ZH_CN: Locale = {
  RESET: '重置',
  ZOOM_OUT: '放大',
  ZOOM_IN: '缩小',
  ROTATE_LEFT: '逆时针旋转90度',
  ROTATE_RIGHT: '顺时针旋转90度',
  AUTOPLAY_PLAY: '自动播放',
  AUTOPLAY_STOP: '停止播放',
  FULLSCREEN_ENTER: '进入全屏',
  FULLSCREEN_EXIT: '退出全屏',
  DOWNLOAD: '下载',
  EXIT: '退出',
  LOAD_FAIL: '加载失败',
  LOAD_RETRY: '重新加载',
  PREV: '上一张',
  NEXT: '下一张',
  IS_FIRST: '已经是第一张',
  IS_LAST: '已经是最后张',
};
