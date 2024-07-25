import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './i18n/i18n.ts'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </React.StrictMode>
)
