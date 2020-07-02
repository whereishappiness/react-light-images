import React from 'react';
import { storiesOf } from '@storybook/react';
import { Header } from '../src/components';

storiesOf('Components', module).add(
  'Header',
  () => {
    return (
      <div style={{ height: '100%', backgroundColor: '#333', padding: 50 }}>
        <Header />
      </div>
    );
  },
  { notes: 'header' }
);
