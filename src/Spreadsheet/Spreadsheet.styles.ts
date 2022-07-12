import { CSSObject } from '@emotion/react'
import * as colors from '../ViewTemplate/colors'

const ROW_HEIGHT = 40
const TABLE_WIDTH = 800

const boxSizing: CSSObject = {
  boxSizing: 'border-box',
  '*': { boxSizing: 'border-box' },
}

const cellDefaults: CSSObject = {
  padding: '0.33em',
  height: ROW_HEIGHT,
  border: `1px solid ${colors.ashGray}`,
}

export const table: CSSObject = {
  ...boxSizing,
  borderCollapse: 'collapse',
  border: `1px solid ${colors.antiqueBrass}`,
  width: TABLE_WIDTH,

  tr: {
    height: ROW_HEIGHT,
  },
  th: {
    ...cellDefaults,
    fontWeight: 'bold',
  },
  td: {
    ...cellDefaults,
  },
}
