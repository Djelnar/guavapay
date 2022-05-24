import { getCard } from 'api'
import { Card } from 'api/cards'
import Breadcrumbs from 'components/breadcrumbs'
import CardComponent from 'components/card'
import { Heading, Paper } from 'components/ui'
import { formatCardNumber } from 'lib/format-card-number'
import { usePathSegments } from 'lib/use-path-segments'
import { upperFirst } from 'lodash/fp'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams, ROUTE_CONSTANTS } from 'route-constants'
import styled from 'styled-components'

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

const CardView = () => {
  const { maskedCardNumber } = useParams() as RouteParams
  const segments = usePathSegments()

  const [card, setCard] = useState<Card | null>(null)

  useEffect(() => {
    getCard({ maskedCardNumber: maskedCardNumber! }).then((card) => {
      if (card) {
        setCard(card)
      }
    })
  }, [maskedCardNumber])

  return (
    <Root>
      <Breadcrumbs />
      <Heading>Card {formatCardNumber(maskedCardNumber!)}</Heading>
      <Layout>
        {card && (
          <>
            <CardComponent card={card} />
            <div />
          </>
        )}
        {ROUTE_CONSTANTS.filter((item) => !segments.includes(item.listKey)).map((item) => (
          <Paper key={item.listKey} to={item.listKey}>
            View {upperFirst(item.listKey)}
          </Paper>
        ))}
      </Layout>
    </Root>
  )
}

export default CardView
