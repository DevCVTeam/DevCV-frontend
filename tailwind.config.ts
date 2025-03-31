import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        ...defaultTheme.screens
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))'
      },
      backgroundImage: {},
      animation: {
        'spin-slower': 'spin 35s ease infinite',
        'spin-slow': 'spin 25s ease-in-out infinite reverse'
      },
      colors: {
        accent: {
          1: 'hsl(288 95.8% 90.6%)',
          2: 'hsl(168 83.8% 78.2%)'
        },
        bkg: 'hsl(210 40% 98%)',
        hover: '#6fff6f',
        main: '#98FF98',
        sub: '#63AD63',
        default: '#ADADAD',
        subgray: '#F6F6F6',
        textColor: '#292929',
        content: 'hsl(217 32.6% 17.5%)'
      },
      fontFamily: {
        Tenada: 'Tenada'
      }
    }
  },
  plugins: []
};
export default config;
