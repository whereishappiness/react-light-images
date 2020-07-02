import React, { FunctionComponent, ReactNode } from 'react';
import classnames from 'classnames';

export interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  viewBox?: string;
}

export interface IconBaseProps extends IconProps {
  children?: ReactNode;
}

export const IconBase: FunctionComponent<IconBaseProps> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <svg
      className={classnames(['riv-icon', className])}
      fill="CurrentColor"
      {...rest}
    >
      {children}
    </svg>
  );
};

IconBase.defaultProps = {
  className: '',
  style: {},
  width: 24,
  height: 24,
  viewBox: '0 0 1024 1024',
};
