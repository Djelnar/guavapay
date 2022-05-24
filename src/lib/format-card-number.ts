import { chunk } from 'lodash/fp'

export const formatCardNumber = (iban: string) =>
  chunk(4, iban)
    .map((gr) => gr.join(''))
    .join(' ')
