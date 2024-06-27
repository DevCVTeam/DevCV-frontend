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
        ...defaultTheme.screens,
        '3xl': '1760px',
        tablet: '640px'
        // => @media (min-width: 640px) { ... }
      },
      backgroundImage: {},
      // backgroundColor: {
      //   hover: '#6fff6f',
      //   main: '#98FF98',
      //   sub: '#63AD63',
      //   default: '#ADADAD',
      //   subgray: '#F6F6F6'
      // },
      // textColor: {
      //   hover: '#6fff6f',
      //   main: '#98FF98',
      //   sub: '#63AD63',
      //   default: '#ADADAD',
      //   subgray: '#F6F6F6'
      // },
      // borderColor: {
      //   hover: '#6fff6f',
      //   main: '#98FF98',
      //   sub: '#63AD63',
      //   default: '#ADADAD',
      //   subgray: '#F6F6F6'
      // },
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
        content: 'hsl(217 32.6% 17.5%)'
      }
    }
  },
  plugins: []
};
export default config;
