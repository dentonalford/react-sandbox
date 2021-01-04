import * as React from 'react';

export enum Timescale {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}

type VoidFunction<T> = (args: T) => void;

interface TimelineContext {
  timescale: string;
  setTimescale: VoidFunction<Timescale> | null;
}

const timelineContext = React.createContext<TimelineContext>({
  timescale: Timescale.day,
  setTimescale: null,
});

const TimelineContextProvider: React.FC = ({ children }) => {
  const { Provider } = timelineContext;

  const [timescale, setTimescale] = React.useState<Timescale>(Timescale.day);

  const value: TimelineContext = {
    timescale,
    setTimescale,
  };

  return <Provider value={value}>{children}</Provider>;
};

const useTimelineContext = (): TimelineContext => {
  const context = React.useContext(timelineContext);
  if (context === undefined) {
    throw new Error(
      'useTimelineContext must be used within a TimelineContextProvider'
    );
  }
  return context;
};

export { TimelineContextProvider, useTimelineContext };
