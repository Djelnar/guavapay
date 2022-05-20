import Faker from '@faker-js/faker'
import accounts from './accounts'
import cards from './cards'

const transactions = [...Array(300).keys()].map((key) => {
  const accountId = Faker.helpers.arrayElement(Object.keys(accounts)) as unknown as keyof typeof accounts

  return {
    transactionID: key,
    cardAccount: accountId,
    cardID: Faker.helpers.arrayElement(Object.keys(cards)),
    amount: Faker.datatype.number({ min: 10, max: 100000 }),
    currency: accounts[accountId].currency,
    transactionDate: Faker.date.recent(10),
    merchantInfo: Faker.company.companyName(),
    mcc: Faker.finance.pin(4),
  }
})

export default transactions
