import { css, SerializedStyles } from '@emotion/react';

export const input: SerializedStyles = css({
  opacity: 0.01,
  zIndex: 100,
  '&:checked + label': {
    color: 'red',
  },
});
