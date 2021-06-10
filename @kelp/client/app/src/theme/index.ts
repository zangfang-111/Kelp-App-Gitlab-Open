import type { ThemeType } from 'grommet'
import { deepMerge } from 'grommet/utils'
import { baseTheme } from './baseTheme'

// Write custom constants here
export const sidebarWidth = '230px'
export const sidebarPanelWidth = '700px'
export const sidebarItemHeight = '58px'
// Write theme overrides here
const overrides: ThemeType = {
  global: {
    control: {
      border: {
        radius: '0px',
        width: '0px',
      },
    },
    drop: {
      border: {
        radius: '0px',
      },
    },
    input: {
      weight: 'normal',
    },
  },
  anchor: {
    textDecoration: 'none',
  },
  button: {
    border: {
      radius: '0px',
    },
  },
  formField: {
    margin: {
      vertical: '0',
    },
    content: {
      pad: '0',
    },
    label: {
      weight: 'normal',
      size: 'small',
      margin: {
        horizontal: '0',
      },
    },
    round: false,
  },
  tab: {
    pad: { vertical: 'small', horizontal: 'medium' },
    color: 'text-strong',
    active: {
      background: 'brand',
    },
    border: {
      color: 'transparent',
      active: {
        color: 'brand',
      },
    },
  },
}

export default deepMerge(baseTheme, overrides)
