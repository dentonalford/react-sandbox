/* eslint-disable @typescript-eslint/ban-types */
import * as React from 'react';
import { addDays, eachDayOfInterval, startOfDay } from 'date-fns';
import { useGridContext } from './GridContext';

type GridProps = {
  ColumnComponent: React.FC<{ category: string; date: Date }>;
};

export const Grid = ({ ColumnComponent }: GridProps): JSX.Element => {
  const { categories, numberOfDays, targetDate } = useGridContext();
  const days = eachDayOfInterval({
    start: startOfDay(targetDate),
    end: startOfDay(addDays(targetDate, numberOfDays - 1)),
  });

  return (
    <GridContainer
      numberOfColumns={numberOfDays}
      numberOfGroups={categories.length}
    >
      {categories.map((category) => (
        <React.Fragment key={category}>
          <CategoryRow>{category}</CategoryRow>
          <ContentRowContainer>
            {days.map((day) => (
              <DayColumnContainer
                key={day.toISOString()}
                numberOfColumns={numberOfDays}
              >
                <DayColumn key={day.toISOString()}>
                  <ColumnComponent category={category} date={day} />
                </DayColumn>
              </DayColumnContainer>
            ))}
          </ContentRowContainer>
        </React.Fragment>
      ))}
    </GridContainer>
  );
};

type GridContainerProps = { numberOfColumns: number; numberOfGroups: number };
const GridContainer: React.FC<GridContainerProps> = ({ children }) => (
  <div
    css={{
      display: 'flex',
      backgroundColor: 'lightred',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      boxSizing: 'border-box',
      '*': { boxSizing: 'border-box' },
    }}
  >
    {children}
  </div>
);

type CategoryRowProps = {};
const CategoryRow: React.FC<CategoryRowProps> = ({ children }) => (
  <div
    css={{
      border: '1px solid blue',
      flexBasis: 24,
      height: 24,
    }}
  >
    {children}
  </div>
);

type ContentRowContainerProps = {};
const ContentRowContainer: React.FC<ContentRowContainerProps> = ({
  children,
}) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-evenly',
      border: '1px solid green',
      padding: '0 6px',
    }}
  >
    {children}
  </div>
);

type DayColumnContainerProps = {
  numberOfColumns: number;
};

const DayColumnContainer: React.FC<DayColumnContainerProps> = ({
  children,
}) => {
  const { numberOfDays } = useGridContext();

  const columnWidth = React.useMemo(() => {
    return 100 / numberOfDays;
  }, [numberOfDays]);

  return (
    <div
      css={{
        border: '1px solid red',
        width: `${columnWidth}%`,
        flex: `0 1 ${columnWidth}%`,
        margin: '0 6px',
      }}
    >
      {children}
    </div>
  );
};

type DayColumnProps = {};
const DayColumn: React.FC<DayColumnProps> = ({ children }) => {
  return <div>{children}</div>;
};
