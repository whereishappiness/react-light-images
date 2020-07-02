import React, { FunctionComponent } from 'react';
import { IconBase, IconProps } from './IconBase';

export const FullScreenExit: FunctionComponent<IconProps> = (props) => {
  return (
    <IconBase {...props}>
      <path
        d="M597.333333 597.333333h213.333334v85.333334h-128v128h-85.333334v-213.333334m-384 0h213.333334v213.333334H341.333333v-128H213.333333v-85.333334m128-384h85.333334v213.333334H213.333333V341.333333h128V213.333333m469.333334 128v85.333334h-213.333334V213.333333h85.333334v128h128z"
        fill="CurrentColor"
      />
    </IconBase>
  );
};
