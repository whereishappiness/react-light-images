import React, { FunctionComponent, CSSProperties, useCallback } from 'react';
import classnames from 'classnames';
import { ImageDataItem } from './interfaces';
import { FUNC_EMPTY } from '../helper';
import './Indicator.less';

export interface IndicatorProps {
  className?: string;
  style?: CSSProperties;
  dataSource?: Array<ImageDataItem>;
  active?: number;
  onChange?: (index: number) => void;
}

export const Indicator: FunctionComponent<IndicatorProps> = (props) => {
  const { className, style, dataSource, active, onChange } = props;
  const handleClick = useCallback(
    (index: number) => {
      if (onChange) {
        onChange(index);
      }
    },
    [onChange]
  );

  return (
    <div className={classnames(['riv-indicator', className])} style={style}>
      {dataSource &&
        dataSource.length > 0 &&
        dataSource.map((item, index) => (
          <div
            key={index}
            className={classnames([
              'riv-indicator-item',
              active === index ? 'active' : '',
            ])}
            onClick={() => handleClick(index)}
          >
            <div className="riv-indicator-item--thumb">
              <img src={item.thumb || item.src} alt={item.title} />
            </div>
          </div>
        ))}
    </div>
  );
};

Indicator.defaultProps = {
  className: '',
  style: {},
  dataSource: [],
  active: 0,
  onChange: FUNC_EMPTY,
};
