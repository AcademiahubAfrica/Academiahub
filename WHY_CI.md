# Why CI?

## What CI is

CI stands for **continuous integration**. In plain terms: a robot that checks
every change automatically, before it is allowed into the main code.

Each time someone opens a pull request, GitHub starts a fresh, empty computer,
downloads the code, and runs a list of checks we define. It then puts a green
tick or a red cross on the pull request. That is all it is.

## Why it is worth having

**It catches problems while they are still cheap.** A mistake found in a pull
request costs a few minutes. The same mistake found after it is live costs
users, trust, and a scramble.

**It checks things people forget to check.** This project has already had two
examples. Lint crashed on every run for a long time and nobody noticed, because
nobody runs lint by hand. And a critical Next.js security advisory appeared
within two weeks with nothing flagging it. A pipeline running `npm audit` goes
red the day an advisory like that is published.

**It does not get tired or skip steps.** People check carefully on a good day and
skip steps on a busy one. The robot runs the same checks the same way every
time.

**It ends "works on my machine".** A laptop has things installed, files lying
around, and settings that other machines do not. CI starts from nothing each
time, so if a change passes there, it is not passing because of something only
one person has.

**It keeps `main` healthy.** If `main` only receives changes that passed, anyone
can start new work from it and trust that it builds.

## How it helps a team

**Reviewers focus on what matters.** Without CI, a reviewer has to wonder
whether the code even compiles. With it, the tick answers that, and they can
spend their attention on whether the change is correct and sensible.

**Everyone follows the same rules.** Instead of "please remember to run the type
checker", the rule is enforced for everyone equally, new contributors included.
Nobody has to be the person who nags.

**New contributors are safer.** Someone who does not know the codebase yet cannot
accidentally break the build without finding out immediately, before a
maintainer has to.

**Mistakes are visible and easy to trace.** A red cross appears on the exact pull
request that caused the problem, so it is clear which change to fix. No digging
through history later to find what broke things.

**It pairs with branch protection.** On GitHub you can require the checks to pass
before a pull request can be merged. At that point it is not a suggestion, it is
a gate.

## What it will not do

CI only knows what we tell it to check. It will not judge whether code is a good
idea, whether a feature works the way a user expects, or catch bugs our checks
do not cover. It is a safety net, not a replacement for review.

## What our pipeline checks

The workflow lives in `.github/workflows/ci.yml` and runs two jobs.

**Verify** runs on every pull request, and on every push to `development` and
`main`. Work is approved into `development` and `main` is what deploys, so
checking both after each merge catches two changes that pass on their own but
break once combined:

- **Installs exactly what the lockfile says** (`npm ci`), so everyone gets
  identical packages.
- **Generates the Prisma clients** the code depends on.
- **Type checks** both the frontend and the backend.
- **Lints** the frontend.

**Audit dependencies** runs on the same triggers and also once a day, because
security advisories are published whether or not anyone touches the code. It
fails on **critical** advisories. It does not fail on high ones yet, because
three high advisories inside Prisma's own dependencies have no fix available,
and a check that stays red for reasons nobody can act on teaches people to
ignore it.

The actions the workflow uses are pinned to exact commit IDs rather than version
tags. A tag can be moved to point at different code; a commit ID cannot.

## Dependabot

Dependabot is a separate GitHub feature, configured in `.github/dependabot.yml`.
Once a week it checks for newer versions of our packages and of the actions the
workflow uses, and opens pull requests for them against `development`, so updates
go through the same approval as any other change before reaching `main`. Small
updates are grouped into a single pull request; major versions arrive
separately, since those are the ones likely to break something.
