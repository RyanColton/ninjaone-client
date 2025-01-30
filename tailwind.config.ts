import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        colors: {
          primary: {
            DEFAULT: '#1B75BC',
            hover: '#1B75BC/90',
          },
          neutral: {
            50: '#F4F4F5',
            100: '#E8E8EA',
            200: '#E7E8EB',
            300: '#D1D0D9',
            400: '#88859E',
            500: '#6E6D7A',
            600: '#595766',
            900: '#211F33',
          },
        }
      },
    },
    plugins: [],
} satisfies Config
  