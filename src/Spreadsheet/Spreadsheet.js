/* eslint-disable react/jsx-key */
import { css } from '@emotion/react'
import React from 'react'
import { useTable, useAbsoluteLayout } from 'react-table'
import { useHotkeys } from 'react-hotkeys-hook'
import { useTableState } from './useTableState'
import * as styles from './Spreadsheet.styles'

const Cell = (props) => {
  const { focusedRow, focusedColumn, cellIsActive } = useTableState()

  const currentVisibleColumn = props.visibleColumns[focusedColumn] || {}

  const cellIsFocused =
    props.column.id === currentVisibleColumn.id &&
    props.row.index === focusedRow

  return (
    <React.Fragment>
      {props.value}
      {cellIsFocused && !cellIsActive ? ' focused' : ''}
      {cellIsFocused && cellIsActive ? ' active' : ''}
    </React.Fragment>
  )
}

export const Spreadsheet = () => {
  const defaultColumn = React.useMemo(
    () => ({
      width: 250,
      minWidth: 100,
      maxWidth: 400,
      Cell,
    }),
    []
  )

  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1',
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data, defaultColumn }, useAbsoluteLayout)

  const {
    activateCell,
    cellIsActive,
    deactivateCell,
    focusNextColumn,
    focusNextRow,
    focusPrevColumn,
    focusPrevRow,
  } = useTableState()

  useHotkeys('left', () => focusPrevColumn(), [focusPrevColumn])
  useHotkeys('right', () => focusNextColumn(), [focusNextColumn])
  useHotkeys('up', () => focusPrevRow(), [focusPrevRow])
  useHotkeys('down', () => focusNextRow(), [focusNextRow])

  useHotkeys(
    'enter',
    () => (cellIsActive ? deactivateCell() : activateCell()),
    [cellIsActive, deactivateCell, activateCell]
  )

  return (
    // apply the table props
    <div css={css(styles.table())} {...getTableProps()}>
      <div css={css(styles.thead())}>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <div css={css(styles.tr())} {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <div css={css(styles.th())} {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render('Header')
                    }
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
      {/* Apply the table body props */}
      <div css={css(styles.tbody())} {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <div css={css(styles.tr())} {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <div css={css(styles.td())} {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
