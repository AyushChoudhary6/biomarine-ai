module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2022: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'commonjs'
  },
  rules: {
    'no-unused-vars': ['error', { 
      varsIgnorePattern: '^[A-Z_]',
      argsIgnorePattern: '^_'
    }],
    'no-useless-escape': 'error',
    'no-console': 'off'
  }
};