import { getAccount } from 'api'
import accounts from 'api/accounts'
import { Paper } from 'components/ui'
import { formatIban } from 'lib/format-iban'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from 'route-constants'
import { CurrencyEmoji, formatCurrency } from '.'
import { Balance, Emoji, Iban } from './style'

const AccountView = () => {
  const { accountIban } = useParams() as RouteParams

  const [account, setAccount] = useState<typeof accounts[0] | null>(null)

  useEffect(() => {
    getAccount({ iban: accountIban! }).then((acc) => {
      if (acc) {
        setAccount(acc)
      }
    })
  }, [accountIban])

  return (
    <div>
      {account && (
        <Paper as="div">
          <Emoji>{CurrencyEmoji[account.currency]}</Emoji>
          <Iban>{formatIban(account.iban)}</Iban>
          <Balance>{formatCurrency(account.balance, account.currency)}</Balance>
        </Paper>
      )}
    </div>
  )
}

export default AccountView
