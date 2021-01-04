import * as React from 'react';
import { Story } from '@storybook/react';
import { Bar, BarProps } from './Bar';

export default {
  title: 'Bar',
  component: Bar,
  argTypes: {
    backgroundColor: { control: 'color' },
    borderColor: { control: 'color' },
    children: { control: 'text' },
  },
};

interface StoryArgs extends BarProps {
  children: string;
}

const Template: Story<StoryArgs> = ({ ...args }) => <Bar {...args} />;

export const Default: Story<StoryArgs> = Template.bind({});
Default.args = { children: 'A Button' };
