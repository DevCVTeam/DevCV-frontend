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
        xs: '480px'
        // '2xl': { max: '1535px' },
        // // => @media (max-width: 1535px) { ... }

        // xl: { max: '1279px' },
        // // => @media (max-width: 1279px) { ... }

        // lg: { max: '1023px' },
        // // => @media (max-width: 1023px) { ... }

        // md: { max: '767px' },
        // // => @media (max-width: 767px) { ... }

        // xs: { max: '480px' }
        // => @media (max-width: 639px) { ... }
      },
      gridTemplateColumns: {
        // grid-cols-14 추가
        '14': 'repeat(14, minmax(0, 1fr))'
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
