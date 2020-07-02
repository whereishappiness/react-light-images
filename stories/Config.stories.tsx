import React from 'react';
import { storiesOf } from '@storybook/react';
import { Lightbox, ImageDataItem } from '../src/components';
import { ConfigProvider } from '../src/Config';
import { ZH_CN } from '../src/locales';

storiesOf('Config', module).add(
  'Default',
  () => {
    const dataSource: Array<ImageDataItem> = [
      {
        title: 'aaa',
        src: 'https://whereishappiness.github.io/react-image-viewer/a.jpg',
        description: 'local aaa',
      },
      {
        title: 'bbb',
        src: 'https://whereishappiness.github.io/react-image-viewer/b.jpg',
        description: 'local bbb',
      },
      {
        title: 'ccc',
        src: 'https://whereishappiness.github.io/react-image-viewer/c.jpg',
        description: 'local ccc',
      },
      {
        title: 'ddd',
        src: 'https://whereishappiness.github.io/react-image-viewer/d.jpg',
        description: 'local ddd',
      },
      {
        title: 'eee',
        src: 'https://w.wallhaven.cc/full/2e/wallhaven-2eq3gg.jpg',
        thumb: 'https://th.wallhaven.cc/small/2e/2eq3gg.jpg',
        description: 'picture from web',
      },
    ];

    return (
      <ConfigProvider value={{ locale: ZH_CN }}>
        <Lightbox visible dataSource={dataSource} />
      </ConfigProvider>
    );
  },
  { notes: 'config' }
);
