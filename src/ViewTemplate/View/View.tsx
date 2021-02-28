import * as React from 'react';
import { CSSObject } from '@emotion/react';
import { ViewContextProvider } from './useViewContext';
import { green } from '../colors';

interface ViewProps {
  height: number;
  width: number;
}

export const View: React.FC<ViewProps> = ({ children, height, width }) => {
  const styles = React.useMemo<CSSObject>(
    () => ({
      backgroundColor: green,
      boxSizing: 'border-box',
      width,
      height,
      position: 'absolute',
    }),
    [height, width]
  );
  return (
    <ViewContextProvider>
      <div css={styles}>{children}</div>
    </ViewContextProvider>
  );
};
