import { Currencies } from 'api/currencies'

export const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  }).format(value / 100)

export const CurrencyEmoji: Record<Currencies, string> = {
  AZN: '🇦🇿',
  EUR: '🇪🇺',
  USD: '🇺🇸',
}
