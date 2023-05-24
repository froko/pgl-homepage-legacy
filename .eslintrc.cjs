module.exports = {
  extends: ['plugin:astro/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-import', 'prettier'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    }
  ],
  rules: {
    'import/order': [
      'warn',
      {
        alphabetize: {
          order: 'asc'
        }
      }
    ]
  }
};
