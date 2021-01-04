import { css, SerializedStyles } from '@emotion/react';
import { rowHeight } from '../timelineStyleConstants.styles';

type TableStyles = () => SerializedStyles;
type HeaderCellStyles = (args: { datesInInterval: number }) => SerializedStyles;
type BodyStyles = () => SerializedStyles;
type CellStyles = (args: { datesInInterval: number }) => SerializedStyles;

export const table: TableStyles = () =>
  css({
    borderCollapse: 'collapse',
    height: 500,
    tableLayout: 'fixed',
    width: '100%',
  });

export const th: HeaderCellStyles = ({ datesInInterval }) =>
  css({
    border: '1px solid lightgrey',
    height: rowHeight,
    width: `${1 / datesInInterval}%`,
    minWidth: `${1 / datesInInterval}%`,
  });

export const tbody: BodyStyles = () =>
  css({
    display: 'block',
    overflow: 'auto',
    height: `calc(100% - ${rowHeight}px)`,
    width: '100%',
  });

export const td: CellStyles = ({ datesInInterval }) =>
  css({
    borderLeft: '1px solid lightgrey',
    width: `${1 / datesInInterval}%`,
    minWidth: `${1 / datesInInterval}%`,
    '&:last-of-type': {
      borderRight: '1px solid lightgrey',
    },
  });
