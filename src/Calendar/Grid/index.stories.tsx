import * as React from 'react';
import { Story } from '@storybook/react';
import { GridContextProvider } from './GridContext';
import { Grid } from '.';

export default {
  title: 'Grid',
  component: Grid,
};

export const Default: Story = () => (
  <GridContextProvider
    groups={['fe', 'fi', 'fo', 'fum']}
    numberOfDays={3}
    targetDate={new Date()}
  >
    <Grid />
  </GridContextProvider>
);
