import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'//PERMITE INTEGRARLO CON HTML
import './index.css'//HOJA DE ESTILO
import App from './App.jsx'//COMPONENTE PRINCIAL

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />{/*componente principal*/}
  </StrictMode>,
)
