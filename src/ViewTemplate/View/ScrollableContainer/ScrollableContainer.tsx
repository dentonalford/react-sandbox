import * as React from 'react';
import { useViewContext } from '../useViewContext';
import { verticalScroll } from '../../emotionUtilityClasses';
import { antiqueBrass } from '../../colors';
import { css } from '@emotion/react';

export const ScrollableContainer: React.FC = ({ children }) => {
  const { reservedWidth } = useViewContext();

  const styles = React.useMemo(
    () => ({
      backgroundColor: antiqueBrass,
      boxSizing: 'border-box',
      top: 0,
      bottom: 0,
      position: 'relative',
      padding: 15,
      flex: `0 0 calc(100% - ${reservedWidth}px)`,
    }),
    [reservedWidth]
  );

  return <section css={css([styles, verticalScroll])}>{children}</section>;
};
