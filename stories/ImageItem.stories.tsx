import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { ImageItem } from '../src/components';

storiesOf('Components', module).add(
  'ImageItem',
  () => {
    const degree = select('degree', [0, 90, 180, 270], 0);
    const scale = select('scale', [0.5, 1, 2, 3, 4, 5], 1);
    const url = 'https://whereishappiness.github.io/react-image-viewer/a.jpg';

    return <ImageItem src={url} degree={degree} scale={scale} spinType="double-bounce" />;
  },
  { notes: 'image item' }
);
