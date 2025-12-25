import type { Config as TailwindConfig } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

import { textShadowPlugin } from './utils/tailwind-text-shadow'

const colors = (color: string, count: number, extra: string[] = []): Record<string, string> => {
  const numbers = Array.from({ length: count }, (_, i) => `${i + 1}`)
  const entries = [...numbers, ...extra]
  return Object.fromEntries(entries.map((name) => [name, `rgb(var(--${color}-${name}))`]))
}

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx}', './utils/**/*.{js,ts,jsx,tsx}'],
  safelist: [{ pattern: /bg-/ }],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pxplus)', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        xs: '8px',
        sm: '12px', // TODO: does this work?
        base: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '80px',
        '5xl': '96px'
      },
      colors: {
        primary: colors('mauve', 12, ['surface']),
        secondary: colors('fuchsia', 12, ['surface']),
        negative: colors('tomato', 12),
        neutral: colors('amber', 12),
        positive: colors('grass', 12),

        base: 'var(--background)',

        trans: {
          pink: '#f7a8b8',
          blue: '#55cdfc',
          white: '#ffffff'
        }
      }
    }
  },
  plugins: [textShadowPlugin],
  darkMode: 'selector'
} satisfies TailwindConfig
