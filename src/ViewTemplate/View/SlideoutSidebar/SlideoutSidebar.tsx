import * as React from 'react';
import { CSSObject } from '@emotion/react';
import { useViewContext } from '../useViewContext';
import { ashGray } from '../../colors';

interface SlideoutSidebarProps {
  width: number;
}

export const SlideoutSidebar: React.FC<SlideoutSidebarProps> = ({
  children,
  width,
}) => {
  const { sidebarExpanded } = useViewContext();

  const styles = React.useMemo<CSSObject>(
    () => ({
      backgroundColor: ashGray,
      bottom: 0,
      boxSizing: 'border-box',
      display: sidebarExpanded ? 'block' : 'none',
      float: 'left',
      left: sidebarExpanded ? `calc(100% - ${width}px)` : '100%',
      position: 'absolute',
      top: 0,
      width,
      zIndex: 100,
    }),
    [width, sidebarExpanded]
  );

  return <section css={styles}>{children}</section>;
};
