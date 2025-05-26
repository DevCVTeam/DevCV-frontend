import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      xs: '280px', // Galaxy Fold
      sm: '360px', // 일반 모바일
      fold: '400px', // Z Flip 접힌 상태
      md: '540px', // Z Flip 펼친 상태
      lg: '768px', // 태블릿
      xl: '1024px', // 작은 데스크탑
      '2xl': '1280px', // 큰 데스크탑
      '3xl': '1536px' // 초큰 데스크탑
    },
    extend: {
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))'
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)'
      },
      padding: {
        'screen-x': 'var(--screen-x, 1rem)',
        'screen-y': 'var(--screen-y, 1rem)'
      },
      animation: {
        'spin-slower': 'spin 35s ease infinite',
        'spin-slow': 'spin 25s ease-in-out infinite reverse',
        float: 'float 3s ease-in-out infinite',
        'float-delay': 'float 3s ease-in-out infinite 1s',
        gradient: 'gradient 3s ease infinite',
        'progress-bar': 'progress 2s linear forwards'
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
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
      },
      backgroundSize: {
        'size-200': '200%'
      },
      aspectRatio: {
        square: '1 / 1',
        video: '16 / 9'
      },
      ringOpacity: {
        '50': '0.5'
      },
      backgroundOpacity: {
        '10': '0.1'
      },
      backgroundImage: {
        'grid-pattern': 'url(/path/to/grid-pattern.png)'
      },
      height: {
        '35': '8.75rem'
      },
      scrollbar: {
        hide: 'none'
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    function ({ addComponents }: { addComponents: any }) {
      addComponents({
        '.container-responsive': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          '@screen xs': {
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem'
          },
          '@screen sm': {
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem'
          },
          '@screen fold': {
            paddingLeft: '2rem',
            paddingRight: '2rem'
          },
          '@screen md': {
            paddingLeft: '2.5rem',
            paddingRight: '2.5rem'
          },
          '@screen lg': {
            paddingLeft: '3rem',
            paddingRight: '3rem',
            maxWidth: '100%'
          },
          '@screen xl': {
            paddingLeft: '4rem',
            paddingRight: '4rem',
            maxWidth: '100%'
          },
          '@screen 2xl': {
            maxWidth: '100%'
          }
        }
      });
    }
  ]
};

export default config;
