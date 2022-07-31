import { Story } from '@storybook/react'
import { IntervalDays } from './IntervalDays'
import { Periods, WeekStartsOn } from '../types'

type StoryArgs = {
  period: Periods
  weekStartsOn: WeekStartsOn
}

export default {
  title: 'Cadence/IntervalDays',
  component: IntervalDays,
  argTypes: {
    period: {
      options: Object.values(Periods),
      defaultValue: Periods.week,
      control: { type: 'radio' },
    },
    weekStartsOn: {
      options: ['0', '1', '2', '3', '4', '5', '6'],
      defaultValue: '0',
      control: { type: 'radio' },
    },
  },
}

const Template: Story<StoryArgs> = (args) => <IntervalDays {...args} />

export const IntervalDaysStory = Template.bind({})
