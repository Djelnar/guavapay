import React from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'

const Cards = () => {
  const { accountId, transactionId } = useParams() as RouteParams

  return (
    <>
      <div>{accountId}</div>
      <div>{transactionId}</div>
    </>
  )
}

export default Cards
