# Welcome, AcademiaHubAfrica Contributor

[Setting Up the Development Environment](#setting-up-the-development-environment)

[Keeping Your Local Repo Up to Date](#keeping-your-local-repo-up-to-date)

[Installing Dependencies](#installing-dependencies)

[Pull Requests](#pull-requests)

[Prisma](#prisma)

## Setting Up the Development Environment

1. Fork the repository.
2. In your terminal, run the `git clone` command with the forked repository's URL, e.g.

    ```bash
    git clone https://github.com/JohnDoe/Academiahub.git
    ```

    This creates a local repository on your machine.

3. To keep your fork up to date with the development branch of the company's repository, run the following command.

    ```bash
    git config remote.upstream.fetch "+refs/heads/development:refs/remotes/upstream/development" 
    ```

    Now, when you run `git fetch upstream`, Git will only fetch `upstream/development`.

4. If you decide to pull in the updates, then use the following command.

    ```bash
    git pull upstream development
    ```

5. Run `git remote -v` to verify. You should see this.

    ```bash
    origin    https://github.com/JohnDoe/Academiahub.git (fetch)
    origin    https://github.com/JohnDoe/Academiahub.git (push)
    upstream  https://github.com/AcademiahubAfrica/Academiahub.git (fetch)
    upstream  https://github.com/AcademiahubAfrica/Academiahub.git (push)
    ```

    *N/B*: If the origin does not show the forked repository's URL, use the command below to add it and then run `git remote -v` again to verify.

    ``` bash
    git remote add origin https://github.com/JohnDoe/EleQ.git
    ```

6. From the root of your project, install the dependencies and generate the Prisma clients. Cheers! You're all set. Well done. 🎉

    ```bash
    npm ci
    npx prisma generate --schema prisma/schema.prisma
    ```

## Keeping Your Local Repo Up to Date

Every pull request is checked by our CI pipeline (`.github/workflows/ci.yml`), which installs dependencies with `npm ci`. Dependabot also opens weekly dependency updates against `development`, so most pulls bring in a changed `package-lock.json`. Follow these steps each time you pull, so your machine runs exactly what CI tested.

1. Stop any running dev servers. On Windows, a running server locks Prisma's engine file and the next step fails with `EPERM`.
2. From the root of your project, pull the latest changes, reinstall, and regenerate the Prisma clients.

    ```bash
    git pull upstream development
    npm ci
    npx prisma generate --schema prisma/schema.prisma
    ```

### Why `npm ci` and not `npm install`

- `npm ci` deletes `node_modules` and installs exactly what `package-lock.json` specifies. It never changes the lockfile.
- `npm install` can move packages to newer versions and rewrite the lockfile, leaving you with changes you didn't intend to make and packages CI never tested.
- Only use `npm install` when you are adding or changing a dependency (see [Installing Dependencies](#installing-dependencies)).

### Why regenerate the Prisma clients

Installing does not regenerate them. If a pull changed `prisma/schema.prisma` and you skip this step, you will see type errors for fields that clearly exist in the schema.

### If `package-lock.json` has a merge conflict

Don't fix it by hand. Take the upstream version, then let npm add your changes back.

```bash
git checkout --theirs package-lock.json
npm install
```

### Install script warnings (npm 12 and above)

npm 12 only runs a package's install scripts if the root `package.json` approves it under `allowScripts`. The approvals are already committed, so `npm ci` should run without warnings. If you see `install scripts blocked because they are not covered by allowScripts`, a package was added or upgraded. List the blocked packages with the command below, and ask a maintainer before approving any of them.

```bash
npm install-scripts ls
```

### Run the CI checks locally (optional)

These are the same checks CI runs, so if they pass locally your pull request should pass too. Run them from the root.

```bash
cd frontend
npx next typegen
npx tsc --noEmit
cd ../backend
npx tsc --noEmit
cd ..
npm run lint --workspace frontend
npm audit --omit=dev --audit-level=critical
```

## Installing Dependencies

This is a monorepo that uses `npm workspaces`. `npm workspaces` prevent dependency conflicts and duplicate installs. With this in mind, stick to the following rules when installing dependencies to avoid issues.

### Install dependencies ONLY from the root

Never run `npm install` inside `frontend` or `backend` directly.

  ```bash
  ❌
  cd backend
  npm install express
  ```

  ```bash
  ❌
  cd frontend
  npm install next
  ```

### Adding new dependencies

- To add a frontend dependency, do this:

    ```bash
    npm install axios --workspace frontend
    ```

- To add a backend dependency, do this:

    ```bash
    npm install bcrypt --workspace backend
    ```

- Always commit `package.json` and `package-lock.json` together. If they don't match, `npm ci` fails in CI and for everyone who pulls your change.

### Run scripts per workspace

- Run frontend dev server

    ```bash
    npm run dev --workspace frontend
    ```

- Run backend dev server

    ```bash
    npm run dev --workspace backend
    ```

### Here's A Summary of the Dependencies Rules (Now, You Have No Excuses)

❌ Running `npm install` inside subfolders

❌ Multiple lockfiles

❌ Running `npm install` after a pull instead of `npm ci`

❌ Committing `package.json` without `package-lock.json`

❌ Installing deps without `--workspace`

❌ Forgetting `private: true` in root

## Pull Requests

For a consistent pattern that is easy to understand, use the following convention for both **commit messages and PR titles**: `<type>(<scope>): <description>`. The **scope is required** and indicates what part of the codebase is affected. The description after the `:` must be **50 characters or fewer**.

### Types

- **feat** — new feature
- **fix** — bug fix
- **docs** — documentation changes
- **refactor** — code restructuring without changing behaviour
- **test** — adding or updating tests
- **chore** — maintenance tasks (dependencies, configs)
- **perf** — performance improvements
- **style** — formatting, missing semicolons, etc.

### Scopes

Use a scope that best describes the area of the codebase being changed:

- **frontend** — changes to the Next.js frontend
- **backend** — changes to the Express/Socket.IO backend
- **root** — project-wide changes (configs, CI, docs, dependencies)

### Good examples (from this repo)

```bash
feat(backend): add conversation and read receipt endpoints
feat(frontend): add Socket.IO context with idle timeout
refactor(backend): use Express global type augmentation
perf(frontend): convert login page to server component
fix(frontend): remove searchbar on mobile
style(frontend): fix typos
```

### Bad examples (from this repo) — do NOT do these

```bash
Added database                            # no type, no scope, vague
User authentication and authorization     # no type, no scope
Update README.md                          # no type, no scope, too generic
Fixes to errors/warnings before deployment # no type, no scope, vague
feat: add logout functionality            # missing scope — should be feat(frontend): ...
chore: add resend dependency              # missing scope — should be chore(root): ...
docs: Add CONTRIBUTING.md                 # missing scope — should be docs(root): ...
fix: resolve latest build failure         # missing scope, "latest" is vague
feat: file upload/storage                 # missing scope, slash in description
chore: add root .env and update .gitignore # missing scope, mixes two changes
feat(backend): add auth, rate-limit, and error-handling middleware # description exceeds 50 chars
```

### PR size

In the main description section, provide a clear and concise description of what the PR does. How would you know if your PR is too large? A simple indicator is if you have to add an "and" to the title. What comes after the "and" should definitely be in a separate PR.

## Prisma

The Prisma schema lives at `prisma/schema.prisma` in the project root. There are dual generators — one for frontend and one for backend. After any schema change, regenerate both clients from the root of your project:

```bash
npx prisma generate --schema prisma/schema.prisma
```

To push schema changes to the database (without creating a migration):

```bash
npx prisma db push
```

To browse the database visually:

```bash
npx prisma studio
```
