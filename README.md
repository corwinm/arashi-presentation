# Arashi Presentation

A Slidev deck introducing [Arashi](https://github.com/corwinm/arashi) through the two development problems it solves:

1. managing Git worktrees for safe parallel work;
2. coordinating an organization's distributed codebase through a meta-repository.

The deck shows each solution independently and then demonstrates how they compose into coordinated multi-repository worktrees.

## Local development

Development uses Node.js 24.18.0 (pinned in `.node-version`) and pnpm 11.20.0 (pinned in `package.json`).

```sh
npm install --global corepack@0.35.0
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Quality checks

```sh
pnpm validate
```

Build the static site with `pnpm build`. Export a PDF with `pnpm export` after installing the Playwright browser when prompted.

## Editing the deck

- Author slides and presenter notes in `slides.md`.
- Keep detailed command behavior in the [Arashi documentation](https://arashi.haphazard.dev/) and link to it rather than duplicating a full command reference.
- Preserve the two-pillar narrative: worktrees for parallelism and meta-repositories for distributed codebase coordination.
- Verify both the single-repository and coordinated multi-repository examples against current Arashi behavior.
- Render and visually inspect every slide before merging presentation changes.

## Deployment

Netlify builds the site from `main` and publishes deploy previews for pull requests. Build settings are committed in `netlify.toml`.

## License

MIT
