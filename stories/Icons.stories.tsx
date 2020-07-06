import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Left,
  Right,
  ZoomIn,
  ZoomOut,
  FullScreen,
  FullScreenExit,
  Close,
  Play,
  Download,
  RotateLeft,
  RotateRight,
  Eye,
  RectOnRect,
  Info,
  Stop
} from '../src/icons';

storiesOf('Components', module).add(
  'Icons',
  () => {
    const itemStyle = {
      flex: 1,
      textAlign: 'center',
      marginRight: 16,
      color: '#777',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'row', fontSize: 13 }}>
        <div style={itemStyle}>
          <Left />
          <p>Left</p>
        </div>
        <div style={itemStyle}>
          <Right />
          <p>Right</p>
        </div>
        <div style={itemStyle}>
          <ZoomIn />
          <p>ZoomIn</p>
        </div>
        <div style={itemStyle}>
          <ZoomOut />
          <p>ZoomOut</p>
        </div>
        <div style={itemStyle}>
          <FullScreen />
          <p>FullScreen</p>
        </div>
        <div style={itemStyle}>
          <FullScreenExit />
          <p>FullScreenExit</p>
        </div>
        <div style={itemStyle}>
          <Close />
          <p>Close</p>
        </div>
        <div style={itemStyle}>
          <Play />
          <p>Play</p>
        </div>
        <div style={itemStyle}>
          <Download />
          <p>Download</p>
        </div>
        <div style={itemStyle}>
          <RotateLeft />
          <p>RotateLeft</p>
        </div>
        <div style={itemStyle}>
          <RotateRight />
          <p>RotateRight</p>
        </div>
        <div style={itemStyle}>
          <Eye />
          <p>Eye</p>
        </div>
        <div style={itemStyle}>
          <RectOnRect />
          <p>RectOnRect</p>
        </div>
        <div style={itemStyle}>
          <Info />
          <p>Info</p>
        </div>
        <div style={itemStyle}>
          <Stop />
          <p>Stop</p>
        </div>
      </div>
    );
  },
  { notes: 'icons' }
);
