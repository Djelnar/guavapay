import React from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'

const Accounts = () => {
  const { transactionId, cardId } = useParams() as RouteParams
  return (
    <>
      <div>{transactionId}</div>
      <div>{cardId}</div>
    </>
  )
}

export default Accounts
