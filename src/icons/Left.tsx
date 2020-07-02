import React, { FunctionComponent } from 'react';
import { IconBase, IconProps } from './IconBase';

export const Left: FunctionComponent<IconProps> = (props) => {
  return (
    <IconBase {...props}>
      <path d="M724 896q-15.008 0-27.008-10.016L272.992 544.992q-16-12.992-16-34.016t16-34.016L695.008 137.952q14.016-11.008 32-8.992t29.504 16 9.504 32-16 28.992l-380 304.992 382.016 307.008q14.016 11.008 16 28.992t-10.016 32q-12.992 16.992-34.016 16.992z" />
    </IconBase>
  );
};
