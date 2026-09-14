import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/* eslint-config-next bundles eslint-plugin-react, which still calls
   context.getFilename(). ESLint 10 removed it, so every run crashed while
   loading react/display-name. fixupConfigRules puts the removed methods back
   for those rules. Remove it once eslint-plugin-react supports ESLint 10. */
const eslintConfig = defineConfig([
  ...fixupConfigRules(nextVitals),
  ...fixupConfigRules(nextTs),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
   "rules" :   {
   "@typescript-eslint/no-unused-vars" :   [
   "error" ,
   {
   "caughtErrors" :   "all" ,
   "caughtErrorsIgnorePattern" :   "^_" ,
   // ... (other options)
   }
   ]
   }
}
]);

export default eslintConfig;
