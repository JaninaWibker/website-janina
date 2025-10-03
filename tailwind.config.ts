import type { Config as TailwindConfig } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const colors = (color: string, count: number, extra: string[] = []): Record<string, string> => {
  const numbers = Array.from({ length: count }, (_, i) => `${i + 1}`)
  const entries = [...numbers, ...extra]
  return Object.fromEntries(entries.map((name) => [name, `var(--${color}-${name})`]))
}

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx}', './utils/**/*.{js,ts,jsx,tsx}'],
  safelist: [{ pattern: /bg-/ }],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pxplus)', ...defaultTheme.fontFamily.sans]
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
  plugins: [],
  darkMode: 'selector'
} satisfies TailwindConfig
