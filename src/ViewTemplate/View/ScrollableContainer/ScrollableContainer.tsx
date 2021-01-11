import * as React from 'react';
import { useViewContext } from '../useViewContext';
import { verticalScroll } from '../../emotionUtilityClasses';
import { antiqueBrass } from '../../colors';
import { css, CSSObject } from '@emotion/react';

export const ScrollableContainer: React.FC = ({ children }) => {
  const { reservedWidth } = useViewContext();

  const styles = React.useMemo<CSSObject>(
    () => ({
      backgroundColor: antiqueBrass,
      boxSizing: 'border-box',
      float: 'left',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: 'absolute',
      padding: 15,
      marginLeft: reservedWidth,
      width: `calc(100% - ${reservedWidth}px)`,
    }),
    [reservedWidth]
  );

  return <section css={css([styles, verticalScroll])}>{children}</section>;
};
