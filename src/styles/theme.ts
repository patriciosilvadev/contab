import { theme, DefaultTheme } from '@chakra-ui/core'

const customTheme: DefaultTheme = {
  ...theme,
  fonts: {
    body: 'Quicksand, Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
    mono: 'Menlo, monospace'
  },
  fontWeights: {
    ...theme.fontWeights,
    thin: 100,
    normal: 400,
    medium: 600,
    bold: 700
  },
  radii: {
    ...theme.radii,
    sm: '5px',
    md: '8px'
  },
  colors: {
    ...theme.colors,
    green: {
      ...theme.colors.green,
      100: '#00c837',
      300: '#019c2b',
      600: '#004814'
    },
    gray: {
      ...theme.colors.gray,
      50: 'rgb(250, 250, 250)',
      100: '#f1f1f1',
      300: '#e1e1e1',
      400: '#939393',
      600: '#535353',
      700: '#202024',
      800: '#121214'
    }
  }
}

export default customTheme
