import { CurrencyEmoji } from 'lib/format-currency'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Root = styled.div`
  position: fixed;
  right: 16px;
  top: 16px;
  width: 200px;
  height: 40px;

  background-color: aliceblue;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 12px;
`
const Inner = styled.div`
  height: 40px;
  padding: 8px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
`
const Button = styled.button`
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
`

const CurrencySelector = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleClick = (currency = '') => {
    navigate(pathname + (currency ? `?currency=${currency}` : ''), { replace: true })
  }

  return (
    <Root>
      <Inner>
        <Button onClick={() => handleClick()}>All</Button>
        {Object.entries(CurrencyEmoji).map(([key, emoji]) => (
          <Button onClick={() => handleClick(key)} key={key}>
            {emoji}
          </Button>
        ))}
      </Inner>
    </Root>
  )
}

export default CurrencySelector
