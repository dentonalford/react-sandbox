import * as React from 'react';
import { View } from './View/View';
import { ScrollableContainer } from './View/ScrollableContainer/ScrollableContainer';
import { ExpandableSidebar } from './View/ExpandableSidebar/ExpandableSidebar';
import { SlideoutSidebar } from './View/SlideoutSidebar/SlideoutSidebar';

export const ViewTemplate: React.FC = () => {
  const dummyText = React.useMemo(
    () =>
      Array(100)
        .fill('blah')
        .map((x, i) => <p key={i}>{x}</p>),
    []
  );

  return (
    <View width={600} height={400}>
      <ExpandableSidebar collapsedWidth={50} expandedWidth={150} />
      <ScrollableContainer>{dummyText}</ScrollableContainer>
      <SlideoutSidebar width={250} />
    </View>
  );
};
