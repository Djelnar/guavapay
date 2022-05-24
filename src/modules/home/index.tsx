import { Paper } from 'components/ui'
import { upperFirst } from 'lodash/fp'
import React from 'react'
import { ROUTE_CONSTANTS } from 'route-constants'
import styled from 'styled-components'

const Root = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr 1fr;
`
const Home = () => {
  return (
    <Root>
      {ROUTE_CONSTANTS.map((item) => (
        <Paper to={item.listKey}>{upperFirst(item.listKey)}</Paper>
      ))}
    </Root>
  )
}

export default Home
