import {
  BrowserRouter
} from 'react-router-dom'
import ComponentsThemeProvider from '@components/theme/ThemeProvider'
import DateRangeLocalizationProvider from '@components/molecules/DateRange/DateRangeLocalizationProvider';
import CssBaseline from '@components/atoms/CssBaseline';

import Routes from './Routes'

function App () {
  return (
    <BrowserRouter>
      <DateRangeLocalizationProvider>
        <ComponentsThemeProvider>
          <CssBaseline />
          <Routes />
        </ComponentsThemeProvider>
      </DateRangeLocalizationProvider>
    </BrowserRouter> 
  )
}

export default App
