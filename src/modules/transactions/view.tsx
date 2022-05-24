import { getTransaction } from 'api'
import { Transaction } from 'api/transactions'
import { Heading, Paper } from 'components/ui'
import { formatCurrency } from 'lib/format-currency'
import { formatDate } from 'lib/format-date'
import { last } from 'lodash/fp'
import { get } from 'mcc'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams, ROUTE_CONSTANTS } from 'route-constants'
import { TransactionData } from './style'
import styled from 'styled-components'
import { usePathSegments } from 'lib/use-path-segments'
import { upperFirst } from 'lodash/fp'
import Breadcrumbs from 'components/breadcrumbs'

const Root = styled.div`
  display: grid;
  gap: 16px;
`
const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 16px;
`

const TransactionView = () => {
  const { transactionNumber } = useParams() as RouteParams
  const segments = usePathSegments()

  const [transaction, setTransaction] = useState<Transaction | null>(null)

  useEffect(() => {
    getTransaction({ id: last(transactionNumber!.split('-'))! }).then((tr) => {
      if (tr) {
        setTransaction(tr)
      }
    })
  }, [transactionNumber])

  return (
    <Root>
      <Breadcrumbs />
      <Heading>Transaction</Heading>
      <Layout>
        {transaction && (
          <>
            <Paper as="div">
              <TransactionData>{formatDate(new Date(transaction.transactionDate))}</TransactionData>
              <p>{transaction.merchantInfo}</p>
              <p>
                {get(transaction.mcc).edited_description} (MCC {get(transaction.mcc).mcc})
              </p>
              <TransactionData>{formatCurrency(transaction.amount, transaction.currency)}</TransactionData>
            </Paper>
            <div />
          </>
        )}
        {ROUTE_CONSTANTS.filter((item) => !segments.includes(item.listKey)).map((item) => (
          <Paper key={item.listKey} to={item.listKey}>
            View {upperFirst(item.listKey).replace(/s$/, '')}
          </Paper>
        ))}
      </Layout>
    </Root>
  )
}

export default TransactionView
