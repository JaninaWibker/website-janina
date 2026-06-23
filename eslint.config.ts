import { defineConfig } from 'eslint/config'
import { type ConfigArray } from 'typescript-eslint'
import pluginNext from '@next/eslint-plugin-next'

import type { Linter } from 'eslint'
import globals from 'globals'
import pluginTailwind from 'eslint-plugin-better-tailwindcss'
import pluginReact, { configs as reactConfigs } from 'eslint-plugin-react'
import { configs as javascriptConfigs } from '@eslint/js'
import { configs as typescriptConfigs } from 'typescript-eslint'
import { configs as reactHooksConfigs } from 'eslint-plugin-react-hooks'
import { flatConfigs as importConfigs } from 'eslint-plugin-import-x'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

const base: Linter.Config[] = [
  javascriptConfigs.recommended,
  typescriptConfigs.recommended as Linter.Config,
  typescriptConfigs.recommendedTypeChecked as Linter.Config,
  typescriptConfigs.stylisticTypeChecked as Linter.Config,
  importConfigs.recommended,
  importConfigs.typescript,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser
    },
    rules: {
      '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    }
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off'
    }
  }
]

const ui = ({ ignores }: { ignores?: string[] }): Linter.Config[] => [
  reactConfigs.flat.recommended!,
  reactConfigs.flat['jsx-runtime']!,
  reactHooksConfigs['recommended-latest'],
  {
    files: ['**/*.{js,jsx,ts,tsx,mdx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'better-tailwindcss': pluginTailwind,
      react: pluginReact
    },
    rules: {
      ...pluginTailwind.configs['recommended-warn']!.rules,
      'better-tailwindcss/enforce-consistent-class-order': 'error',
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
      'better-tailwindcss/no-conflicting-classes': 'error',
      'better-tailwindcss/no-duplicate-classes': 'error',
      'better-tailwindcss/no-restricted-classes': 'error',
      'better-tailwindcss/no-unnecessary-whitespace': 'error',
      'better-tailwindcss/no-unregistered-classes': ['error', { ignore: ignores }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    },
    settings: {
      'better-tailwindcss': {
        tailwindConfig: 'tailwind.config.ts'
      },
      react: {
        version: 'detect'
      }
    }
  }
]

const tsconfig = ({ path: tsconfig }: { path: string }) => [
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: tsconfig
      }
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          project: tsconfig
        })
      ]
    }
  }
]

const config: ConfigArray = defineConfig(
  { ignores: ['**/dist/*', '.next', 'next-env.d.ts', 'postcss.config.js', '**/*.mdx'] },
  ...base,
  ...ui({ ignores: ['trans-gradient-stops', 'grid-lanes', 'twoslash-', 'ui-*'] }),
  ...tsconfig({ path: import.meta.dirname }),
  {
    plugins: {
      '@next/next': pluginNext
    }
  }
)

export default config
