import * as React from 'react';

import { Bars } from './Bars/Bars';
import { TimelineControls } from './TimelineControls/TimelineControls';
import { TimelineContextProvider } from './useTimelineContext/useTimelineContext';
import { TimelineDateHeaders } from './TimelineDateHeaders/TimelineDateHeaders';

export const Timelines: React.FC = () => {
  return (
    <TimelineContextProvider>
      <TimelineControls />
      <TimelineDateHeaders>
        <Bars />
      </TimelineDateHeaders>
    </TimelineContextProvider>
  );
};
