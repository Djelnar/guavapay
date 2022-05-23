import React from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'

const CardView = () => {
  const { cardId } = useParams() as RouteParams

  return <div>{cardId}</div>
}

export default CardView
