import type { Config } from 'tailwindcss'
import twColors from 'tailwindcss/colors';
import { spacing } from 'tailwindcss/defaultTheme';
const THEME_COLOR_LIGHT ="#fff"
const THEME_COLOR_DARK = "#0c121e"

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

const fontSize = {
  '2xs': '0.875rem', // small
  '3xs': '0.8125rem', // (?)
};

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
        "primary": "#0A85F7",
        "secondary": "#daf0ff",
        "accent": "#69CFEF",
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
    themes: [{
      light: {
        "primary": "#0A85F7",
        "primary-content": "#ffffff",
        "secondary": "#daf0ff",
        "accent": "#69CFEF",
        "base-100": "#fff",
        "base-200": "#f4f4f4",
        "base-300": "#e9e9e9",
        "base-content": "#424242",
        "neutral": "#4c4c4c",
        "neutral-content": "#e1e1e1",
        "success": "rgba(16, 185, 129)",
        "success-content": "#ffffff",
        "error": "rgba(244, 63, 94)",
        "error-content": "#ffffff",
        "warning": "rgba(234, 179, 8)",
        "warning-content": "#ffffff",
      },

      dark: {
        "primary": "#0A85F7",
        "primary-content": "#ffffff",
        "secondary": "#daf0ff",
        "accent": "#69CFEF",
        "base-100": "#0c121e",
        "base-200": "#373737",
        "base-300": "#333333",
        "base-content": "#b8b8b8",
        "neutral": "#4a4a4a",
        "neutral-content": "#b8b8b8",
        "success": "rgba(16, 185, 129)",
        "success-content": "#ffffff",
        "error": "rgba(244, 63, 94)",
        "error-content": "#ffffff",
        "warning": "rgba(234, 179, 8, 0.3)",
        "warning-content": "#ffffff",
      },
    }]
  },
}
export default config
