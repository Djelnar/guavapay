import Accounts from 'modules/accounts'
import AccountView from 'modules/accounts/view'
import Cards from 'modules/cards'
import CardView from 'modules/cards/view'
import Transactions from 'modules/transactions'
import TransactionView from 'modules/transactions/view'

export const ROUTE_CONSTANTS = [
  {
    listKey: 'transactions',
    pathParam: 'transactionId',
    ListComponent: Transactions,
    ViewComponent: TransactionView,
  },
  {
    listKey: 'accounts',
    pathParam: 'accountId',
    ListComponent: Accounts,
    ViewComponent: AccountView,
  },
  {
    listKey: 'cards',
    pathParam: 'cardId',
    ListComponent: Cards,
    ViewComponent: CardView,
  },
]

export type RouteParams = Partial<Record<'transactionId' | 'accountId' | 'cardId', string>>
