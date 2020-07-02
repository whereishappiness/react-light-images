import React from 'react';
import { storiesOf } from '@storybook/react';
import { Arrow } from '../src/components';

storiesOf('Components', module).add(
  'Arrow',
  () => {
    return (
      <div>
        <Arrow type="left" title="前一张" disabled />
        <Arrow type="right" round />
      </div>
    );
  },
  { notes: 'arrow' }
);
