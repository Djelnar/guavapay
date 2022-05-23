import { getTransaction } from 'api'
import transactions from 'api/transactions'
import { Paper } from 'components/ui'
import { last } from 'lodash/fp'
import { get } from 'mcc'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'
import { TransactionData } from './style'

const { format: formatDate } = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'full',
  timeStyle: 'short',
})

export const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  }).format(value / 100)

const TransactionView = () => {
  const { transactionId } = useParams() as RouteParams

  const [transaction, setTransaction] = useState<typeof transactions[0] | null>(null)

  useEffect(() => {
    getTransaction({ id: last(transactionId!.split('-'))! }).then((tr) => {
      if (tr) {
        setTransaction(tr)
      }
    })
  }, [transactionId])

  return (
    <div>
      {transaction && (
        <Paper as="div">
          <TransactionData>{formatDate(new Date(transaction.transactionDate))}</TransactionData>
          <p>{transaction.merchantInfo}</p>
          <p>
            {get(transaction.mcc).edited_description} (MCC {get(transaction.mcc).mcc})
          </p>
          <TransactionData>{formatCurrency(transaction.amount, transaction.currency)}</TransactionData>
        </Paper>
      )}
    </div>
  )
}

export default TransactionView
