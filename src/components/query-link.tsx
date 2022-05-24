import React from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'

const QueryLink = ({ to, children, ...props }: LinkProps) => {
  const { search } = useLocation()

  return (
    <Link to={to + search} {...props}>
      {children}
    </Link>
  )
}

export default QueryLink
