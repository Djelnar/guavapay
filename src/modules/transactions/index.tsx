import React from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'

const Transactions = () => {
  const { accountId, cardId } = useParams() as RouteParams
  return (
    <>
      <div>{accountId}</div>
      <div>{cardId}</div>
    </>
  )
}

export default Transactions
