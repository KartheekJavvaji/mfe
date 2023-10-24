import {
  BrowserRouter
} from 'react-router-dom'
import ComponentsThemeProvider from '@components/theme/ThemeProvider'
import CssBaseline from '@components/atoms/CssBaseline';

import Routes from './Routes'

function App () {
  return (
    <BrowserRouter>
      <ComponentsThemeProvider>
        <CssBaseline />
        <Routes />
      </ComponentsThemeProvider>
    </BrowserRouter> 
  )
}

export default App
