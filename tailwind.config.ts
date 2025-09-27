import type { Config as TailwindConfig } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx}', './utils/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pxplus)', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [],
  darkMode: 'class'
} satisfies TailwindConfig
