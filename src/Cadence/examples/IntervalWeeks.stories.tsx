import { Story } from '@storybook/react'
import { IntervalWeeks } from './IntervalWeeks'
import { Periods, WeekStartsOn } from '../types'

type StoryArgs = {
  period: Periods
  weekStartsOn: WeekStartsOn
}

export default {
  title: 'Cadence/IntervalWeeks',
  component: IntervalWeeks,
  argTypes: {
    period: {
      options: Object.values(Periods),
      defaultValue: Periods.month,
      control: { type: 'radio' },
    },
    weekStartsOn: {
      options: ['0', '1', '2', '3', '4', '5', '6'],
      defaultValue: '0',
      control: { type: 'radio' },
    },
  },
}

const Template: Story<StoryArgs> = (args) => <IntervalWeeks {...args} />

export const IntervalWeeksStory = Template.bind({})
