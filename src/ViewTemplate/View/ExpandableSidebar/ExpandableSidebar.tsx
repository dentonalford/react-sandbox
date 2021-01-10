import * as React from 'react';
import { useViewContext } from '../useViewContext';
import { champagnePink } from '../../colors';

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

  const styles = React.useMemo(
    () => ({
      backgroundColor: champagnePink,
      boxSizing: 'border-box',
      height: '100%',
      width: expanded ? expandedWidth : collapsedWidth,
      zIndex: 100,
      position: 'relative',
      top: 0,
      left: 0,
      bottom: 0,
      flex: `0 0 ${expanded ? expandedWidth : collapsedWidth}px`,
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
