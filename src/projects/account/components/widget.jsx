import React, { useContext } from 'react';
import WidgetStyles from './widget.module.css'
import { AccountContext } from '../AccountContext'
import Table from './table';

const Widget = (props) => {
  const data = useContext(AccountContext);
  const { invoices } = data;
  const headers = Object.keys(invoices[0]);
  console.log({data, headers})
  return (
    <div className={WidgetStyles.widgetContainer}>
      <Table headers={headers} rows={invoices} />
    </div>
  )
} 

export default Widget;