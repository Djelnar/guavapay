import React from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'

const TransactionView = () => {
  const { transactionId } = useParams() as RouteParams

  return <div>{transactionId}</div>
}

export default TransactionView
