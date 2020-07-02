import React from 'react';
import { storiesOf } from '@storybook/react';
import { Lightbox, ImageDataItem } from '../src/components';
import { useState } from '@storybook/addons';

storiesOf('Components', module).add(
  'Lightbox',
  () => {
    const dataSource: Array<ImageDataItem> = [
      {
        title: 'aaa',
        src: 'https://whereishappiness.github.io/react-image-viewer/a.jpg',
        description: 'picture from devserver',
      },
      {
        title: 'bbb',
        src: 'https://whereishappiness.github.io/react-image-viewer/b.jpg',
        description: 'picture from devserver',
      },
      {
        title: 'ccc',
        src: 'https://whereishappiness.github.io/react-image-viewer/c.jpg',
        description: 'picture from devserver',
      },
      {
        title: 'ddd',
        src: 'https://whereishappiness.github.io/react-image-viewer/d.jpg',
        description: 'picture from devserver',
      },
      {
        title: 'eee',
        src: 'https://w.wallhaven.cc/full/2e/wallhaven-2eq3gg.jpg',
        thumb: 'https://th.wallhaven.cc/small/2e/2eq3gg.jpg',
        description: 'picture from wallhaven',
      },
    ];

    const [visible, setVisible] = useState<boolean>(false);

    return (
      <div style={{ padding: 50 }}>
        <button onClick={() => setVisible(true)}>toggle</button>
        {visible && (
          <Lightbox onClose={() => setVisible(false)} dataSource={dataSource} />
        )}
      </div>
    );
  },
  { notes: 'Lightbox' }
);
