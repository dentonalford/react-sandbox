import React from 'react';
import { 
  Tab, 
  TabList, 
  TabPanel, 
  Tabs, 
} from 'react-tabs';

interface Props {
  tabs: string[];
};

export const TabbedPanel: React.FunctionComponent<Props> = ({ 
  children,
  tabs = [],
}) => {
  const [tabIndex, setTabIndex] = React.useState<number>(0);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
      <TabList>
        {tabs.map( tab => <Tab>{tab}</Tab> )}
      </TabList>
  
      {React.Children.map(children, (child) => (
        <TabPanel>
          {child}
        </TabPanel>
      ))}

      <TabPanel>
        <h2>Any content 1</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
    </Tabs>
  );
};