import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Global ignores
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      '.terraform/**',
      'public/models/**',
      'backend/**', // Backend has its own .eslintrc.js
      '*.min.js'
    ]
  },

  // Frontend React configuration
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
        gc: 'readonly' // Allow gc function
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^[A-Z_]|^motion$|^index$|^error$|^err$|^key$|^toggleTheme$|^confirmPassword$|^imageData$|^imageElement$|^dominantColors$',
        argsIgnorePattern: '^_'
      }],
      'react-hooks/exhaustive-deps': 'warn'
    }
  },

  // Configuration files
  {
    files: ['*.config.js', 'eslint.config.js', 'vite.config.js', 'tailwind.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2022
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_'
      }]
    }
  }
]
