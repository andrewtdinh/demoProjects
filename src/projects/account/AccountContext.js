import React from "react";

const initialState = {
  transactions: [
    {
      transactionDate: "2020-01-06",
      description: "Payment from Client X",
      transactionId: "1234",
      amount: 238.00
    },
    {
      transactionDate: "2020-01-07",
      description: "Payment from Client Y",
      transactionId: "1235",
      amount: 647.89
    },
    {
      transactionDate: "2020-01-08",
      description: "Payment from Client B",
      transactionId: "1236",
      amount: 333.33
    },
    {
      transactionDate: "2020-01-15",
      description: "PG & E Bill",
      transactionId: "36788",
      amount: -365.25
    },
    {
      transactionDate: "2019-12-15",
      description: "Payment from Client Z on 2019",
      transactionId: "891",
      amount: 1500.01
    },
   
  ],
  accountTotal: 1000,
  invoices: [
    {
      creationDate: "2020-01-07",
      invoiceId: "1234",
      amount: 238,
      comment: "This invoice has a later creationDate, so NOT PAID"
    },
    {
      creationDate: "2020-01-05",
      invoiceId: "1235",
      amount: 647.89,
      comment: "This invoice should be PAID"
    },
    {
      creationDate: "2020-01-07",
      invoiceId: "1239",
      amount: 333.33,
      comment: "This invoice non-matching invoiceId, so NOT PAID"
    },
    {
      creationDate: "2019-12-13",
      invoiceId: "891",
      amount: 1500.01,
      comment: "This invoice is not in last 30 days, so not displayed"
    },
  ]

};

const AccountContext = React.createContext(initialState)

function ContextProvider(props) {
  return (
    <AccountContext.Provider value={initialState}>
      {props.children}
    </AccountContext.Provider>
  )
}
export { AccountContext, ContextProvider }
