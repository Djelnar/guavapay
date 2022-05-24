import { getCard } from 'api'
import cards from 'api/cards'
import { formatCardNumber } from 'lib/format-card-number'
import { formatExpireDate } from 'lib/format-expire-date'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'
import { Card, ExpireDate, MaskedCardNumber } from './style'

const CardView = () => {
  const { maskedCardNumber } = useParams() as RouteParams

  const [card, setCard] = useState<typeof cards[0] | null>(null)

  useEffect(() => {
    getCard({ maskedCardNumber: maskedCardNumber! }).then((card) => {
      if (card) {
        setCard(card)
      }
    })
  }, [maskedCardNumber])

  return (
    <div>
      {card && (
        <Card small cardColor={card.color} as="div">
          <MaskedCardNumber>{formatCardNumber(card.maskedCardNumber)}</MaskedCardNumber>
          <ExpireDate>{formatExpireDate(card.expireDate)}</ExpireDate>
        </Card>
      )}
    </div>
  )
}

export default CardView
