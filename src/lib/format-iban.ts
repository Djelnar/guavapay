import { chunk } from 'lodash/fp'

export const formatIban = (iban: string) =>
  chunk(4, iban)
    .map((gr) => gr.join(''))
    .join(' ')
