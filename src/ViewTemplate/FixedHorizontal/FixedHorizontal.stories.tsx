import * as React from 'react';
import { Story } from '@storybook/react';
import * as colors from '../colors';
import { FixedHorizontal } from './FixedHorizontal';

export default {
  component: FixedHorizontal,
  title: 'FixedHorizontal',
};

const Container = ({ children }) => (
  <div css={{ width: `100%`, height: '100%' }}>{children}</div>
);
const Box = ({ color }) => (
  <div css={{ border: `2px solid ${color}`, width: `100%`, height: '100%' }} />
);

export const Basic: Story = () => {
  return (
    <Container>
      <FixedHorizontal>
        <Box color={colors.cyan} />
        <Box color={colors.green} />
        <Box color={colors.red} />
      </FixedHorizontal>
    </Container>
  );
};

export const SplitOverrides: Story = () => {
  return (
    <Container>
      <FixedHorizontal splits={['quarter', 'half', 'quarter']}>
        <Box color={colors.cyan} />
        <Box color={colors.green} />
        <Box color={colors.red} />
      </FixedHorizontal>
    </Container>
  );
};
