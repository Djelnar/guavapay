import { upperFirst } from 'lodash/fp'
import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom'

import styled from 'styled-components'
import QueryLink from './query-link'

const Root = styled.div`
  display: flex;
  gap: 4px;
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
      <Item to={'/'} as={QueryLink}>
        Home
      </Item>
      {segments.map((seg, idx) => {
        const last = idx === segments.length - 1
        return (
          <Fragment key={seg}>
            <Item>{'>'}</Item>
            <Item to={`/${segments.slice(0, idx + 1).join('/')}`} as={last ? 'span' : QueryLink}>
              {upperFirst(seg)}
            </Item>
          </Fragment>
        )
      })}
    </Root>
  )
}

export default Breadcrumbs
