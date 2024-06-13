module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  globals: {
    process: 'readonly',
    global: 'readonly',
    window: 'readonly',
    document: 'readonly',
    Node: 'readonly',
    MouseEvent: 'readonly',
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaVersion": 12, // версия стандарта JavaScript. Последний 12 (2021).
    "sourceType": "module" // Позволяет использовать import/export
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "camelcase": "error",
    "spaced-comment": "error",
    "quotes": ["warn", "single"],
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prettier/prettier": "error"
  },
  globals: {
    "process": "readonly",
    "global": "readonly",
    "window": "readonly",
    "document": "readonly",
    "Node": "readonly",
    "MouseEvent": "readonly"
  }
};
