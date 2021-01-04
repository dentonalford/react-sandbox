import { endOfWeek, startOfWeek } from 'date-fns/esm';
import * as React from 'react';
import { Timescale } from './timescale';
import { useTimescale } from './useTimescale';

type VoidFunction<T> = (args: T) => void;

interface TimelineContext {
  eachDateOfTimescale: () => Date[];
  endOfInterval: Date;
  setTimescale: VoidFunction<Timescale> | null;
  setTargetDate: VoidFunction<Date> | null;
  startOfInterval: Date;
  timescale: string;
}

const timelineContext = React.createContext<TimelineContext>({
  eachDateOfTimescale: () => [],
  endOfInterval: endOfWeek(new Date(), { weekStartsOn: 0 }),
  setTargetDate: null,
  setTimescale: null,
  startOfInterval: startOfWeek(new Date(), { weekStartsOn: 0 }),
  timescale: Timescale.week,
});

const TimelineContextProvider: React.FC = ({ children }) => {
  const {
    eachDateOfTimescale,
    endOfInterval,
    setTargetDate,
    setTimescale,
    startOfInterval,
    timescale,
  } = useTimescale({ timescale: undefined });

  const { Provider } = timelineContext;

  return (
    <Provider
      value={{
        eachDateOfTimescale,
        endOfInterval,
        setTargetDate,
        setTimescale,
        startOfInterval,
        timescale,
      }}
    >
      {children}
    </Provider>
  );
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
