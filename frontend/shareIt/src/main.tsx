import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import AppProvider from './context'
import HeaderNav from './components/header/navBar'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      
    <HeaderNav />
      <App />
    </AppProvider>
  </React.StrictMode>,
)
