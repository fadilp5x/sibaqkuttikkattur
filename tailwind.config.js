/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#150a10',
        plum: '#1f0f16',
        plum2: '#2a1420',
        cream: '#FFF8E8',
        paper: '#FFFDF8',
        ink: '#191919',
        flame: '#F15A24',
        ember: '#E52B2B',
        marigold: '#FFC928',
        honey: '#ffc93c',
        leaf: '#36AD50',
        gold: '#e9b949',
        rose: '#ff7a59',
      },
      fontFamily: {
        display: ['Anton', 'Archivo', 'sans-serif'],
        head: ['Archivo', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '100%': { transform: 'scale(1.55)', opacity: '0' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '70%': { transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'float-horizontal': {
          '0%, 100%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        'marquee-fast': 'marquee 14s linear infinite',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.2,0.6,0.4,1) infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
        'spin-continuous': 'spin-slow 6s linear infinite',
        'pulse-slow': 'pulse-ring 3s cubic-bezier(0.2,0.6,0.4,1) infinite',
        floaty: 'floaty 5s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.2,0.7,0.3,1) both',
        pop: 'pop 0.45s cubic-bezier(0.2,0.7,0.3,1.1) both',
        shimmer: 'shimmer 2.6s linear infinite',
        sway: 'sway 4s ease-in-out infinite',
        'float-horizontal': 'float-horizontal 6s ease-in-out infinite',
        shake: 'shake 0.3s cubic-bezier(0.36,0.07,0.19,0.97) both',
      },
    },
  },
  plugins: [],
};
