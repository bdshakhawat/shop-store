
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default {
  languageOptions: {
    parser: tsParser,
  },
  plugins: {
    '@typescript-eslint': tseslint,
  },
  rules: {
    'no-unused-vars': 'error',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-console': 'off',
  },
  ignores: ['dist', 'node_modules'],
  languageOptions: {
    globals: {
      // Node.js globals
      require: 'readonly',
      module: 'readonly',
      exports: 'readonly',
      process: 'readonly',
      console: 'readonly',
    },
  },
};











// import globals from "globals";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";


// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
//   {languageOptions: { globals: globals.node }},
//   ...tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,

//   {
//     ignores: ["node_modules", "dist"],
//     rules: {
//       "no-unused-vars": "error",
//     },
//   },
// ];