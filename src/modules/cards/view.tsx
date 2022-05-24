import React from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'

const CardView = () => {
  const { maskedCardNumber } = useParams() as RouteParams

  return <div>{maskedCardNumber}</div>
}

export default CardView
