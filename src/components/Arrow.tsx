import React, { FunctionComponent, CSSProperties, useCallback } from 'react';
import classnames from 'classnames';
import { Left, Right } from '../icons';
import './Arrow.less';

export interface ArrowProps {
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  visible?: boolean;
  size?: 'small' | 'normal' | 'large';
  title?: string;
  type?: 'left' | 'right';
  round?: boolean;
  onClick?: () => void;
}

interface ArrowSizeItem {
  width: number;
  height: number;
}

interface ArrowSizes {
  small: ArrowSizeItem;
  normal: ArrowSizeItem;
  large: ArrowSizeItem;
}

const sizes: ArrowSizes = {
  small: {
    width: 16,
    height: 16,
  },
  normal: {
    width: 24,
    height: 24,
  },
  large: {
    width: 32,
    height: 32,
  },
};

export const Arrow: FunctionComponent<ArrowProps> = (props) => {
  const {
    className,
    style,
    disabled,
    visible,
    title,
    size,
    type,
    round,
    onClick,
  } = props;
  const { width: iconWidth, height: iconHeight } = sizes[size || 'normal'];

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      e.preventDefault();

      if (!disabled && onClick) {
        onClick();
      }
    },
    [disabled, onClick]
  );

  return (
    <div
      className={classnames([
        'riv-arrow',
        disabled ? 'riv-arrow-disabled' : '',
        visible ? '' : 'hide',
        `riv-arrow-${type}`,
        round ? 'riv-arrow-round' : '',
        className,
      ])}
      style={style}
      title={title}
      onClick={handleClick}
    >
      {type === 'left' && <Left width={iconWidth} height={iconHeight} />}
      {type === 'right' && <Right width={iconWidth} height={iconHeight} />}
    </div>
  );
};

Arrow.defaultProps = {
  className: '',
  disabled: false,
  visible: true,
  style: {},
  size: 'normal',
  title: '',
  type: 'left',
  round: false,
  onClick: undefined,
};
