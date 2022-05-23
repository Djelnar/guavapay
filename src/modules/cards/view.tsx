import React from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'

const CardView = () => {
  const { cardMaskedNumber } = useParams() as RouteParams

  return <div>{cardMaskedNumber}</div>
}

export default CardView
