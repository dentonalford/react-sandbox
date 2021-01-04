import * as React from 'react';
import { css } from '@emotion/react';
import { styles } from './Bar.styles';

export interface BarProps {
  backgroundColor?: string;
  borderColor?: string;
}

export const Bar: React.FC<BarProps> = ({
  backgroundColor = 'lightGrey',
  borderColor = 'transparent',
  children,
}) => {
  const barStyleFromProps = css({
    backgroundColor,
    borderColor,
  });

  return <div css={[styles, barStyleFromProps]}>{children}</div>;
};
