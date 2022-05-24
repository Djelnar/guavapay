import accounts, { Account } from './accounts'
import cards, { Card } from './cards'
import transactions, { Transaction } from './transactions'

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

const getCardByMaskedNumber = (maskedCardNumber: string) =>
  cards.find((card) => card.maskedCardNumber === maskedCardNumber)
const getTransactionByTransactionNumber = (transactionNumber: string) =>
  transactions.find((tr) => serializeDate(tr.transactionDate, tr.transactionID) === transactionNumber)
const getAccountByIban = (iban: string) => Object.values(accounts).find((acc) => acc.iban === iban)

export const getAccounts = async ({
  page,
  maskedCardNumber,
  transactionNumber,
}: WithPageRequest<{
  maskedCardNumber?: string
  transactionNumber?: string
}>): Promise<WithPageResponse<Account>> => {
  const first = page * 10
  const last = first + 10

  let items = Object.values(accounts)

  if (maskedCardNumber) {
    const cardAccount = getCardByMaskedNumber(maskedCardNumber)?.account
    items = items.filter((item) => String(item.id) === String(cardAccount))
  }
  if (transactionNumber) {
    const cardAccount = getTransactionByTransactionNumber(transactionNumber)!.cardAccount
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
}>): Promise<WithPageResponse<Transaction>> => {
  const first = page * 10
  const last = first + 10

  let items = Object.values(transactions)

  if (maskedCardNumber) {
    const cardId = getCardByMaskedNumber(maskedCardNumber)?.cardID
    items = items.filter((item) => item.cardID === String(cardId))
  }
  if (accountIban) {
    const accountId = getAccountByIban(accountIban)!.id
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
}>): Promise<WithPageResponse<Card>> => {
  const first = page * 10
  const last = first + 10

  let items = cards

  if (accountIban) {
    const accountId = getAccountByIban(accountIban)!.id
    items = items.filter((item) => item.account === String(accountId))
  }
  if (transactionNumber) {
    const transactionCardId = getTransactionByTransactionNumber(transactionNumber)!.cardID
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
