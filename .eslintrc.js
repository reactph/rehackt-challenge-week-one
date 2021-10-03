module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    "prettier/prettier":  [
      "warn",
      {
        endOfLine: "lf",
        semi: false,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: "es5",
      },
    ],
  },
  settings: {
    react: {
      version: "detect"
    }
  },
}
