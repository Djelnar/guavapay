import Faker from '@faker-js/faker'
import { Currencies } from './currencies'

const accounts = {
  0: {
    id: 0,
    iban: Faker.finance.iban(true, 'GB'),
    currency: Currencies.EUR,
    balance: Faker.datatype.number({
      min: 10000,
      max: 1000000,
    }),
  },
  1: {
    id: 1,
    iban: Faker.finance.iban(true, 'GB'),
    currency: Currencies.USD,
    balance: Faker.datatype.number({
      min: 10000,
      max: 1000000,
    }),
  },
  2: {
    id: 2,
    iban: Faker.finance.iban(true, 'GB'),
    currency: Currencies.AZN,
    balance: Faker.datatype.number({
      min: 10000,
      max: 1000000,
    }),
  },
}

export default accounts
