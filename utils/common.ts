import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge, fromTheme, validators } from 'tailwind-merge'

const themeColor = fromTheme('color')

const length = () =>
  ['', validators.isNumber, validators.isArbitraryVariableLength, validators.isArbitraryLength] as const
const color = () => [themeColor, validators.isArbitraryVariable, validators.isArbitraryValue] as const

type CustomUtilities =
  | 'my-text-shadow'
  | 'my-text-shadow-color'
  | 'my-text-shadow-blur'
  | 'my-text-shadow-x'
  | 'my-text-shadow-y'

const twMerge = extendTailwindMerge<CustomUtilities>({
  override: {
    classGroups: {
      // cannot use `text-shadow` name as this conflicts with tailwind (v4), which tailwind-merge supports
      // but we still want to override the classnames used by tailwind (v4), so we have to use a different name but still
      // reference the same classnames
      'my-text-shadow': [{ 'text-shadow': [''] }],
      'my-text-shadow-color': [{ 'text-shadow-color': color() }],
      'my-text-shadow-blur': [{ 'text-shadow-blur': length() }],
      'my-text-shadow-x': [{ 'text-shadow-x': length() }],
      'my-text-shadow-y': [{ 'text-shadow-y': length() }]
    }
  }
})

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
