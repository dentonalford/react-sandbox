import * as React from 'react';

import { Bar } from './Bar/Bar';
import { TimelineControls } from './TimelineControls/TimelineControls';
import { TimelineContextProvider } from './useTimelineContext';

export const Timelines: React.FC = () => {
  return (
    <TimelineContextProvider>
      <TimelineControls />
      <Bar>I&apos;m a bar</Bar>
    </TimelineContextProvider>
  );
};
