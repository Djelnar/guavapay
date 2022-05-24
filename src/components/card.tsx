import { Card as TCard } from 'api/cards'
import { formatCardNumber } from 'lib/format-card-number'
import { formatExpireDate } from 'lib/format-expire-date'
import React from 'react'
import styled from 'styled-components'
import { Paper } from './ui'

type TProps = {
  card: TCard
  to?: string
}

const Root = styled(Paper)<{ cardColor: string; disabled?: boolean }>`
  border-radius: 14px;
  width: 100%;
  aspect-ratio: 1.586;
  background-color: ${(p) => (p.disabled ? 'grey' : p.cardColor)};
  opacity: ${(p) => (p.disabled ? 0.3 : 1)};
  margin: 0 auto;
`
export const MaskedCardNumber = styled.p`
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  font-weight: 700;
  color: white;
`
export const ExpireDate = styled.p`
  font-weight: 700;
  font-size: 28px;
  color: white;
`

const Card = ({ card, to = '' }: TProps) => {
  return (
    <Root to={to} cardColor={card.color} disabled={!card.status} key={card.cardID}>
      <MaskedCardNumber>{formatCardNumber(card.maskedCardNumber)}</MaskedCardNumber>
      <ExpireDate>{formatExpireDate(card.expireDate)}</ExpireDate>
    </Root>
  )
}

export default Card
