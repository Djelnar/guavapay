import styled from 'styled-components'
import { reject } from 'lodash/fp'
import React, { Fragment } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTE_CONSTANTS } from 'route-constants'
import Home from 'modules/home'
import CurrencySelector from 'modules/currency-selector'

const mapRoutesRec = (routes: typeof ROUTE_CONSTANTS, base = '') => {
  if (routes.length === 0) return null

  return routes.map(({ listKey, pathParam, ListComponent, ViewComponent }) => (
    <Fragment key={listKey}>
      <Route path={`${base}/${listKey}`} element={<ListComponent />} />
      <Route path={`${base}/${listKey}/:${pathParam}`} element={<ViewComponent />} />
      {mapRoutesRec(
        reject((item) => item.listKey === listKey, routes),
        `${base}/${listKey}/:${pathParam}`,
      )}
    </Fragment>
  ))
}

const Root = styled.div`
  background-color: papayawhip;
  min-height: 100vh;
`
const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 24px;
`

function App() {
  return (
    <Root>
      <CurrencySelector />
      <Wrapper>
        <Routes>
          {mapRoutesRec(ROUTE_CONSTANTS)}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </Wrapper>
    </Root>
  )
}

export default App
