import React from 'react';
import { Spreadsheet } from './Spreadsheet';
import { TableStateProvider } from './useTableState';

export default {
  title: 'Spreadsheet',
  component: Spreadsheet,
};

export const Basic = () => (
  <TableStateProvider>
    <Spreadsheet />
  </TableStateProvider>
);
