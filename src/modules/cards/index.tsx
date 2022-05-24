import { getCards, serializeCard } from 'api'
import cards from 'api/cards'
import { Currencies } from 'api/currencies'
import { LoadMore } from 'components/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'
import styled from 'styled-components'
import { Card, ExpireDate, MaskedCardNumber } from './style'

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
  width: 100%;
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

const Cards = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const [items, setItems] = useState<typeof cards>([])
  const { transactionNumber, accountIban } = useParams() as RouteParams
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    getCards({
      page,
      transactionNumber,
      accountIban,
    })
      .then((res) => {
        if (res.page === 0 && res.items.length === 1) {
          navigate(serializeCard(res.items[0].maskedCardNumber))
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
  }, [page, accountIban, transactionNumber, navigate])

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage(page + 1)
    }
  }, [hasMore, page, loading])

  return (
    <Root>
      <List>
        {items.map((item) => (
          <Card cardColor={item.color} to={`${pathname}/${serializeCard(item.maskedCardNumber)}`} key={item.cardID}>
            <MaskedCardNumber>{item.maskedCardNumber}</MaskedCardNumber>
            <ExpireDate>
              {new Date(item.expireDate).getMonth()}/{new Date(item.expireDate).getFullYear()}
            </ExpireDate>
          </Card>
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

export default Cards
