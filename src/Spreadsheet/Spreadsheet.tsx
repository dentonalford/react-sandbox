import * as React from 'react'
import { css } from '@emotion/react'
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  Cell,
} from '@tanstack/react-table'
import { useHotkeys } from 'react-hotkeys-hook'
import { addDays, format } from 'date-fns'
import { useTableState } from './useTableState'
import * as styles from './Spreadsheet.styles'
import { ClassElement } from 'typescript'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'

type Moment = {
  title: string
  startDate?: Date
  endDate?: Date
}

const humanizeDay = (date: Date): string => format(date, 'yyyy-MM-dd')

const moments: Moment[] = [
  { title: 'Unscheduled Moment' },
  { title: 'Start Only', startDate: new Date() },
  {
    title: 'Fully Scheduled',
    startDate: new Date(),
    endDate: addDays(new Date(), 2),
  },
]

const TextCell = (props: ReturnType<Cell<Moment, string>['getContext']>) => {
  console.log('Cell props', props)

  const { getValue, row, column } = props

  const initialValue = getValue()
  const { focusedRow, focusedColumn, cellIsActive } = useTableState()

  // const currentVisibleColumn = props.visibleColumns[focusedColumn] || {}

  // const cellIsFocused =
  //   props.column.id === currentVisibleColumn.id &&
  //   props.row.index === focusedRow

  return (
    <React.Fragment>
      {/* {props.value} */}
      {/* {cellIsFocused && !cellIsActive ? ' focused' : ''}
      {cellIsFocused && cellIsActive ? ' active' : ''} */}
    </React.Fragment>
  )
}

export const Spreadsheet = () => {
  const defaultColumns: ColumnDef<Moment>[] = [
    {
      accessorFn: (row) => row.title,
      id: 'title',
      cell: TextCell,
      header: () => <span>Title</span>,
    },
    {
      accessorFn: (row) =>
        row.startDate === undefined
          ? 'Unscheduled'
          : humanizeDay(row.startDate),
      id: 'startDate',
      cell: (props) => props.getValue(),
      header: () => <span>Schedule Start</span>,
    },
    {
      accessorFn: (row) =>
        row.endDate === undefined ? 'Unscheduled' : humanizeDay(row.endDate),
      id: 'endDate',
      cell: (props) => props.getValue(),
      header: () => <span>Schedule End</span>,
    },
  ]

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: moments,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    debugAll: true,
  })

  // const {
  //   activateCell,
  //   cellIsActive,
  //   deactivateCell,
  //   focusNextColumn,
  //   focusNextRow,
  //   focusPrevColumn,
  //   focusPrevRow,
  // } = useTableState()

  // useHotkeys('left', () => focusPrevColumn(), [focusPrevColumn])
  // useHotkeys('right', () => focusNextColumn(), [focusNextColumn])
  // useHotkeys('up', () => focusPrevRow(), [focusPrevRow])
  // useHotkeys('down', () => focusNextRow(), [focusNextRow])

  // useHotkeys(
  //   'enter',
  //   () => (cellIsActive ? deactivateCell() : activateCell()),
  //   [cellIsActive, deactivateCell, activateCell]
  // )

  return (
    <table css={styles.table}>
      <thead>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
