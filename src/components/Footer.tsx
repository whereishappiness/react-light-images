import React, { FC } from 'react';
import classnames from 'classnames';
import { Indicator } from './Indicator';
import { ImageDataItem } from './interfaces';
import { FUNC_EMPTY } from '../helper';
import './Footer.less';

export interface FooterProps {
  active: number;
  dataSource: Array<ImageDataItem> | undefined;
  titlePosition?: 'left' | 'center' | 'right';
  description?: boolean;
  indicator?: boolean;
  onIndicatorChange?: (index: number) => void;
}

const MAX_SIZE = 15;

export const Footer: FC<FooterProps> = (props) => {
  const {
    active = 0,
    dataSource=[],
    titlePosition="left",
    description=false,
    indicator=true,
    onIndicatorChange=FUNC_EMPTY,
  } = props;

  const current = dataSource ? dataSource[active] : null;
  const visible =
    dataSource && dataSource.length > 0 && dataSource.length <= MAX_SIZE;
  return (
    <div className="riv-footer">
      {indicator && (
        <Indicator
          active={active}
          dataSource={dataSource}
          onChange={onIndicatorChange}
        />
      )}
      {visible && (
        <div
          className={classnames([
            'riv-footer-title',
            `riv-title-${titlePosition}`,
          ])}
        >
          <h3 className="riv-footer-title--title">{current?.title}</h3>
          {description && (
            <p className="riv-footer-title--desc">{current?.description}</p>
          )}
        </div>
      )}
    </div>
  );
};
