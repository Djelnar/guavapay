import App from 'App'
import React from 'react'
import ReactDOMClient from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOMClient.createRoot(rootElement)
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
}
