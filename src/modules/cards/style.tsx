import { Paper } from 'components/ui'

import styled from 'styled-components'

export const Card = styled(Paper)<{ cardColor: string }>`
  border-radius: 14px;
  width: 100%;
  aspect-ratio: 1.586;
  background-color: ${(p) => p.cardColor};
`

export const Emoji = styled.p`
  font-size: 24px;
`
export const MaskedCardNumber = styled.p`
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  font-weight: 700;
  color: white;
`
export const ExpireDate = styled.p`
  font-weight: 700;
  font-size: 28px;
  color: white;
`
