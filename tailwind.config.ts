import type { Config } from 'tailwindcss'
import twColors from 'tailwindcss/colors';
import { spacing } from 'tailwindcss/defaultTheme';
const THEME_COLOR_LIGHT ="#fff"
const THEME_COLOR_DARK = "#0c121e"

const reduceObjArray = <T>(objs: Array<T>) =>
  objs.reduce((r, c) => Object.assign(r, c), {});

const extendedSpacing = {
  ...spacing,
  px: '0.0625rem',
  '0.75': '0.1875rem',
  '5.5': '1.375rem',
  18: '4.5rem',
  21: '5.25rem',
  22: '5.5rem',
  30: '7.5rem',
};

const colors = [
  'background',
  'divider',
  'hover',
  'toolbar',
  'toolbar-highlight',
  'primary-txt',
  'secondary-txt',
  'tertiary-txt',
  'accent',
  'accent-dark',
  'on-accent',
  'progress'
]

const fontSize = {
  
  '2xs': '0.875rem', // small
  '3xs': '0.8125rem', // (?)
};

const mappedColors = colors.map((color) => ({
  [color]: `var(--color-${color})`
}))

const breakpoints = {
  'mobile-md': '375px',
  'mobile-lg': '425px',
  'tablet-sm': '596px',
  'tablet-md': '768px', 
  desktop: '960px',
  'desktop-lg': '1359px'
};

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    
    screens: breakpoints,
    spacing: extendedSpacing,
    borderRadius: {
      ...extendedSpacing,
      half: '50%',
      full: "9999px",
    },
    borderWidth: { ...extendedSpacing, DEFAULT: '0.0625rem' },
    colors: {
      transparent: 'rgba(0,0,0,0)',
      current: 'currentColor',
      inherit: 'inherit',
      black: twColors.black,
      white: twColors.white,
      blue: twColors.sky,
      green: twColors.emerald,
      yellow: twColors.yellow,
      orange: twColors.orange,
      red: twColors.rose,
      purple: twColors.violet,
      tint: {
        bg: 'rgba(var(--tint)/var(--opacity-tint-bg))',
        border: 'rgba(var(--tint)/var(--opacity-tint-border))',
      },
    },
    extend: {
      fontSize,
      colors: {
        primary: "#1967D2",
        secondary: "#131313",
        tertiary: "#5f6368",
        accent: "#f3f3f3",
       
        brand: {
          DEFAULT: '#0A85F7',
          '50': '#eff9ff',
          '100': '#daf0ff',
          '200': '#bee5ff',
          '300': '#91d7ff',
          '400': '#5ebefc',
          '500': '#38a0f9',
          '600': '#2283ee',
          '700': '#1967d2',
          '800': '#1c57b1',
          '900': '#1c4b8c',
          '950': '#162e55',
        },
        light: THEME_COLOR_LIGHT,
        dark: THEME_COLOR_DARK,
        ...reduceObjArray(mappedColors),
      },
      boxShadow: {
        commandButton: "0 0 0 3px hsl(0 0% 30%)"
      },
      fontFamily: {
        web3: ["Syncopate", "sans-serif"]
      },
      
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}
export default config
