import React from 'react';
import { storiesOf } from '@storybook/react';
import { Lightbox, ImageDataItem } from '../src/components';
import { ConfigProvider } from '../src/Config';
import { ZH_CN } from '../src/locales';
import { useState } from '@storybook/addons';

storiesOf('Components', module).add(
  'Config',
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
      {
        title: 'eee',
        src: 'https://w.wallhaven.cc/full/2e/wallhaven-2eq3gg.jpg',
        thumb: 'https://th.wallhaven.cc/small/2e/2eq3gg.jpg',
        description: 'picture from web',
      },
    ];

    const [visible, setVisible] = useState<boolean>(false);

    return (
      <div style={{ padding: 50 }}>
        <button onClick={() => setVisible(true)}>toggle</button>
        {visible && (
          <ConfigProvider value={{ locale: ZH_CN }}>
            <Lightbox download={false}
              onClose={() => setVisible(false)}
              dataSource={dataSource}
            />
          </ConfigProvider>
        )}
      </div>
    );
  },
  { notes: 'config' }
);
