import { reject } from 'lodash/fp'
import React, { Fragment } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTE_CONSTANTS } from 'route-constants'

const mapRoutesRec = (routes: typeof ROUTE_CONSTANTS, base = '') => {
  if (routes.length === 0) return null

  return routes.map(({ listKey, pathParam, ListComponent, ViewComponent }) => (
    <Fragment key={listKey}>
      <Route path={`${base}/${listKey}`} element={<ListComponent />} />
      <Route
        path={`${base}/${listKey}/:${pathParam}`}
        element={
          <>
            <ListComponent />
            <ViewComponent />
          </>
        }
      />
      {mapRoutesRec(
        reject((item) => item.listKey === listKey, routes),
        `${base}/${listKey}/:${pathParam}`,
      )}
    </Fragment>
  ))
}

function App() {
  const res = mapRoutesRec(ROUTE_CONSTANTS)

  return (
    <Routes>
      {res}
      {/* <Route path="*" element={<Navigate to={ROUTE_CONSTANTS[0].listKey} />} /> */}
    </Routes>
  )
}

export default App
