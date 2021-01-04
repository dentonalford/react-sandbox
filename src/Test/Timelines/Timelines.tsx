import * as React from 'react';

import { Bar } from './Bar/Bar';
import { TimelineControls } from './TimelineControls/TimelineControls';

export const Timelines: React.FC = () => {
  return (
    <React.Fragment>
      <TimelineControls />
      <Bar>I&apos;m a bar</Bar>
    </React.Fragment>
  );
};
