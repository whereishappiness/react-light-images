import React, { FunctionComponent } from 'react';
import './Spin.less';

export interface SpinProps {
  type?:
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
  spinning?: boolean;
}

export const Spin: FunctionComponent<SpinProps> = (props) => {
  const { type, spinning } = props;

  let innerNode: React.ReactNode;
  switch (type) {
    case 'rotating-plane':
    case 'spinner-pulse':
      break;
    case 'double-bounce':
      innerNode = (
        <>
          <div className="riv-spin-child  riv-spin-double-bounce1" />
          <div className="riv-spin-child  riv-spin-double-bounce2" />
        </>
      );
      break;
    case 'chasing-dots':
      innerNode = (
        <>
          <div className="riv-spin-child  riv-spin-dot1" />
          <div className="riv-spin-child  riv-spin-dot2" />
        </>
      );
      break;
    case 'wave':
      innerNode = (
        <>
          <div className="riv-spin-rect riv-spin-rect1" />
          <div className="riv-spin-rect riv-spin-rect2" />
          <div className="riv-spin-rect riv-spin-rect3" />
          <div className="riv-spin-rect riv-spin-rect4" />
          <div className="riv-spin-rect riv-spin-rect5" />
        </>
      );
      break;
    case 'wandering-cubes':
      innerNode = (
        <>
          <div className="riv-spin-cube riv-cube1" />
          <div className="riv-spin-cube riv-cube2" />
        </>
      );
      break;
    case 'three-bounce':
      innerNode = (
        <>
          <div className="riv-spin-child riv-bounce1" />
          <div className="riv-spin-child riv-bounce2" />
          <div className="riv-spin-child riv-bounce3" />
        </>
      );
      break;
    case 'circle':
      innerNode = (
        <>
          <div className="riv-spin-child riv-spin-circle1" />
          <div className="riv-spin-child riv-spin-circle2" />
          <div className="riv-spin-child riv-spin-circle3" />
          <div className="riv-spin-child riv-spin-circle4" />
          <div className="riv-spin-child riv-spin-circle5" />
          <div className="riv-spin-child riv-spin-circle6" />
          <div className="riv-spin-child riv-spin-circle7" />
          <div className="riv-spin-child riv-spin-circle8" />
          <div className="riv-spin-child riv-spin-circle9" />
          <div className="riv-spin-child riv-spin-circle10" />
          <div className="riv-spin-child riv-spin-circle11" />
          <div className="riv-spin-child riv-spin-circle12" />
        </>
      );
      break;
    case 'cube-grid':
      innerNode = (
        <>
          <div className="riv-spin-cube riv-spin-cube1" />
          <div className="riv-spin-cube riv-spin-cube2" />
          <div className="riv-spin-cube riv-spin-cube3" />
          <div className="riv-spin-cube riv-spin-cube4" />
          <div className="riv-spin-cube riv-spin-cube5" />
          <div className="riv-spin-cube riv-spin-cube6" />
          <div className="riv-spin-cube riv-spin-cube7" />
          <div className="riv-spin-cube riv-spin-cube8" />
          <div className="riv-spin-cube riv-spin-cube9" />
        </>
      );
      break;
    case 'fading-circle':
      innerNode = (
        <>
          <div className="riv-spin-circle riv-spin-circle1" />
          <div className="riv-spin-circle riv-spin-circle2" />
          <div className="riv-spin-circle riv-spin-circle3" />
          <div className="riv-spin-circle riv-spin-circle4" />
          <div className="riv-spin-circle riv-spin-circle5" />
          <div className="riv-spin-circle riv-spin-circle6" />
          <div className="riv-spin-circle riv-spin-circle7" />
          <div className="riv-spin-circle riv-spin-circle8" />
          <div className="riv-spin-circle riv-spin-circle9" />
          <div className="riv-spin-circle riv-spin-circle10" />
          <div className="riv-spin-circle riv-spin-circle11" />
          <div className="riv-spin-circle riv-spin-circle12" />
        </>
      );
      break;
    case 'folding-cube':
      innerNode = (
        <>
          <div className="riv-spin-cube riv-spin-cube1" />
          <div className="riv-spin-cube riv-spin-cube2" />
          <div className="riv-spin-cube riv-spin-cube3" />
          <div className="riv-spin-cube riv-spin-cube4" />
        </>
      );
      break;
    default:
      break;
  }

  return spinning ? (
    <div className={`riv-spin riv-spin-${type}`}>{innerNode}</div>
  ) : null;
};

Spin.defaultProps = {
  type: 'rotating-plane',
  spinning: false,
};
