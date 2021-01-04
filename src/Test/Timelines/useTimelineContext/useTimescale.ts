import * as React from 'react';
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  Interval,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
} from 'date-fns';

import { Timescale } from './timescale';

enum ActionTypes {
  SetTargetDate = 'SetTargetDate',
  SetTimescale = 'SetTimescale',
}

interface TimescaleFunctions {
  getStartOfInterval: (args: Date) => Date;
  getEndOfInterval: (args: Date) => Date;
  getEachOfInterval: (args: Interval) => Date[];
}

const getFunctionsByTimescale = (timescale: Timescale): TimescaleFunctions => {
  return {
    [Timescale.week]: {
      getEachOfInterval: eachDayOfInterval,
      getEndOfInterval: endOfWeek,
      getStartOfInterval: startOfWeek,
    },
    [Timescale.month]: {
      getEachOfInterval: eachDayOfInterval,
      getEndOfInterval: endOfMonth,
      getStartOfInterval: startOfMonth,
    },
    [Timescale.quarter]: {
      getEachOfInterval: eachWeekOfInterval,
      getEndOfInterval: endOfQuarter,
      getStartOfInterval: startOfQuarter,
    },
    [Timescale.year]: {
      getEachOfInterval: eachMonthOfInterval,
      getEndOfInterval: endOfYear,
      getStartOfInterval: startOfYear,
    },
  }[timescale];
};

interface TimescaleReducerState {
  endOfInterval: Date;
  startOfInterval: Date;
  timescale: Timescale;
  targetDate: Date;
}

interface TimescaleReducerPayload {
  targetDate?: Date;
  timescale?: Timescale;
}

interface TimescaleReducerAction {
  type: string;
  payload: TimescaleReducerPayload;
}

type TimescaleReducer = (
  state: TimescaleReducerState,
  action: TimescaleReducerAction
) => TimescaleReducerState;

const timescaleReducer: TimescaleReducer = (state, action) => {
  const {
    targetDate = state.targetDate,
    timescale = state.timescale,
  } = action.payload;

  const { getEndOfInterval, getStartOfInterval } = getFunctionsByTimescale(
    timescale
  );

  switch (action.type) {
    case ActionTypes.SetTargetDate: {
      return {
        ...state,
        endOfInterval: getEndOfInterval(targetDate),
        startOfInterval: getStartOfInterval(targetDate),
        targetDate: targetDate,
      };
    }
    case ActionTypes.SetTimescale: {
      return {
        ...state,
        endOfInterval: getEndOfInterval(targetDate),
        startOfInterval: getStartOfInterval(targetDate),
        timescale,
      };
    }
  }
};

type UseTimescale = (args: {
  timescale?: Timescale;
}) => {
  endOfInterval: Date;
  setTargetDate: (args: Date) => void;
  setTimescale: (args: Timescale) => void;
  startOfInterval: Date;
  timescale: Timescale;
  eachDateOfTimescale: () => Date[];
};

const useTimescale: UseTimescale = ({ timescale = Timescale.week }) => {
  const { getStartOfInterval, getEndOfInterval } = getFunctionsByTimescale(
    timescale
  );

  const defaultDate = new Date();
  const [state, dispatch] = React.useReducer<TimescaleReducer>(
    timescaleReducer,
    {
      endOfInterval: getEndOfInterval(defaultDate),
      startOfInterval: getStartOfInterval(defaultDate),
      targetDate: defaultDate,
      timescale,
    }
  );

  const setTargetDate = (targetDate: Date) =>
    dispatch({ type: ActionTypes.SetTargetDate, payload: { targetDate } });
  const setTimescale = (timescale: Timescale) =>
    dispatch({ type: ActionTypes.SetTimescale, payload: { timescale } });

  // todo usecallback
  const eachDateOfTimescale = () =>
    getFunctionsByTimescale(state.timescale).getEachOfInterval({
      start: state.startOfInterval,
      end: state.endOfInterval,
    });

  return {
    eachDateOfTimescale,
    endOfInterval: state.endOfInterval,
    setTargetDate,
    setTimescale,
    startOfInterval: state.startOfInterval,
    timescale: state.timescale,
  };
};

export { useTimescale };
