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
};

export const lightTheme = {
  colors: {
    ...greys,
    ...colors,
    primary: '#294A2E',
    tiertiary: greys.grey40,
    lightPrimary: '#f5f9f6',

    text: colors.black,
    placeholder: colors.grey80,
    textSecondary: greys.grey70,
    background: colors.white,
    borderColor: greys.grey60,
    lightBackground: greys.grey20,
    loadingPlaceholder: greys.grey40,
  },
};

// feature for later -> dark theme

// export const darkTheme = {
//   colors: {
//     ...colors,
//     primary: '#294A2E',
//     tiertiary: greys.grey40,

//     lightPrimary: '#f5f9f6',

//     text: colors.white,
//     textSecondary: greys.grey50,
//     background: greys.grey80,
//     borderColor: greys.grey70,
//     lightBackground: greys.grey70,
//     loadingPlaceholder: greys.grey40,
//   },
// };
