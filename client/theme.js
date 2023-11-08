const greys = {
  grey10: '#fbfbfb',
  grey20: '#f2f2f2',
  grey30: '#e9e9e9',
  grey40: '#e5e5e5',
  grey50: '#dcdcdc',
  grey60: '#d3d3d3',
  grey70: '#2B2B2B',
  grey80: '#181818',
};

const colors = {
  red: '#BF212F',
  green: '#009b54',
  orange: '#F9A73E',
  black: '#0e1111',
  white: 'white',
  paper: '#E5E5E5',
  pencil: '#5D5F75',
};

export const lightTheme = {
  colors: {
    ...greys,
    ...colors,
    primary: colors.pencil,
    tiertiary: greys.grey40,
    lightPrimary: '#f5f9f6',
    disabled: '#66aa71',
    info: '#0080FE',

    text: colors.pencil,
    placeholder: colors.grey80,
    textSecondary: greys.grey70,
    background: colors.paper,
    borderColor: greys.grey60,
    lightBackground: greys.grey20,
    loadingPlaceholder: greys.grey40,
  },
};

export const darkTheme = {
  colors: {
    ...colors,
    primary: '#6f2bf0',
    tiertiary: greys.grey40,
    info: '#0080FE',

    lightPrimary: '#f5f9f6',

    text: colors.white,
    textSecondary: greys.grey50,
    background: greys.grey80,
    borderColor: greys.grey70,
    lightBackground: greys.grey70,
    loadingPlaceholder: greys.grey40,
  },
};
