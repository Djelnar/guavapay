import accounts from './accounts'
import cards from './cards'
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

export const getAccounts = async ({
  page,
  maskedCardNumber,
  transactionNumber,
}: WithPageRequest<{
  maskedCardNumber?: string
  transactionNumber?: string
}>): Promise<WithPageResponse<typeof accounts[0]>> => {
  const first = page * 10
  const last = first + 10

  let items = Object.values(accounts)

  if (maskedCardNumber) {
    const cardAccount = cards.find((card) => card.maskedCardNumber === maskedCardNumber)?.account
    items = items.filter((item) => String(item.id) === String(cardAccount))
  }
  if (transactionNumber) {
    const cardAccount = transactions.find(
      (tr) => serializeDate(tr.transactionDate, tr.transactionID) === transactionNumber,
    )!.cardAccount
    items = items.filter((item) => String(item.id) === cardAccount)
  }

  items = items.slice(first, last)

  await sleep()
  return {
    page,
    items,
  }
}

export const getAccount = async ({ iban }: { iban: string }) => {
  await sleep()
  const account = Object.values(accounts).find((acc) => acc.iban === iban)

  return account
}

export const serializeDate = (date: string, transactionId: string) => {
  const dateObject = new Date(date)

  return `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}-${transactionId}`
}

export const getTransactions = async ({
  page,
  accountIban,
  maskedCardNumber,
}: WithPageRequest<{
  maskedCardNumber?: string
  accountIban?: string
}>): Promise<WithPageResponse<typeof transactions[number]>> => {
  const first = page * 10
  const last = first + 10

  let items = Object.values(transactions)

  if (maskedCardNumber) {
    const cardId = cards.find((card) => card.maskedCardNumber === maskedCardNumber)?.cardID
    items = items.filter((item) => item.cardID === String(cardId))
  }
  if (accountIban) {
    const accountId = Object.values(accounts).find((acc) => acc.iban === accountIban)!.id
    items = items.filter((item) => item.cardAccount === String(accountId))
  }

  items = items.slice(first, last)

  await sleep()
  return {
    page,
    items,
  }
}

export const getTransaction = async ({ id }: { id: string }) => {
  await sleep()
  const transaction = transactions.find((tr) => tr.transactionID === id)

  return transaction
}

export const getCards = async ({
  page,
  accountIban,
  transactionNumber,
}: WithPageRequest<{
  transactionNumber?: string
  accountIban?: string
}>): Promise<WithPageResponse<typeof cards[number]>> => {
  const first = page * 10
  const last = first + 10

  let items = cards

  if (accountIban) {
    const accountId = Object.values(accounts).find((acc) => acc.iban === accountIban)!.id
    items = items.filter((item) => item.account === String(accountId))
  }
  if (transactionNumber) {
    const transactionCardId = transactions.find(
      (tr) => serializeDate(tr.transactionDate, tr.transactionID) === transactionNumber,
    )!.cardID

    items = items.filter((item) => String(item.cardID) === transactionCardId)
  }

  items = items.slice(first, last)

  await sleep()
  return {
    page,
    items,
  }
}

export const getCard = async ({ maskedCardNumber }: { maskedCardNumber: string }) => {
  await sleep()
  const card = Object.values(cards).find((card) => card.maskedCardNumber === maskedCardNumber)

  return card
}
