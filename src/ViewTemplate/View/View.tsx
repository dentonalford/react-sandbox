import * as React from 'react';
import { ViewContextProvider } from './useViewContext';
import { isabelline } from '../colors';

interface ViewProps {
  height: number;
  width: number;
}

export const View: React.FC<ViewProps> = ({ children, height, width }) => {
  const styles = React.useMemo(
    () => ({
      backgroundColor: isabelline,
      boxSizing: 'border-box',
      width,
      height,
      display: 'flex',
    }),
    [height, width]
  );
  return (
    <ViewContextProvider>
      <div css={styles}>{children}</div>
    </ViewContextProvider>
  );
};
