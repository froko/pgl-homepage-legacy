import { defaultConfig, withPrettier } from '@froko/eslint-config'
import eslintPluginAstro from 'eslint-plugin-astro'

export default [
  ...defaultConfig,
  ...eslintPluginAstro.configs.recommended,
  withPrettier,
]
