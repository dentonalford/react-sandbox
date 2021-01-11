import * as React from 'react';
import { useViewDimensions, RegisterWidth } from './useViewDimensions';

type EffectFunction = () => void;
type VoidFunction<T> = (args: T) => void;

interface ViewContext {
  registerWidth: RegisterWidth;
  reservedWidth: number;
  sidebarExpanded: boolean;
  toggleSidebar: EffectFunction;
}

const viewContext = React.createContext<ViewContext>({
  registerWidth: null,
  reservedWidth: 0,
  sidebarExpanded: false,
  toggleSidebar: null,
});

const ViewContextProvider: React.FC = ({ children }) => {
  const { registerWidth, reservedWidth } = useViewDimensions();
  const [sidebarExpanded, setSidebarExpanded] = React.useState<boolean>(false);

  const { Provider } = viewContext;

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  return (
    <Provider
      value={{
        registerWidth,
        reservedWidth,
        sidebarExpanded,
        toggleSidebar,
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
