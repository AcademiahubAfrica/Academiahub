import { z } from "zod";
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_RULE_MESSAGE,
} from "@/lib/passwordRules";

/**
 * The one password rule. Signup, password reset and password change all import
 * this, because three routes with three different rules is a trap: an account
 * could be created with a password its owner was then forbidden from choosing
 * again, and the weakest of the three governed every new account.
 *
 * Length, not composition. Requiring an uppercase letter and a symbol mostly
 * produces `Password1!` — predictable to a guessing tool and irritating to
 * everyone else — while each extra character multiplies the work of an offline
 * attack. Twelve is the current OWASP floor.
 *
 * The numbers live in `@/lib/passwordRules`, which imports nothing, so the two
 * client forms can display the same rule without pulling zod into their bundles.
 */
export const passwordPolicy = z
  .string({ error: "Password is required" })
  .min(MIN_PASSWORD_LENGTH, PASSWORD_RULE_MESSAGE)
  .max(
    MAX_PASSWORD_LENGTH,
    `Password must be at most ${MAX_PASSWORD_LENGTH} characters`,
  );
