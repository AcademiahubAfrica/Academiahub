# Academiahub

## About

AcademiaHub Africa is a comprehensive academic platform designed to connect students, lecturers, and researchers across the different universities in Africa. It combines a knowledge marketplace, collaborative research tools, an academic social network, and career development opportunities all in one ecosystem.

Our mission is simple: empower students and academics to learn, earn, and grow while bridging the gap between universities and industry.

## Contributions

1. Fork the repository.
2. In your terminal, run the `git clone` command with the forked repository's URL, e.g.,

```bash
git clone https://github.com/JohnDoe/Academiahub.git
```

This creates a local repository on your machine.

3. To keep your fork up to date with the company's, run the following command:

```bash
git remote add upstream https://github.com/AcademiahubAfrica/Academiahub.git
```

4. To fetch and merge the latest changes from upstream, run:

```bash
git fetch upstream
git merge upstream/main
```

## Latest Changes to Updating Local Repository

To start getting updates from the company repo's development branch, run one of these:

Quick one-time update:

```bash
  git fetch upstream
  git checkout main
  git pull upstream development
```

Make your local main pull from upstream/development by default:

```bash
  git fetch upstream
  git checkout main
  git branch --set-upstream-to=upstream/development main
  git pull
```

(If your main has local commits you don't want to lose, do NOT run reset --hard.)

## How to Check the Database via Prisma

Run the command: 

```bash
npx prisma studio
```
