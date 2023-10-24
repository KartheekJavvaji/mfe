import { useEffect, useMemo, useReducer, createContext, useContext, type Dispatch, type ReactElement, type ReactNode, useCallback } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme, type Direction, type PaletteOptions } from '@mui/material/styles'
import { type SpacingOptions } from '@mui/system/createTheme/createSpacing'
import { useTheme, type PaletteMode } from '@mui/material'
import _isNil from 'lodash/isNil'
import { deepmerge } from '@mui/utils'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  getThemedComponents,
  getMetaThemeColor
} from './theme'
import { LIGHT_THEME, DARK_THEME } from './appTheme'

interface ThemeOptions {
  dense?: Record<string, any>
  direction: Direction
  paletteColors: PaletteOptions
  spacing: SpacingOptions
  paletteMode: PaletteMode
}

const themeInitialOptions: ThemeOptions = {
  dense: {},
  direction: 'ltr',
  paletteColors: {},
  spacing: 8, // spacing unit
  paletteMode: 'light'
}

export const DispatchContext = createContext<Dispatch<any>>(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`')
})

interface ThemeProviderProps {
  children: ReactNode
  initialPaletteMode?: PaletteMode
  usePrefersColorScheme?: boolean
}
function ThemeProvider (props: ThemeProviderProps): ReactElement {
  const { children, initialPaletteMode = 'light', usePrefersColorScheme = true } = props
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const preferredMode = prefersDarkMode ? 'dark' : 'light'

  const [themeOptions, dispatch] = useReducer(
    (state: ThemeOptions, action: { type: string, payload: Partial<ThemeOptions> }): ThemeOptions => {
      switch (action.type) {
      case 'SET_DENSE':
        return {
          ...state,
          dense: action.payload
        }
      case 'RESET_DENSITY':
        return {
          ...state,
          dense: themeInitialOptions.dense,
          spacing: themeInitialOptions.spacing
        }
      case 'CHANGE':
        return {
          ...state,
          ...action.payload
        }
      default:
        throw new Error(`Unrecognized type ${action.type}`)
      }
    },
    { ...themeInitialOptions, paletteMode: initialPaletteMode }
  )

  useEffect(() => {
    dispatch({
      type: 'CHANGE',
      payload: {
        paletteMode: initialPaletteMode
      }
    })
  }, [initialPaletteMode])

  const { direction, paletteColors, paletteMode, spacing } = themeOptions

  useEffect(() => {
    if (!_isNil(preferredMode) && usePrefersColorScheme) {
      dispatch({
        type: 'CHANGE',
        payload: { paletteMode: preferredMode as PaletteMode }
      })
    }
  }, [preferredMode, usePrefersColorScheme])

  useEffect(() => {
    document.body.dir = direction
  }, [direction])

  useEffect(() => {
    const metas = document.querySelectorAll('meta[name="theme-color"]')
    metas.forEach((meta) => {
      meta.setAttribute('content', getMetaThemeColor(paletteMode))
    })
  }, [paletteMode])

  const theme = useMemo(() => {
    // const fiddlerDesignTokens = getFiddlerDesignTokens(paletteMode)
    const fiddlerDesignTokens = (paletteMode === 'light') ? LIGHT_THEME : DARK_THEME
    const nextPalette = deepmerge(fiddlerDesignTokens.palette, paletteColors)
    let nextTheme = createTheme(
      {
        direction,
        ...fiddlerDesignTokens,
        palette: {
          ...nextPalette,
          mode: paletteMode
        },
        spacing
      },
      {
        components: {
          MuiCssBaseline: {
            defaultProps: {
              enableColorScheme: true
            }
          }
        }
      }
    )

    nextTheme = deepmerge(nextTheme, getThemedComponents())

    return nextTheme
  }, [direction, paletteColors, paletteMode, spacing])

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </MuiThemeProvider>
  )
}

export const useSparkleTheme = useTheme

export function useChangeTheme (): (options: any) => void {
  const dispatch = useContext(DispatchContext)
  return useCallback((options: any) => {
    dispatch({ type: 'CHANGE', payload: options })
  }, [dispatch])
}

export default ThemeProvider
