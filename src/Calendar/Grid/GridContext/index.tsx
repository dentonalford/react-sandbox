import * as React from 'react';

type GridContextValue = {
  categories: string[];
  numberOfDays: number;
  targetDate: Date;
};
export const GridContext = React.createContext<GridContextValue | undefined>(
  undefined
);

export const GridContextProvider: React.FC<GridContextValue> = ({
  children,
  categories,
  numberOfDays,
  targetDate,
}) => {
  return (
    <GridContext.Provider
      value={{
        categories,
        numberOfDays,
        targetDate,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = (): GridContextValue => {
  const context = React.useContext(GridContext);

  if (context === undefined) {
    throw new Error('Must use useGridContext within a GridContextProvider.');
  }

  return context;
};
