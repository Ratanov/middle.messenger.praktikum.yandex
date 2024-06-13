module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    camelcase: "error",
    "spaced-comment": "error",
    quotes: ["warn", "single"],
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prettier/prettier": "error"
  },
  globals: {
    process: 'readonly',
    global: 'readonly',
    window: 'readonly',
    document: 'readonly',
    Node: 'readonly',
    MouseEvent: 'readonly',
    describe: 'readonly',
    it: 'readonly',
    before: 'readonly',
    after: 'readonly',
  },
};
