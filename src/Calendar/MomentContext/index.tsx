import * as React from 'react';
import { produce } from 'immer';
import { format } from 'date-fns';
import { makeMoments } from '../../data/makeMoments';

type Moment = {
  categories: string[];
  id: string;
  image: string;
  position: number;
  scheduledAt: string;
  title: string;
};

type MomentContextValue = {
  moments?: Moment[];
  byCategory?: Record<string, Record<string, string[]>>;
};
export const MomentContext = React.createContext<
  MomentContextValue | undefined
>(undefined);

const SHORT_DATE_FORMAT = 'yyyy-MM-dd';

const reduceByCategoryAndDate = (acc, moment) =>
  produce(acc, (draft) => {
    const momentDay = format(new Date(moment.scheduledAt), SHORT_DATE_FORMAT);

    moment.categories.map((category) => {
      if (!draft[category]) draft[category] = {};

      if (!draft[category][momentDay]) {
        draft[category][momentDay] = [moment.id];
      } else {
        draft[category][momentDay].push(moment.id);
      }
    });
  });

const reduceById = (acc, moment) =>
  produce(acc, (draft) => {
    draft[moment.id] = moment;
  });

const fetchMoments = async (set: React.Dispatch<any>): Promise<void> => {
  const data = await makeMoments(1000);
  if (data?.moment === undefined) return;

  console.log('starting reducers');
  console.time('reducers');
  const categorizedMoments = data.moment.reduce(reduceByCategoryAndDate, {});
  const momentsById = data.moment.reduce(reduceById, {});
  console.timeEnd('reducers');
  set({ moments: momentsById, byCategory: categorizedMoments });
};

export const MomentContextProvider: React.FC<MomentContextValue> = ({
  children,
}) => {
  const [moments, setMoments] = React.useState<MomentContextValue>({
    byCategory: undefined,
    moments: undefined,
  });

  React.useEffect(() => {
    fetchMoments(setMoments);
  }, []);

  return (
    <MomentContext.Provider value={moments}>{children}</MomentContext.Provider>
  );
};

export const getMomentsByCategoryAndDate = (
  moments,
  byCategory,
  category: string,
  date: Date
) => {
  const shortDate = format(date, SHORT_DATE_FORMAT);

  const idsByCategory = byCategory?.[category]?.[shortDate];
  if (idsByCategory === undefined) return [];

  return idsByCategory.map((id) => moments[id]);
};

export const useMomentContext = (): MomentContextValue => {
  const context = React.useContext(MomentContext);

  if (context === undefined) {
    throw new Error(
      'Must use useMomentContext within a MomentContextProvider.'
    );
  }

  return context;
};
