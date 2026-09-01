/**
 * The password rule, as plain values.
 *
 * Deliberately free of imports. The sign-up and reset-password forms need these
 * numbers to show the same rule the server enforces, and both are client
 * components — importing them from the zod schema instead pulled the whole of
 * zod into those two pages' bundles, which are the first thing a new visitor
 * downloads.
 *
 * `lib/schemas/passwordPolicy.ts` builds the zod schema from these, so the
 * browser and the server cannot disagree about what the rule is.
 */
export const MIN_PASSWORD_LENGTH = 12;
export const MAX_PASSWORD_LENGTH = 128;

export const PASSWORD_RULE_MESSAGE = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
