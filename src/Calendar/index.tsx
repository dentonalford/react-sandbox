import * as React from 'react';
import { Grid } from './Grid';
import { GridContextProvider } from './Grid/GridContext';
import {
  MomentContextProvider,
  useMomentContext,
  getMomentsByCategoryAndDate,
} from './MomentContext';

// todo dedup from makeMoments
const categories = ['Category A', 'Category B', 'Category C', 'Category D'];

export const Calendar = (): JSX.Element => {
  return (
    <MomentContextProvider>
      <GridContextProvider
        categories={categories}
        targetDate={new Date()}
        numberOfDays={7}
      >
        <Grid ColumnComponent={CardColumn} />
      </GridContextProvider>
    </MomentContextProvider>
  );
};

type CardColumnProps = {
  category: string;
  date: Date;
};

const CardColumn: React.FC<CardColumnProps> = ({ category, date }) => {
  const { byCategory, moments } = useMomentContext();

  if (moments === undefined) return null;

  const momentsForColumn = getMomentsByCategoryAndDate(
    moments,
    byCategory,
    category,
    date
  ).sort((a, b) => a.position - b.position);

  return momentsForColumn.map((moment) => <Card key={moment.id} {...moment} />);
};

const Card = ({ id, title, scheduledAt, image }): JSX.Element => (
  <CardContainer>
    <ImageContainer>
      <img
        loading="lazy"
        css={{
          objectFit: 'contain',
          maxWidth: '100%',
          borderRadius: '8px 8px 0 0',
        }}
        src={image}
      />
    </ImageContainer>
    id: {id}
    title: {title}
    scheduledAt: {scheduledAt}
  </CardContainer>
);

const CardContainer: React.FC = ({ children }) => (
  <div
    css={{
      width: '100%',
      borderRadius: 8,
      border: '1px solid black',
      fontFamily: 'segoe ui',
      fontSize: 10,
      marginBottom: 12,
    }}
  >
    {children}
  </div>
);

const ImageContainer: React.FC = ({ children }) => (
  <div
    css={{
      width: '100%',
    }}
  >
    {children}
  </div>
);
