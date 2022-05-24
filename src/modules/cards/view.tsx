import { getCard } from 'api'
import { Card } from 'api/cards'
import CardComponent from 'components/card'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'

const CardView = () => {
  const { maskedCardNumber } = useParams() as RouteParams

  const [card, setCard] = useState<Card | null>(null)

  useEffect(() => {
    getCard({ maskedCardNumber: maskedCardNumber! }).then((card) => {
      if (card) {
        setCard(card)
      }
    })
  }, [maskedCardNumber])

  return card && <CardComponent small card={card} />
}

export default CardView
