import { type ThemeOptions } from "@mui/material";

declare module "@mui/material/styles/createPalette" {
  type InputPallete = {
    background: string;
    hoverBackground: string;
    disabledBackground: string;
    disabledBorder: string;
  };
  interface Palette {
    input: InputPallete;
  }
  interface PaletteOptions {
    input?: InputPallete;
  }
}

const COMPONENTS_OVERRIDES: ThemeOptions["components"] = {
  MuiButton: {
    defaultProps: {
      size: "small",
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 20,
      },
    },
  },
  MuiIconButton: {
    defaultProps: {
      size: "small",
    },
  },
  MuiListItem: {
    defaultProps: {
      dense: true,
    },
  },
  MuiFab: {
    defaultProps: {
      size: "small",
    },
  },
  MuiTable: {
    defaultProps: {
      size: "small",
    },
  },
  MuiCssBaseline: {
    defaultProps: {
      enableColorScheme: true,
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
    },
  },
  MuiCheckbox: {
    defaultProps: {
      size: "small",
    },
  },
  MuiRadio: {
    defaultProps: {
      size: "small",
    },
  },
};

export const LIGHT_THEME: ThemeOptions = {
  typography: {
    fontFamily:
      '"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    allVariants: {
      scrollMarginTop: "calc(6.4rem + 3.2rem)",
    },
    button: {
      textTransform: "initial",
    },
  },
  components: COMPONENTS_OVERRIDES,
};

export const DARK_THEME: ThemeOptions = {
  typography: {
    fontFamily:
      '"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    allVariants: {
      scrollMarginTop: "calc(6.4rem + 3.2rem)",
    },
    button: {
      textTransform: "initial",
    },
  },
  components: COMPONENTS_OVERRIDES,
};
