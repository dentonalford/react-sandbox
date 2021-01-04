

enum Timescale {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}

const timelineContext = React.createContext(
  timescale: Timescale.day,
);
