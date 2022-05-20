import accounts from 'api/accounts'
import cards from 'api/cards'
import transactions from 'api/transactions'
import App from 'App'
import React from 'react'
import ReactDOMClient from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOMClient.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
}

console.log('🚀 ~ file: index.tsx ~ line 21 ~ tr', cards)
