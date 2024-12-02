import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { firbaseContext } from './store/firebaseContext.jsx'
import Context from './store/firebaseContext.jsx'
import firebase from './firebase/firebaseConfig.js'

createRoot(document.getElementById('root')).render(
  <firbaseContext.Provider value={{ firebase }}>
    <Context>
      <StrictMode>
        <App />
      </StrictMode>,
    </Context>
  </firbaseContext.Provider >
)
