// Add code which is only supposed to be executed in dev env in this file
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@root/pages/Base/App'

const rootElement = document.getElementById('root')!

const root = createRoot(
  rootElement
)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

