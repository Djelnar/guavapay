import { getCards } from 'api'
import { Card } from 'api/cards'
import Breadcrumbs from 'components/breadcrumbs'
import CardComponent from 'components/card'
import { Heading, LoadMore } from 'components/ui'
import { useCurrency } from 'lib/use-currency'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'
import styled from 'styled-components'

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

const Cards = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const [items, setItems] = useState<Card[]>([])
  const { transactionNumber, accountIban } = useParams() as RouteParams

  const navigate = useNavigate()
  const currency = useCurrency()

  useEffect(() => {
    setLoading(true)
    getCards({
      page,
      transactionNumber,
      accountIban,
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
  }, [page, accountIban, transactionNumber, navigate])

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
      <Heading>
        Cards{' '}
        {accountIban && (
          <>
            <br />
            Account: {accountIban}
          </>
        )}
      </Heading>
      <List>
        {itemsPrepared.map((item) => (
          <CardComponent card={item} key={item.cardID} to={item.maskedCardNumber} />
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
