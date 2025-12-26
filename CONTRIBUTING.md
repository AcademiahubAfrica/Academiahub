# Welcome, AcademiaHubAfrica Contributor

[Setting Up the Development Environment](#setting-up-the-development-environment)

[Installing Dependencies](#installing-dependencies)

[Pull Requests](#pull-requests)

[Checking Database via Prisma (Temporary)](#checking-database-via-prisma)

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

    To set your local `main` branch to track the company's `development` branch by default, run:

    ```bash
    git branch --set-upstream-to=upstream/development main
    ```

    Now when you run `git pull` on your main branch, it will automatically pull from `upstream/development` instead of `origin/main`. To verify it worked:

    ```bash
    git branch -vv
    
    # You should see something like:
    # main abc1234 [upstream/development] Your commit message
    ```

    **Note**: This means:

    `git pull` = pulls from company's `development` branch

    `git push` = still pushes to your fork's `main` (origin/main)

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

6. Run `npm install` from the root of your project to install already set up dependencies. Cheers! You're all set. Well done. 🎉

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

❌ Installing deps without `--workspace`

❌ Forgetting `private: true` in root

## Pull Requests

For a consistent PR pattern that is easy to understand, use the following convention for PR titles: `<type>: <brief description>`. Common types include:

- **feat** — new feature
- **fix** — bug fix
- **docs** — documentation changes
- **refactor** — code restructuring without changing behaviour
- **test** — adding or updating tests
- **chore** — maintenance tasks (dependencies, configs)
- **perf** — performance improvements
- **style** — formatting, missing semicolons, etc.

Examples:

- feat: add user authentication with OAuth
- fix: resolve null pointer in checkout flow
- docs: update API documentation for v2 endpoints

In the main description section, provide a clear and concise description of what the PR does. How would you know if your PR is too large? A simple indicator is if you have to add an "and" to the title. What comes after the "and" should definitely be in a separate PR.

## Checking Database via Prisma

Run the command:

```bash
npx prisma studio
```
