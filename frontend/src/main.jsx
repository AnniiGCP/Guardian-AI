import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Apply persisted theme preference on initial load (if present)
try {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') document.documentElement.classList.add('dark')
  else if (saved === 'light') document.documentElement.classList.remove('dark')
} catch (err) {
  // ignore if localStorage is unavailable
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
