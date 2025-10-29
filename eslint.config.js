import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  nextPlugin.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    ignores: [
      // 🔒 Ignora tudo que é gerado automaticamente
      ".next/**",
      "node_modules/**",
      "dist/**",
      "out/**",
      "coverage/**",
      "next-env.d.ts/",
      "next.config.mjs",
      "tsconfig.json",
      "eslint.config.js",
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      // ⚙️ Regras relaxadas — ideais pra CI/CD e ambiente de aprendizado
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "react/react-in-jsx-scope": "off",
      "no-undef": "off",
      "@next/next/no-assign-module-variable": "off",
    },
  },
];
