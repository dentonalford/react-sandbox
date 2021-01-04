import * as React from 'react';
import { css } from '@emotion/react';
import { styles } from './Bar.styles';

export interface BarProps {
  backgroundColor?: string;
  borderColor?: string;
  endPct: number;
  startPct: number;
}

export const Bar: React.FC<BarProps> = ({
  backgroundColor = 'lightGrey',
  borderColor = 'transparent',
  children,
  endPct,
  startPct,
}) => {
  const barStyleFromProps = css({
    backgroundColor,
    borderColor,
    left: `${startPct}%`,
    right: `${endPct}%`,
  });

  return <div css={[styles, barStyleFromProps]}>{children}</div>;
};
