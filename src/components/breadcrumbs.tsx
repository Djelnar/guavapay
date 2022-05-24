import { upperFirst } from 'lodash/fp'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  gap: 8px;
  align-self: flex-start;
`
const Item = styled.span`
  flex-shrink: 0;
  font-size: 12px;
  color: grey;
  text-decoration: none;

  &:link:hover {
    text-decoration: underline;
  }
`

const Breadcrumbs = () => {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <Root>
      {segments.map((seg, idx) => {
        const last = idx === segments.length - 1
        return (
          <>
            <Item to={`/${segments.slice(0, idx + 1).join('/')}`} as={last ? 'span' : Link}>
              {upperFirst(seg)}
            </Item>
            {!last && <Item>/</Item>}
          </>
        )
      })}
    </Root>
  )
}

export default Breadcrumbs
