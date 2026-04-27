import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Syshub } from './Syshub'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Syshub />
  </StrictMode>,
)
