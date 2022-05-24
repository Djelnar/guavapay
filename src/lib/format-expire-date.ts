import { padStart } from 'lodash'

export const formatExpireDate = (dateString: string) => {
  const date = new Date(dateString)

  return `${padStart(String(date.getMonth() + 1), 2, '0')}/${date.getFullYear() % 1000}`
}
