import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["**/*.js"],
    ignores: ["node_modules/**", ".github/**", "dist/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // default for client-side code
      },
    },
  },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: ["**/*.mjs", "build.mjs"],
    languageOptions: {
      globals: {
        ...globals.node, // gives you process, console, __dirname, etc.
      },
    },
  },
];
