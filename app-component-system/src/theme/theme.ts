import { darken, lighten } from '@mui/system'
import type {} from '@mui/material/themeCssVarsAugmentation'
import { createTheme, type ThemeOptions } from '@mui/material/styles'
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded'
import { type PaletteMode } from '@mui/material'

const defaultTheme = createTheme()

const DARKEN_COEFFICIENT_FACTOR = 0.3
const LIGHTEN_COEFFICIENT_FACTOR = 0.2

// standard grey shades from material 2 docs
export const grey = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#EEEEEE',
  300: '#E0E0E0',
  400: '#BDBDBD',
  500: '#9E9E9E',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121'
}

export const getMetaThemeColor = (mode: 'light' | 'dark'): string => {
  const themeColor = {
    light: '#3385FF', // primary.main
    dark: '#3385FF' // primary.main
  }
  return themeColor[mode]
}

// TODO confirm the icon colors with design team
export const getFiddlerDesignTokens = (mode: PaletteMode): ThemeOptions => {
  return ({
    palette: {
      background: {
        screen: '#E8EBF1', // bg/screen
        default: '#F5F9FF', // bg/primary
        paper: '#FFFFFF', // bg/white
        paperActive: '#F5F9FF', // bg/primary TODO confirm with Design team on this
        contrastBg: '#F5F5F5', // bg/grey
        ...(mode === 'dark' && {
          screen: darken('#E8EBF1', DARKEN_COEFFICIENT_FACTOR), // bg/screen
          default: darken('#F5F9FF', DARKEN_COEFFICIENT_FACTOR), // bg/primary
          paper: darken('#FFFFFF', DARKEN_COEFFICIENT_FACTOR), // bg/white
          paperActive: darken('#F5F9FF', DARKEN_COEFFICIENT_FACTOR), // bg/primary TODO confirm with Design team on this
          contrastBg: darken('#F5F5F5', DARKEN_COEFFICIENT_FACTOR) // bg/grey
        })
      },
      // TODO have changed these text values as it not visible at all
      text: {
        primary: '#1A2027',
        secondary: '#3E5060', // used in tabs
        ...(mode === 'dark' && {
          primary: lighten('#1A2027', LIGHTEN_COEFFICIENT_FACTOR),
          secondary: lighten('#3E5060', LIGHTEN_COEFFICIENT_FACTOR)
        })
      },
      primary: {
        main: (mode === 'dark') ? '#2F7544' : '#3385FF',
        contrastText: defaultTheme.palette.getContrastText('#3385FF'),
        dark: darken('#3385FF', DARKEN_COEFFICIENT_FACTOR),
        light: lighten('#3385FF', LIGHTEN_COEFFICIENT_FACTOR)
      },
      secondary: {
        main: '#AFEFEC',
        contrastText: defaultTheme.palette.getContrastText('#AFEFEC'),
        dark: darken('#AFEFEC', DARKEN_COEFFICIENT_FACTOR),
        light: lighten('#AFEFEC', LIGHTEN_COEFFICIENT_FACTOR)
      },
      divider: mode === 'dark' ? lighten('#EBEBEE', LIGHTEN_COEFFICIENT_FACTOR) : '#EBEBEE',
      mode,
      // TODO verify action behaviors
      // The colors used to style the action elements.
      action: {
        // The color of an active action like an icon button.
        active: 'rgba(0, 0, 0, 0.54)',
        // The color of an hovered action.
        hover: 'rgba(0, 0, 0, 0.04)',
        hoverOpacity: 0.04,
        // The color of a selected action.
        selected: 'rgba(0, 0, 0, 0.08)',
        selectedOpacity: 0.08,
        // The color of a disabled action.
        disabled: 'rgba(0, 0, 0, 0.26)',
        // The background color of a disabled action.
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(0, 0, 0, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
        ...(mode === 'dark' && ({
          active: defaultTheme.palette.common.white,
          hover: 'rgba(255, 255, 255, 0.08)',
          hoverOpacity: 0.08,
          selected: 'rgba(255, 255, 255, 0.16)',
          selectedOpacity: 0.16,
          disabled: 'rgba(255, 255, 255, 0.3)',
          disabledBackground: 'rgba(255, 255, 255, 0.12)',
          disabledOpacity: 0.38,
          focus: 'rgba(255, 255, 255, 0.12)',
          focusOpacity: 0.12,
          activatedOpacity: 0.24
        }))
      },
    },
    shape: {
      borderRadius: 4
    },
    spacing: 10,
    typography: {
      htmlFontSize: 10,
    }
  })
}

export function getThemedComponents (): ThemeOptions {
  return {
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true
        },
        styleOverrides: {
          root: () => ({
            textTransform: 'none'
          })
        }
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true
        }
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: ArrowDropDownRounded
        },
        styleOverrides: {
          iconFilled: {
            top: 'calc(50% - .25em)'
          }
        }
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: () => ({
            backgroundColor: '#fff'
          })
        }
      },
      MuiCssBaseline: {
        defaultProps: {
          enableColorScheme: true
        }
      }
    }
  }
}
