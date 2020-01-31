import React from 'react';
import tableStyles from './table.module.css';

const Table = ({ headers=[], rows=[] }) => {
  const rowRenderer = (rowObject) => {
    const rowKeys = Object.keys(rowObject).filter(row => row !== "comment")
    return (
      <>
        {rowKeys.map(key => {
          return <span>{rowObject[key]}</span>
        })}
      </>
    )
  }
  console.log({rows})

  const headerRenderer = (headers) => {
    return (
      <>
        {headers.map(header => {
          return <span>{header}</span>
        })}
      </>
    )
  }

  return (
    <div className={tableStyles.tableContainer}>
      {headerRenderer(headers)}
      {rows.map(row => {
        return rowRenderer(row)
      })}
    </div>
  )
}

export default Table;