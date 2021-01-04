import { css, SerializedStyles } from '@emotion/react';

export const bars = (): SerializedStyles =>
  css({
    position: 'relative',
    width: '100%',
    zIndex: 1000,
  });
