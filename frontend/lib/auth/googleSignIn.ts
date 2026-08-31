/**
 * Who is allowed through the Google sign-in door, and on what terms.
 *
 * Kept apart from the NextAuth callback so the rules can be read — and tested —
 * without standing up a provider, a session and a database. The callback does
 * the talking to Prisma; everything decided here is a pure function of the two
 * facts that matter: what Google claims, and what we already store.
 */

export type ExistingAccount = {
  password: string | null;
  emailVerified: Date | null;
};

export type GoogleSignInDecision =
  /** Google itself has not confirmed the address. Nothing else is safe to do. */
  | { action: "refuse" }
  /** No account on this address yet; create one, already verified. */
  | { action: "create" }
  /** An unverified local password sits on this address. Drop it, then sign in. */
  | { action: "reclaim" }
  /** Account is sound but still unmarked; record the address as verified. */
  | { action: "verify" }
  /** Ordinary case: sign in to the account as it stands. */
  | { action: "allow" };

export function decideGoogleSignIn(params: {
  googleEmailVerified: boolean | undefined;
  existingAccount: ExistingAccount | null;
}): GoogleSignInDecision {
  const { googleEmailVerified, existingAccount } = params;

  if (!googleEmailVerified) return { action: "refuse" };

  if (!existingAccount) return { action: "create" };

  if (existingAccount.password && !existingAccount.emailVerified) {
    return { action: "reclaim" };
  }

  /* Accounts created through Google before this ran were never marked verified,
     so the column disagrees with reality for every one of them. Google confirms
     the address on each sign-in, so they can correct themselves as their owners
     return, without a migration touching the live database. */
  if (!existingAccount.emailVerified) return { action: "verify" };

  return { action: "allow" };
}
