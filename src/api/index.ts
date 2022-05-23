import accounts from './accounts'
import transactions from './transactions'

const sleep = () =>
  new Promise<void>((res) =>
    setTimeout(() => {
      res()
    }, 300),
  )

export type WithPageRequest<T = {}> = {
  page: number
} & T

export type WithPageResponse<T = {}> = {
  page: number
  items: T[]
}

export const serializeIban = (iban: string) => iban.replace(/\s+/g, '')

export const getAccounts = async ({
  page,
}: WithPageRequest<{
  cardId?: string
  transactionId?: string
}>): Promise<WithPageResponse<typeof accounts[0]>> => {
  const first = page * 10
  const last = first + 10

  await sleep()
  return {
    page,
    items: Object.values(accounts).slice(first, last),
  }
}

export const getAccount = async ({ iban }: { iban: string }) => {
  await sleep()
  const account = Object.values(accounts).find((acc) => serializeIban(acc.iban) === serializeIban(iban))

  return account
}

export const serializeDate = (date: string, transactionId: string) => {
  const dateObject = new Date(date)

  return `${dateObject.getFullYear()}-${dateObject.getMonth()}-${dateObject.getDate()}-${transactionId}`
}

export const getTransactions = async ({
  page,
}: WithPageRequest<{
  cardId?: string
  accountId?: string
}>): Promise<WithPageResponse<typeof transactions[number]>> => {
  const first = page * 10
  const last = first + 10

  await sleep()
  return {
    page,
    items: Object.values(transactions).slice(first, last),
  }
}

export const getTransaction = async ({ id }: { id: string }) => {
  await sleep()
  const transaction = transactions.find((tr) => tr.transactionID === id)

  return transaction
}