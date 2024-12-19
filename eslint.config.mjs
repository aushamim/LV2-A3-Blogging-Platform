import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-config-prettier";
import stylistic from "@stylistic/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  { ignores: [".node_modules/*", "dist"] },
  { plugins: { "@stylistic": stylistic } },
  {
    rules: {
      "no-undef"               : "error",
      "prefer-const"           : "error",
      "no-console"             : "warn",
      "@stylistic/key-spacing" : ["warn", { align: { beforeColon: true } }],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettier,
]; // prettier-ignore
