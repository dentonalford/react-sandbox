import { css, SerializedStyles } from '@emotion/react';

import { rowHeight } from '../timelineStyleConstants.styles';

export const styles: SerializedStyles = css({
  border: '1px solid transparent',
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  height: rowHeight,
  justifyContent: 'center',
  padding: '.33em',
  width: '100%',
});
