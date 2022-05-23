import { reject } from 'lodash/fp'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTE_CONSTANTS } from 'route-constants'

const mapRoutesRec = (routes: typeof ROUTE_CONSTANTS) => {
  if (routes.length === 0) return null

  return routes.map(({ listKey, pathParam }) => (
    <Route path={listKey} key={listKey}>
      <Route path={`:${pathParam}`}>{mapRoutesRec(reject((item) => item.listKey === listKey, routes))}</Route>
    </Route>
  ))
}

function App() {
  return (
    <Routes>
      {mapRoutesRec(ROUTE_CONSTANTS)}
      <Route path="*" element={<Navigate to={ROUTE_CONSTANTS[0].listKey} />} />
    </Routes>
  )
}

export default App
