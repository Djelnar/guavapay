import { CurrencyEmoji } from 'lib/format-currency'
import { useCurrency } from 'lib/use-currency'
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
  padding: 0 8px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
`
const Button = styled.button<{ active?: boolean }>`
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  font-size: ${(p) => (p.active ? '24px' : '16px')};

  transition: font-size 100ms linear;

  &:hover {
    font-size: 24px;
  }
`

const CurrencySelector = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleClick = (currency = '') => {
    navigate(pathname + (currency ? `?currency=${currency}` : ''), { replace: true })
  }
  const currency = useCurrency()

  return (
    <Root>
      <Inner>
        <Button active={!currency} onClick={() => handleClick()}>
          all
        </Button>
        {Object.entries(CurrencyEmoji).map(([key, emoji]) => (
          <Button active={currency === key} onClick={() => handleClick(key)} key={key}>
            {emoji}
          </Button>
        ))}
      </Inner>
    </Root>
  )
}

export default CurrencySelector
