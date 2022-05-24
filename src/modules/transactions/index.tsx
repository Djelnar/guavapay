import { getTransactions, serializeDate } from 'api'
import { Transaction } from 'api/transactions'
import Breadcrumbs from 'components/breadcrumbs'
import { Heading, LoadMore, Paper, SubHeading } from 'components/ui'
import { formatCardNumber } from 'lib/format-card-number'
import { formatCurrency } from 'lib/format-currency'
import { formatIban } from 'lib/format-iban'
import { useCurrency } from 'lib/use-currency'
import { groupBy } from 'lodash/fp'
import { get } from 'mcc'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'
import styled from 'styled-components'
import { TransactionData, TransactionDescription } from './style'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  gap: 16px;
`
const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  gap: 16px;

  align-self: stretch;
`
const ItemLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  gap: 16px;
`

const Transactions = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const [items, setItems] = useState<Transaction[]>([])
  const { accountIban, maskedCardNumber } = useParams() as RouteParams
  const currency = useCurrency()

  useEffect(() => {
    setLoading(true)
    getTransactions({
      page,
      accountIban,
      maskedCardNumber,
    })
      .then((res) => {
        setItems((s) => s.concat(res.items))
        if (res.items.length < 10) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page, accountIban, maskedCardNumber])

  const transactionsGrouped = useMemo(() => {
    return groupBy((item) => new Date(item.transactionDate).toDateString(), items)
  }, [items])

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage(page + 1)
    }
  }, [hasMore, page, loading])

  return (
    <Root>
      <Breadcrumbs />
      <Heading>
        Transactions{' '}
        {accountIban && (
          <>
            <br />
            Account: {formatIban(accountIban)}
          </>
        )}
        {maskedCardNumber && (
          <>
            <br />
            Card: {formatCardNumber(maskedCardNumber)}
          </>
        )}
      </Heading>
      <List>
        {Object.entries(transactionsGrouped).map(([dateKey, trs]) => {
          return (
            <Group key={dateKey}>
              <SubHeading>{dateKey}</SubHeading>
              {trs.map((item) => (
                <Paper to={serializeDate(item.transactionDate, item.transactionID)} key={item.transactionID}>
                  <ItemLayout>
                    <div>
                      <TransactionData>{item.merchantInfo}</TransactionData>
                      <TransactionDescription>{get(item.mcc)?.edited_description}</TransactionDescription>
                    </div>
                    <TransactionData>{formatCurrency(item.amount, item.currency)}</TransactionData>
                  </ItemLayout>
                </Paper>
              ))}
            </Group>
          )
        })}
      </List>
      {hasMore && (
        <LoadMore disabled={loading} onClick={handleLoadMore}>
          Load More
        </LoadMore>
      )}
    </Root>
  )
}

export default Transactions
