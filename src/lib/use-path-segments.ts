import { useLocation } from 'react-router-dom'
import { ROUTE_CONSTANTS } from 'route-constants'

export const usePathSegments = () => {
  const { pathname } = useLocation()

  const routePathSegments = Object.fromEntries(ROUTE_CONSTANTS.map((item) => [item.listKey, true]))

  return pathname
    .split('/')
    .filter(Boolean)
    .filter((segment) => routePathSegments[segment])
}
