import React, { FunctionComponent } from 'react';
import { IconBase, IconProps } from './IconBase';

export const FullScreen: FunctionComponent<IconProps> = (props) => {
  return (
    <IconBase {...props}>
      <path
        d="M213.333333 213.333333h213.333334v85.333334H298.666667v128H213.333333V213.333333m384 0h213.333334v213.333334h-85.333334V298.666667h-128V213.333333m128 384h85.333334v213.333334h-213.333334v-85.333334h128v-128m-298.666666 128v85.333334H213.333333v-213.333334h85.333334v128h128z"
        fill="CurrentColor"
      />
    </IconBase>
  );
};
