import { FunctionComponent } from 'react';
import { TabbedPanel } from './TabbedPanel';

export default {
  title: 'Tabbed Panel',
  component: TabbedPanel,
};

export const BasicTabbedPanel: FunctionComponent = () => (
  <TabbedPanel tabs={['one', 'two', 'three']}>
    <div>Child One</div>
    <div>Child Two</div>
    <div>Child Three</div>
  </TabbedPanel>
);
