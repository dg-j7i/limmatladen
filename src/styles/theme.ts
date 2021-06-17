import { Themes } from '@geist-ui/react'

const customGeistTheme = Themes.createFromLight({
  type: 'Custom',
  palette: {
    // success: '#7928ca',
    // successDark: '#4c2889',
    // successLight: '#8a63d2',
    // successLighter: '#e3d7fc',
  },
})

export const geistThemes = [customGeistTheme]
