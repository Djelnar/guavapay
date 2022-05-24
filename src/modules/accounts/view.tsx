import { getAccount } from 'api'
import { Account } from 'api/accounts'
import { Heading, Paper } from 'components/ui'
import { CurrencyEmoji, formatCurrency } from 'lib/format-currency'
import { formatIban } from 'lib/format-iban'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams, ROUTE_CONSTANTS } from 'route-constants'
import { Balance, Emoji, Iban } from './style'
import styled from 'styled-components'
import { upperFirst } from 'lodash/fp'
import { usePathSegments } from 'lib/use-path-segments'
import Breadcrumbs from 'components/breadcrumbs'

const Root = styled.div`
  display: grid;
  gap: 16px;
`
const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 16px;
`

const AccountView = () => {
  const { accountIban } = useParams() as RouteParams

  const segments = usePathSegments()
  console.log('🚀 ~ file: view.tsx ~ line 26 ~ AccountView ~ segments', segments)

  const [account, setAccount] = useState<Account | null>(null)

  useEffect(() => {
    getAccount({ iban: accountIban! }).then((acc) => {
      if (acc) {
        setAccount(acc)
      }
    })
  }, [accountIban])

  return (
    <Root>
      <Breadcrumbs />
      <Heading>Account {formatIban(accountIban!)}</Heading>
      <Layout>
        {account && (
          <>
            <Paper as="div">
              <Emoji>{CurrencyEmoji[account.currency]}</Emoji>
              <Iban>{formatIban(account.iban)}</Iban>
              <Balance>{formatCurrency(account.balance, account.currency)}</Balance>
            </Paper>
            <div />
          </>
        )}
        {ROUTE_CONSTANTS.filter((item) => !segments.includes(item.listKey)).map((item) => (
          <Paper key={item.listKey} to={item.listKey}>
            View {upperFirst(item.listKey)}
          </Paper>
        ))}
      </Layout>
    </Root>
  )
}

export default AccountView
