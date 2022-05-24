import { Currencies } from 'api/currencies'
import { useSearchParams } from 'react-router-dom'

export const useCurrency = () => {
  const [params] = useSearchParams({ currency: '' })

  const currency = params.get('currency')

  if (!currency || Currencies[currency as keyof typeof Currencies]) {
    return currency ?? ''
  }
  return ''
}
