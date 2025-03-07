// .storybook/preview.js

import { CssBaseline, ThemeProvider } from '@mui/material'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'

/* snipped for brevity */

// export const decorators = [
//   withThemeFromJSXProvider({
//     Provider: ThemeProvider,
//     GlobalStyles: CssBaseline
//   })
// ]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true, // Adds the description and default columns
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
