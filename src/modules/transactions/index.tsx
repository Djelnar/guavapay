import { getTransactions, serializeDate } from 'api'
import transactions from 'api/transactions'
import { LoadMore, Paper } from 'components/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'
import styled from 'styled-components'
import { get } from 'mcc'
import { TransactionData, TransactionDescription } from './style'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  gap: 40px;
`
const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  gap: 16px;
`
const ItemLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  }).format(value / 100)

const Transactions = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const [items, setItems] = useState<typeof transactions>([])
  const { accountId, cardId } = useParams() as RouteParams
  const { pathname } = useLocation()

  useEffect(() => {
    setLoading(true)
    getTransactions({
      page,
      cardId,
      accountId,
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
  }, [page])

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage(page + 1)
    }
  }, [hasMore, page, loading])

  return (
    <Root>
      <List>
        {items.map((item) => (
          <Paper to={`${pathname}/${serializeDate(item.transactionDate, item.transactionID)}`} key={item.transactionID}>
            <ItemLayout>
              <div>
                <TransactionData>{item.merchantInfo}</TransactionData>
                <TransactionDescription>{get(item.mcc)?.edited_description}</TransactionDescription>
              </div>
              <TransactionData>{formatCurrency(item.amount, item.currency)}</TransactionData>
            </ItemLayout>
          </Paper>
        ))}
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
