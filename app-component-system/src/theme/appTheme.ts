import { type ThemeOptions } from '@mui/material'

declare module '@mui/material/styles/createPalette' {
  type InputPallete = {
    background: string,
    hoverBackground: string,
    disabledBackground: string,
    disabledBorder: string,
  }
  interface Palette {
    input: InputPallete;
  }
  interface PaletteOptions {
    input?: InputPallete;
  }
}

const COMPONENTS_OVERRIDES: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      size: 'small',
      disableElevation: true
    },
    styleOverrides: {
      root: {
        borderRadius: 20
      }
    }
  },
  MuiIconButton: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiListItem: {
    defaultProps: {
      dense: true
    }
  },
  MuiFab: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiTable: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiCssBaseline: {
    defaultProps: {
      enableColorScheme: true
    }
  },
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true
    }
  },
  MuiCheckbox: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiRadio: {
    defaultProps: {
      size: 'small'
    }
  }
}

export const LIGHT_THEME: ThemeOptions = {
  breakpoints: {
    keys: [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    values: {
      xs: 0,
      sm: 60,
      md: 90,
      lg: 120,
      xl: 153
    },
    unit: "rem"
  },
  palette: {
    input: {
      background: '#0000000f',
      hoverBackground: '#00000017',
      disabledBackground: '#00000006',
      disabledBorder: '#00000026'
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF"
    },
    text: {
      primary: "rgba(0,0,0, 0.87)",
      secondary: "rgba(0,0,0, 0.6)",
      disabled: "rgba(rgba(0,0,0, 0.87), 0.38)"
    },
    primary: {
      main: "#2970FF",
      contrastText: "#ffffff",
      dark: "#004EEB",
      light: "#84ADFF"
    },
    secondary: {
      main: "#607d8b",
      contrastText: "#ffffff",
      dark: "#455a64",
      light: "#90a4ae"
    },
    divider: "rgba(0,0,0,0.12)",
    action: {
      active: "rgba(0,0,0, 0.56)",
      hover: "rgba(0,0,0, 0.04)",
      hoverOpacity: 0.08,
      selected: "rgba(0,0,0, 0.08)",
      selectedOpacity: 0.16,
      disabled: "rgba(0,0,0, 0.38)",
      disabledBackground: "rgba(0,0,0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0,0,0, 0.12)",
      focusOpacity: 0.12,
      activeChannel: "0 0 0",
      selectedChannel: "0 0 0"
    },
    success: {
      main: "#3DC34A",
      contrastText: "#ffffff",
      dark: "#24a035",
      light: "#7ed784"
    },
    error: {
      main: "#e53935",
      contrastText: "#ffffff",
      dark: "#c62828",
      light: "#ef5350"
    },
    warning: {
      main: "#FFB800",
      contrastText: "#ffffff",
      dark: "#ff9300",
      light: "#ffcd29"
    },
    common: {
      black: "#000",
      white: "#fff"
    },
    info: {
      main: "#03a9f4",
      contrastText: "#ffffff",
      dark: "#0288d1",
      light: "#4fc3f7"
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161"
    },
    contrastThreshold: 4,
    tonalOffset: 0.2
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: '"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    allVariants: {
      scrollMarginTop: 'calc(6.4rem + 3.2rem)'
    },
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    button: {
      textTransform: 'initial'
    },
  },
  components: COMPONENTS_OVERRIDES,
}

export const DARK_THEME: ThemeOptions = {
  breakpoints: {
    keys: [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    values: {
      xs: 0,
      sm: 60,
      md: 90,
      lg: 120,
      xl: 153
    },
    unit: "rem"
  },
  palette: {
    input: {
      background: '#ffffff17',
      hoverBackground: '#ffffff1f',
      disabledBackground: '#ffffff09',
      disabledBorder: '#ffffff26'
    },
    background: {
      default: "#121212",
      paper: "#121212"
    },
    text: {
      primary: "rgba(255,255,255, 1)",
      secondary: "rgba(255,255,255, 0.7)",
      disabled: "rgba(rgba(255,255,255, 1), 0.38)"
    },
    primary: {
      main: "#B2CCFF",
      contrastText: "#ffffff",
      dark: "#528BFF",
      light: "#D1E0FF"
    },
    secondary: {
      main: "#b0bec5",
      contrastText: "#ffffff",
      dark: "#78909c",
      light: "#cfd8dc"
    },
    divider: "rgba(255,255,255,0.12)",
    action: {
      active: "rgba(255,255,255, 0.56)",
      hover: "rgba(255,255,255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255,255,255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255,255,255, 0.38)",
      disabledBackground: "rgba(255,255,255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255,255,255, 0.12)",
      focusOpacity: 0.12,
      activeChannel: "255 255 255",
      selectedChannel: "255 255 255"
    },
    success: {
      main: "#3DC34A",
      contrastText: "#ffffff",
      dark: "#24a035",
      light: "#7ed784"
    },
    error: {
      main: "#e53935",
      contrastText: "#ffffff",
      dark: "#c62828",
      light: "#ef5350"
    },
    warning: {
      main: "#fdd835",
      contrastText: "#ffffff",
      dark: "#f9a825",
      light: "#ffee58"
    },
    common: {
      black: "#000",
      white: "#fff"
    },
    info: {
      main: "#03a9f4",
      contrastText: "#ffffff",
      dark: "#0288d1",
      light: "#81d4fa"
    },
    grey: {
      50: "#7d7d7d",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161"
    },
    contrastThreshold: 4,
    tonalOffset: 0.2,
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: '"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    allVariants: {
      scrollMarginTop: 'calc(6.4rem + 3.2rem)'
    },
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    button: {
      textTransform: 'initial'
    }
  },
  components: COMPONENTS_OVERRIDES,
}
