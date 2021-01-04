import * as React from 'react';
import { Story } from '@storybook/react';
import { Timelines } from './Timelines';

export default {
  title: 'Timelines',
  component: Timelines,
};

const Template: Story = ({ ...args }) => <Timelines {...args} />;

export const Default: Story = Template.bind({});
