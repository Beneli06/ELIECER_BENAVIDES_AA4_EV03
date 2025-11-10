// ESLint Flat Config for React + Vite
// Referencia: https://eslint.org/docs/latest/use/configure/configuration-files-new
import reactPlugin from "eslint-plugin-react";

export default [
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { document: "readonly", window: "readonly", localStorage: "readonly" },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react: reactPlugin },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true }],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
    },
    settings: { react: { version: "detect" } },
  },
];