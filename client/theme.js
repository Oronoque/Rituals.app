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

const whites = {
  whiteOpaque: 'rgba(255, 255, 255, 1)', // Fully opaque white
  white90: 'rgba(255, 255, 255, 0.9)', // 90% opacity
  white80: 'rgba(255, 255, 255, 0.8)', // 80% opacity
  white70: 'rgba(255, 255, 255, 0.7)', // 70% opacity
  white60: 'rgba(255, 255, 255, 0.6)', // 60% opacity
  white50: 'rgba(255, 255, 255, 0.5)', // 50% opacity (semi-transparent)
  white40: 'rgba(255, 255, 255, 0.4)', // 40% opacity
  white30: 'rgba(255, 255, 255, 0.3)', // 30% opacity
  white20: 'rgba(255, 255, 255, 0.2)', // 20% opacity
  white10: 'rgba(255, 255, 255, 0.1)', // 10% opacity
  whiteTransparent: 'rgba(255, 255, 255, 0)', // Fully transparent
};

const colors = {
  red: '#BF212F',
  green: '#009b54',
  orange: '#F9A73E',
  black: '#0e1111',
  white: 'white',
  paper: '#E5E5E5',
  pencil: '#5D5F75',
  blue: '#4267B2',
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
    background: whites.white10,
    borderColor: greys.grey60,
    lightBackground: whites.white90,
    loadingPlaceholder: whites.white10,
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
