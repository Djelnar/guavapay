import React from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'

const AccountView = () => {
  const { accountId } = useParams() as RouteParams

  return <div>{accountId}</div>
}

export default AccountView
