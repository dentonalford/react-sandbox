import * as React from 'react';
import { useViewDimensions, RegisterWidth } from './useViewDimensions';

type VoidFunction<T> = (args: T) => void;

interface ViewContext {
  reservedWidth: number;
  registerWidth: RegisterWidth;
}

const viewContext = React.createContext<ViewContext>({
  reservedWidth: 0,
  registerWidth: null,
});

const ViewContextProvider: React.FC = ({ children }) => {
  const { registerWidth, reservedWidth } = useViewDimensions();

  const { Provider } = viewContext;

  return (
    <Provider
      value={{
        registerWidth,
        reservedWidth,
      }}
    >
      {children}
    </Provider>
  );
};

const useViewContext = (): ViewContext => {
  const context = React.useContext(viewContext);
  if (context === undefined) {
    throw new Error('useViewContext must be used within a ViewContextProvider');
  }
  return context;
};

export { ViewContextProvider, useViewContext };
