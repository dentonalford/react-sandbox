import { CSSObject } from '@emotion/react';
import * as colors from '../ViewTemplate/colors';

const ROW_HEIGHT = 40;
const TABLE_WIDTH = 500;

const boxSizing: CSSObject = {
  boxSizing: 'border-box',
  '*': { boxSizing: 'border-box' },
};

export const table = (): CSSObject => ({
  ...boxSizing,
  borderCollapse: 'collapse',
  border: `1px solid ${colors.antiqueBrass}`,
  width: TABLE_WIDTH,
});

export const thead = (): CSSObject => ({});

export const tbody = (): CSSObject => ({});

const cellDefaults: CSSObject = {
  padding: '0.33em',
  height: ROW_HEIGHT,
  border: `1px solid ${colors.ashGray}`,
};

export const tr = (): CSSObject => ({
  height: ROW_HEIGHT,
});

export const th = (): CSSObject => ({
  ...cellDefaults,
  fontWeight: 'bold',
});

export const td = (): CSSObject => ({
  ...cellDefaults,
});
