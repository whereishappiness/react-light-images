import React from 'react';
import { storiesOf } from '@storybook/react';
import { Indicator } from '../src/components/Indicator';
import { ImageDataItem } from '../src/components';

storiesOf('Components', module).add(
  'Indicator',
  () => {
    const dataSource: Array<ImageDataItem> = [
      {
        title: 'aaa',
        src: 'https://whereishappiness.github.io/react-light-images/a.jpg',
        description: 'local aaa',
      },
      {
        title: 'bbb',
        src: 'https://whereishappiness.github.io/react-light-images/b.jpg',
        description: 'local bbb',
      },
      {
        title: 'ccc',
        src: 'https://whereishappiness.github.io/react-light-images/c.jpg',
        description: 'local ccc',
      },
      {
        title: 'ddd',
        src: 'https://whereishappiness.github.io/react-light-images/d.jpg',
        description: 'local ddd',
      },
    ];

    return (
      <div
        style={{
          backgroundColor: '#333',
          height: '100%',
          padding: '150px 50px 0 50px',
          boxSizing: 'border-box',
        }}
      >
        <Indicator dataSource={dataSource} />
      </div>
    );
  },
  { notes: 'a simple indicator' }
);
