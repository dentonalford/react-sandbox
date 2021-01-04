import { css, SerializedStyles } from '@emotion/react';
import { controlPanelHeight } from '../timelineStyleConstants.styles';

export const input: SerializedStyles = css({
  opacity: 0.01,
  zIndex: 100,
  '&:checked + label': {
    color: 'red',
  },
});

export const container: SerializedStyles = css({
  display: 'flex',
  height: controlPanelHeight,
  alignItems: 'center',
});
