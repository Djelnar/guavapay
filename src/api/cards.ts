import accounts from './accounts'
import Faker from '@faker-js/faker'
import { Currencies } from './currencies'

const cards = [...Array(20).keys()].map((key) => ({
  cardID: key,
  account: Faker.helpers.arrayElement(Object.keys(accounts)),
  maskedCardNumber: `${Faker.finance.pin(4)} ${Faker.finance.pin(2)}** **** ${Faker.finance.pin(4)}`,
  expireDate: Faker.date.between(new Date('2024-01-01'), new Date('2030-01-01')),
  currency: Faker.helpers.arrayElement(Object.keys(Currencies)),
  status: Faker.datatype.boolean(),
  color: Faker.commerce.color(),
}))

export default cards
