import { getAccounts, serializeIban } from 'api'
import accounts from 'api/accounts'
import { Currencies } from 'api/currencies'
import { LoadMore, Paper } from 'components/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'
import styled from 'styled-components'
import { Balance, Emoji, Iban } from './style'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`
const List = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`

export const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  }).format(value / 100)

export const CurrencyEmoji: Record<Currencies, string> = {
  AZN: '🇦🇿',
  EUR: '🇪🇺',
  USD: '🇺🇸',
}

const Accounts = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const [items, setItems] = useState<typeof accounts[0][]>([])
  const { transactionId, cardId } = useParams() as RouteParams
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    getAccounts({
      page,
      cardId,
      transactionId,
    })
      .then((res) => {
        if (res.page === 0 && res.items.length === 1) {
          navigate(serializeIban(res.items[0].iban))
        }
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
          <Paper to={`${pathname}/${serializeIban(item.iban)}`} key={item.id}>
            <Emoji>{CurrencyEmoji[item.currency]}</Emoji>
            <Iban>{item.iban}</Iban>
            <Balance>{formatCurrency(item.balance, item.currency)}</Balance>
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

export default Accounts
