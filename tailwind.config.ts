import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {},
      backgroundColor: {
        hover: '#6fff6f',
        main: '#98FF98',
        sub: '#63AD63',
        default: '#ADADAD',
        subgray: '#F6F6F6'
      },
      textColor: {
        hover: '#6fff6f',
        main: '#98FF98',
        sub: '#63AD63',
        default: '#ADADAD',
        subgray: '#F6F6F6'
      },
      borderColor: {
        hover: '#6fff6f',
        main: '#98FF98',
        sub: '#63AD63',
        default: '#ADADAD',
        subgray: '#F6F6F6'
      }
    }
  },
  plugins: []
};
export default config;
