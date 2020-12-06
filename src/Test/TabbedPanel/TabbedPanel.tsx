import { FunctionComponent, useState, Children } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

interface Props {
  tabs: string[];
}

export const TabbedPanel: FunctionComponent<Props> = ({
  children,
  tabs = [],
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab}>{tab}</Tab>
        ))}
      </TabList>

      {Children.map(children, (child) => (
        <TabPanel>{child}</TabPanel>
      ))}
    </Tabs>
  );
};
