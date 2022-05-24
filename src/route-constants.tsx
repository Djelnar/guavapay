import Accounts from 'modules/accounts'
import AccountView from 'modules/accounts/view'
import Cards from 'modules/cards'
import CardView from 'modules/cards/view'
import Transactions from 'modules/transactions'
import TransactionView from 'modules/transactions/view'

export const ROUTE_CONSTANTS = [
  {
    listKey: 'transactions',
    pathParam: 'transactionNumber',
    ListComponent: Transactions,
    ViewComponent: TransactionView,
  },
  {
    listKey: 'accounts',
    pathParam: 'accountIban',
    ListComponent: Accounts,
    ViewComponent: AccountView,
  },
  {
    listKey: 'cards',
    pathParam: 'maskedCardNumber',
    ListComponent: Cards,
    ViewComponent: CardView,
  },
]

export type RouteParams = Partial<Record<'transactionNumber' | 'accountIban' | 'maskedCardNumber', string>>
