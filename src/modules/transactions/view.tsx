import { getTransaction } from 'api'
import { Transaction } from 'api/transactions'
import { Paper } from 'components/ui'
import { formatCurrency } from 'lib/format-currency'
import { formatDate } from 'lib/format-date'
import { last } from 'lodash/fp'
import { get } from 'mcc'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'
import { TransactionData } from './style'

const TransactionView = () => {
  const { transactionNumber } = useParams() as RouteParams

  const [transaction, setTransaction] = useState<Transaction | null>(null)

  useEffect(() => {
    getTransaction({ id: last(transactionNumber!.split('-'))! }).then((tr) => {
      if (tr) {
        setTransaction(tr)
      }
    })
  }, [transactionNumber])

  return (
    transaction && (
      <Paper as="div">
        <TransactionData>{formatDate(new Date(transaction.transactionDate))}</TransactionData>
        <p>{transaction.merchantInfo}</p>
        <p>
          {get(transaction.mcc).edited_description} (MCC {get(transaction.mcc).mcc})
        </p>
        <TransactionData>{formatCurrency(transaction.amount, transaction.currency)}</TransactionData>
      </Paper>
    )
  )
}

export default TransactionView
