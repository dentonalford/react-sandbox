import * as React from 'react';

import { Bar } from './Bar/Bar';
import { TimelineControls } from './TimelineControls/TimelineControls';
import { TimelineContextProvider } from './useTimelineContext/useTimelineContext';
import { TimelineDateHeaders } from './TimelineDateHeaders/TimelineDateHeaders';

export const Timelines: React.FC = () => {
  return (
    <TimelineContextProvider>
      <TimelineControls />
      <TimelineDateHeaders />
      <Bar>I&apos;m a bar</Bar>
    </TimelineContextProvider>
  );
};
