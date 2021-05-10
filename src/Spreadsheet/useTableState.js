import React, { createContext, useState, useContext } from 'react'

const TableStateContext = createContext()

const addWithCeiling = (curr, ceil) => (curr + 1 > ceil ? ceil : curr + 1)

const subtractWithFloor = (curr, floor = 0) =>
  curr - 1 < floor ? floor : curr - 1

export const TableStateProvider = ({ children }) => {
  const [focusedRow, setFocusedRow] = useState(0)
  const [focusedColumn, setFocusedColumn] = useState(0)
  const [cellIsActive, setCellIsActive] = useState(false)

  const ensureInactive = () => {
    if (cellIsActive) setCellIsActive(false)
  }

  const focusNextColumn = () => {
    ensureInactive()
    setFocusedColumn(addWithCeiling(focusedColumn, 1))
  }

  const focusPrevColumn = () => {
    ensureInactive()
    setFocusedColumn(subtractWithFloor(focusedColumn))
  }

  const focusNextRow = () => {
    ensureInactive()
    setFocusedRow(addWithCeiling(focusedRow, 2))
  }

  const focusPrevRow = () => {
    ensureInactive()
    setFocusedRow(subtractWithFloor(focusedRow))
  }

  const activateCell = () => setCellIsActive(true)
  const deactivateCell = () => setCellIsActive(false)

  return (
    <TableStateContext.Provider
      value={{
        focusNextColumn,
        focusPrevColumn,
        focusNextRow,
        focusPrevRow,
        focusedRow,
        focusedColumn,
        cellIsActive,
        activateCell,
        deactivateCell,
      }}
    >
      {children}
    </TableStateContext.Provider>
  )
}

export const useTableState = () => {
  const tableStateContext = useContext(TableStateContext)

  if (tableStateContext === undefined) {
    throw new Error('useTableState must be used inside of a TableStateProvider')
  }

  return tableStateContext
}
