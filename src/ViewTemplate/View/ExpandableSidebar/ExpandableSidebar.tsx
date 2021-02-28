import * as React from 'react';
import { CSSObject } from '@emotion/react';
import { useViewContext } from '../useViewContext';
import { yellow } from '../../colors';

interface ExpandableSidebarProps {
  collapsedWidth: number;
  expandedWidth: number;
}

export const ExpandableSidebar: React.FC<ExpandableSidebarProps> = ({
  children,
  collapsedWidth,
  expandedWidth,
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const { registerWidth } = useViewContext();

  React.useEffect(() => {
    registerWidth({ component: 'ExpandableSidebar', width: collapsedWidth });
  }, [collapsedWidth, registerWidth]);

  const styles = React.useMemo<CSSObject>(
    () => ({
      backgroundColor: yellow,
      boxSizing: 'border-box',
      float: 'left',
      width: expanded ? expandedWidth : collapsedWidth,
      zIndex: 100,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }),
    [collapsedWidth, expanded, expandedWidth]
  );

  return (
    <section
      css={styles}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {children}
    </section>
  );
};
