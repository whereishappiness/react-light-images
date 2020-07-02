import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { Spin } from '../src/components';

storiesOf('Components', module).add(
  'Spin',
  () => {
    const type = select(
      'Type',
      [
        'rotating-plane',
        'double-bounce',
        'wave',
        'wandering-cubes',
        'spinner-pulse',
        'chasing-dots',
        'three-bounce',
        'circle',
        'cube-grid',
        'fading-circle',
        'folding-cube',
      ],
      'rotating-plane'
    );

    return <Spin type={type} spinning />;
  },
  { notes: 'spin' }
);
