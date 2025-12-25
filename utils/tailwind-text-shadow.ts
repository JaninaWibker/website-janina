/* eslint-disable @typescript-eslint/unbound-method */
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
import plugin from 'tailwindcss/plugin'
import { type PluginAPI } from 'tailwindcss/types/config'

type OptionsProps = {
  shadowColor?: string
  shadowOffsetX?: string
  shadowOffsetY?: string
  shadowBlur?: string
}

export const textShadowPlugin = plugin.withOptions(
  (options: OptionsProps = {}) =>
    ({ addBase, addComponents, matchUtilities, theme }: PluginAPI): void => {
      addBase({
        ':root': {
          '--tw-text-shadow-color': options.shadowColor ?? 'rgba(0, 0,0,0.45)',
          '--tw-text-shadow-x': options.shadowOffsetX ?? '2px',
          '--tw-text-shadow-y': options.shadowOffsetY ?? '2px',
          '--tw-text-shadow-blur': options.shadowBlur ?? '0'
        }
      })

      addComponents({
        '.text-shadow': {
          textShadow: `var(--tw-text-shadow-x) var(--tw-text-shadow-y) var(--tw-text-shadow-blur) var(--tw-text-shadow-color)`
        }
      })

      matchUtilities(
        {
          'text-shadow-x': (value: string) => ({ '--tw-text-shadow-x': value }),
          'text-shadow-y': (value: string) => ({ '--tw-text-shadow-y': value }),
          'text-shadow-blur': (value: string) => ({ '--tw-text-shadow-blur': value })
        },
        { values: theme('textShadowSteps'), type: 'length', supportsNegativeValues: true }
      )

      matchUtilities(
        { 'text-shadow-color': (value: string) => ({ '--tw-text-shadow-color': value }) },
        { values: flattenColorPalette(theme('colors')), type: ['color', 'percentage'] }
      )
    },
  () => ({
    theme: {
      textShadowSteps: {
        0: '0',
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
        5: '5px',
        6: '6px',
        7: '7px',
        8: '8px',
        9: '9px',
        10: '10px'
      }
    }
  })
)
