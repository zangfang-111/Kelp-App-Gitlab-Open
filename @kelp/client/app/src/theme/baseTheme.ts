/** THIS FILE IS AUTO-GENERATED, DO NOT EDIT */
import type { ThemeType } from 'grommet'

export const baseTheme: ThemeType = {
  global: {
    colors: {
      brand: {
        dark: '#830BCC',
        light: '#4F067C',
      },
      background: {
        dark: '#333333',
        light: '#FFFFFF',
      },
      'background-sidebar': {
        dark: '#3E3E3F',
        light: '#EEEEEE',
      },
      'background-back': {
        dark: '#2F2F2F',
        light: '#EEEEEE',
      },
      'background-front': {
        dark: '#373737',
        light: '#FFFFFF',
      },
      'background-contrast': {
        dark: '#2C2C2C',
        light: '#11111111',
      },
      text: {
        dark: '#EEEEEE',
        light: '#333333',
      },
      'text-strong': {
        dark: '#FFFFFF',
        light: '#000000',
      },
      'text-weak': {
        dark: '#CCCCCC',
        light: '#444444',
      },
      'text-xweak': {
        dark: '#999999',
        light: '#666666',
      },
      border: {
        dark: '#444444',
        light: '#CCCCCC',
      },
      control: {
        light: 'brand',
        dark: 'brand',
      },
      'active-background': 'background-contrast',
      'active-text': 'text-strong',
      'selected-background': 'brand',
      'selected-text': 'text-strong',
      'status-critical': '#FF4040',
      'status-warning': '#FFAA15',
      'status-ok': '#00C781',
      'status-unknown': '#CCCCCC',
      'status-disabled': '#CCCCCC',
      'graph-0': 'brand',
      'graph-1': 'status-warning',
    },
    font: {
      family: 'Work Sans',
      size: '15px',
      height: '20px',
      maxWidth: '300px',
    },
    active: {
      color: 'active-text',
    },
    hover: {
      background: '#828282',
      color: 'active-text',
    },
    selected: {
      background: 'selected-background',
      color: 'selected-text',
    },
    control: {
      border: {
        radius: '10px',
      },
    },
    drop: {
      border: {
        radius: '10px',
      },
    },
    borderSize: {
      xsmall: '1px',
      small: '2px',
      medium: '3px',
      large: '10px',
      xlarge: '20px',
    },
    breakpoints: {
      small: {
        value: 640,
        borderSize: {
          xsmall: '1px',
          small: '2px',
          medium: '3px',
          large: '5px',
          xlarge: '10px',
        },
        edgeSize: {
          none: '0px',
          hair: '1px',
          xxsmall: '2px',
          xsmall: '3px',
          small: '5px',
          medium: '10px',
          large: '20px',
          xlarge: '40px',
        },
        size: {
          xxsmall: '20px',
          xsmall: '40px',
          small: '80px',
          medium: '160px',
          large: '320px',
          xlarge: '640px',
          full: '100%',
        },
      },
      medium: {
        value: 1280,
      },
      large: {},
    },
    edgeSize: {
      none: '0px',
      hair: '1px',
      xxsmall: '3px',
      xsmall: '5px',
      small: '10px',
      medium: '20px',
      large: '40px',
      xlarge: '80px',
      responsiveBreakpoint: 'small',
    },
    input: {
      padding: '10px',
      weight: 600,
    },
    spacing: '20px',
    size: {
      xxsmall: '40px',
      xsmall: '80px',
      small: '160px',
      medium: '320px',
      large: '640px',
      xlarge: '960px',
      xxlarge: '1280px',
      full: '100%',
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  button: {
    border: {
      width: '2px',
      radius: '15px',
    },
    padding: {
      vertical: '3px',
      horizontal: '18px',
    },
  },
  checkBox: {
    border: {
      color: 'rgb(128, 5, 203)',
    },
    color: 'rgb(207, 74, 255)',
    check: {
      radius: '10px',
    },
    toggle: {
      radius: '20px',
      size: '40px',
    },
    size: '20px',
  },
  radioButton: {
    size: '20px',
  },
  formField: {
    border: {
      color: 'border',
      side: 'bottom',
    },
    content: {
      pad: 'small',
    },
    disabled: {
      background: {
        color: 'status-disabled',
        opacity: 'medium',
      },
    },
    error: {
      color: 'status-critical',
      margin: {
        vertical: 'xsmall',
        horizontal: 'small',
      },
    },
    help: {
      color: 'dark-3',
      margin: {
        start: 'small',
      },
    },
    info: {
      color: 'text-xweak',
      margin: {
        vertical: 'xsmall',
        horizontal: 'small',
      },
    },
    label: {
      margin: {
        vertical: 'xsmall',
        horizontal: 'small',
      },
    },
    margin: {
      bottom: 'small',
    },
    round: '10px',
  },
  calendar: {
    small: {
      fontSize: '12.666666666666666px',
      lineHeight: 1.375,
      daySize: '22.86px',
    },
    medium: {
      fontSize: '15px',
      lineHeight: 1.45,
      daySize: '45.71px',
    },
    large: {
      fontSize: '22px',
      lineHeight: 1.11,
      daySize: '91.43px',
    },
  },
  clock: {
    analog: {
      hour: {
        width: '7px',
        size: '20px',
      },
      minute: {
        width: '3px',
        size: '10px',
      },
      second: {
        width: '3px',
        size: '8px',
      },
      size: {
        small: '60px',
        medium: '80px',
        large: '120px',
        xlarge: '180px',
        huge: '240px',
      },
    },
    digital: {
      text: {
        xsmall: {
          size: '10.333333333333332px',
          height: 1.5,
        },
        small: {
          size: '12.666666666666666px',
          height: 1.43,
        },
        medium: {
          size: '15px',
          height: 1.375,
        },
        large: {
          size: '17.333333333333332px',
          height: 1.167,
        },
        xlarge: {
          size: '19.666666666666668px',
          height: 1.1875,
        },
        xxlarge: {
          size: '24.333333333333336px',
          height: 1.125,
        },
      },
    },
  },
  heading: {
    level: {
      '1': {
        small: {
          size: '24px',
          height: '29px',
          maxWidth: '487px',
        },
        medium: {
          size: '34px',
          height: '39px',
          maxWidth: '673px',
        },
        large: {
          size: '52px',
          height: '57px',
          maxWidth: '1047px',
        },
        xlarge: {
          size: '71px',
          height: '76px',
          maxWidth: '1420px',
        },
      },
      '2': {
        small: {
          size: '22px',
          height: '27px',
          maxWidth: '440px',
        },
        medium: {
          size: '29px',
          height: '34px',
          maxWidth: '580px',
        },
        large: {
          size: '36px',
          height: '41px',
          maxWidth: '720px',
        },
        xlarge: {
          size: '43px',
          height: '48px',
          maxWidth: '860px',
        },
      },
      '3': {
        small: {
          size: '20px',
          height: '25px',
          maxWidth: '393px',
        },
        medium: {
          size: '24px',
          height: '29px',
          maxWidth: '487px',
        },
        large: {
          size: '29px',
          height: '34px',
          maxWidth: '580px',
        },
        xlarge: {
          size: '34px',
          height: '39px',
          maxWidth: '673px',
        },
      },
      '4': {
        small: {
          size: '17px',
          height: '22px',
          maxWidth: '347px',
        },
        medium: {
          size: '20px',
          height: '25px',
          maxWidth: '393px',
        },
        large: {
          size: '22px',
          height: '27px',
          maxWidth: '440px',
        },
        xlarge: {
          size: '24px',
          height: '29px',
          maxWidth: '487px',
        },
      },
      '5': {
        small: {
          size: '14px',
          height: '19px',
          maxWidth: '277px',
        },
        medium: {
          size: '14px',
          height: '19px',
          maxWidth: '277px',
        },
        large: {
          size: '14px',
          height: '19px',
          maxWidth: '277px',
        },
        xlarge: {
          size: '14px',
          height: '19px',
          maxWidth: '277px',
        },
      },
      '6': {
        small: {
          size: '13px',
          height: '18px',
          maxWidth: '253px',
        },
        medium: {
          size: '13px',
          height: '18px',
          maxWidth: '253px',
        },
        large: {
          size: '13px',
          height: '18px',
          maxWidth: '253px',
        },
        xlarge: {
          size: '13px',
          height: '18px',
          maxWidth: '253px',
        },
      },
    },
  },
  paragraph: {
    small: {
      size: '14px',
      height: '19px',
      maxWidth: '277px',
    },
    medium: {
      size: '15px',
      height: '20px',
      maxWidth: '300px',
    },
    large: {
      size: '17px',
      height: '22px',
      maxWidth: '347px',
    },
    xlarge: {
      size: '20px',
      height: '25px',
      maxWidth: '393px',
    },
    xxlarge: {
      size: '24px',
      height: '29px',
      maxWidth: '487px',
    },
  },
  // text: {
  //   xsmall: {
  //     size: '13px',
  //     height: '18px',
  //     maxWidth: '253px',
  //   },
  //   small: {
  //     size: '14px',
  //     height: '19px',
  //     maxWidth: '277px',
  //   },
  //   medium: {
  //     size: '15px',
  //     height: '20px',
  //     maxWidth: '300px',
  //   },
  //   large: {
  //     size: '17px',
  //     height: '22px',
  //     maxWidth: '347px',
  //   },
  //   xlarge: {
  //     size: '20px',
  //     height: '25px',
  //     maxWidth: '393px',
  //   },
  //   xxlarge: {
  //     size: '24px',
  //     height: '29px',
  //     maxWidth: '487px',
  //   },
  // },
  layer: {
    background: {
      dark: '#111111',
      light: '#FFFFFF',
    },
  },
}
