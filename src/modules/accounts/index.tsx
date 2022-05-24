import { getAccounts } from 'api'
import { Account } from 'api/accounts'
import Breadcrumbs from 'components/breadcrumbs'
import { Heading, LoadMore, Paper } from 'components/ui'
import { CurrencyEmoji, formatCurrency } from 'lib/format-currency'
import { formatIban } from 'lib/format-iban'
import { useCurrency } from 'lib/use-currency'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'
import styled from 'styled-components'
import { Balance, Emoji, Iban } from './style'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`
const List = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  align-self: stretch;
`

const Accounts = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const [items, setItems] = useState<Account[]>([])
  const { transactionNumber, maskedCardNumber } = useParams() as RouteParams

  const navigate = useNavigate()
  const currency = useCurrency()

  useEffect(() => {
    setLoading(true)
    getAccounts({
      page,
      transactionNumber,
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
  }, [page, transactionNumber, maskedCardNumber, navigate])

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage(page + 1)
    }
  }, [hasMore, page, loading])

  const itemsPrepared = useMemo(
    () => items.filter((item) => !currency || item.currency === currency),
    [items, currency],
  )

  useEffect(() => {
    if (itemsPrepared.length === 0) {
      handleLoadMore()
    }
  }, [itemsPrepared, handleLoadMore])

  return (
    <Root>
      <Breadcrumbs />
      <Heading>Accounts</Heading>
      <List>
        {itemsPrepared.map((item) => (
          <Paper to={item.iban} key={item.id}>
            <Emoji>{CurrencyEmoji[item.currency]}</Emoji>
            <Iban>{formatIban(item.iban)}</Iban>
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
