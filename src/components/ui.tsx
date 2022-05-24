import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Paper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background-color: aliceblue;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  transition: box-shadow 50ms linear;

  cursor: pointer;
  text-decoration: none;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`

export const LoadMore = styled.button`
  width: 200px;
  height: 40px;

  border-radius: 12px;
  background-color: aliceblue;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`

export const Heading = styled.h1`
  font-size: 32px;
  color: #111111;
  font-style: italic;

  align-self: flex-start;
`
export const SubHeading = styled.h2`
  font-size: 22px;
  color: #111111;
  font-style: italic;

  align-self: flex-start;
`
