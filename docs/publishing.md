# Publishing to npm

This guide covers publishing [sjs-nodejs](https://www.npmjs.com/package/sjs-nodejs) to the public npm registry at [https://www.npmjs.com/](https://www.npmjs.com/).

## Prerequisites

1. **npm account** — Create one at [https://www.npmjs.com/signup](https://www.npmjs.com/signup).
2. **Package name** — The name in `package.json` is `sjs-nodejs`. You must own this name on npm (or use a scoped name like `@your-org/sjs-nodejs` and update `name` in `package.json`).
3. **Node.js 18+** — Matches the `engines` field in `package.json`.
4. **Clean git state** — Commit and tag releases in git before publishing (recommended, not enforced by npm).

## One-time setup

### Log in to npm

```bash
npm login
```

Enter your npm username, password, and email. If your account uses **two-factor authentication (2FA)**, npm will prompt for an OTP.

Verify you are logged in:

```bash
npm whoami
```

### Confirm package access

If `sjs-nodejs` already exists on npm, you must be listed as a maintainer. Check:

```bash
npm owner ls sjs-nodejs
```

To add another maintainer (existing owners only):

```bash
npm owner add <npm-username> sjs-nodejs
```

## Pre-publish checklist

Before each release:

| Step | Action |
|------|--------|
| Version | Bump `"version"` in `package.json` ([semver](https://semver.org/): patch for fixes, minor for features, major for breaking changes). |
| Changelog | Note breaking changes (see README **Breaking changes** for v2.x). |
| README | Ensure install/scripts instructions match the release. |
| Dependencies | Run `npm install` and commit `package-lock.json` if you add one (optional for libraries; this repo currently ignores it in `.gitignore`). |
| Dry run | Run `npm pack --dry-run` and inspect the file list (see below). |
| Auth | `npm whoami` should print your username. |

### What gets published

npm includes files in the tarball based on defaults, `.npmignore`, and `.gitignore`. This repo ignores `node_modules/`, `sbt.zip`, and local sbt project files — they are **not** published.

Published artifacts are typically:

- `index.js`
- `package.json`
- `README.md`
- `docs/` (unless excluded)

To restrict published files explicitly, add a `"files"` field to `package.json`:

```json
"files": [
  "index.js",
  "README.md",
  "docs"
]
```

### Dry run (recommended)

See exactly what would be uploaded without publishing:

```bash
cd /path/to/sjs-nodejs
npm pack --dry-run
```

Create a tarball locally and inspect it:

```bash
npm pack
tar -tzf sjs-nodejs-2.0.0.tgz
```

Remove the `.tgz` after review if you do not need it.

## Publish

### First publish

From the repository root:

```bash
npm publish
```

For a **scoped** package (`@org/sjs-nodejs`), publish publicly with:

```bash
npm publish --access public
```

### Subsequent releases

1. Update `"version"` in `package.json` (npm rejects republishing the same version).
2. Commit and tag, for example: `git tag v2.0.1 && git push origin v2.0.1`
3. Publish:

```bash
npm publish
```

### Publish with 2FA

If your account requires 2FA for publishing:

- **Authorization only** — `npm publish` prompts for OTP when needed.
- **Authorization and writes** — OTP required for every publish; use your authenticator app when prompted.

## Verify on npm

After publish:

1. Open [https://www.npmjs.com/package/sjs-nodejs](https://www.npmjs.com/package/sjs-nodejs).
2. Confirm the version and README render correctly.
3. Smoke-test install in a temp directory:

```bash
mkdir /tmp/sjs-test && cd /tmp/sjs-test
npm init -y
npm install sjs-nodejs@latest
ls node_modules/sjs-nodejs
```

## Unpublishing and deprecating

- **Unpublish** — Only within 72 hours and with restrictions; avoid for widely used versions. See [npm unpublish policy](https://docs.npmjs.com/policies/unpublish).
- **Deprecate** (preferred for bad releases):

```bash
npm deprecate sjs-nodejs@2.0.0 "Reason; upgrade to 2.0.1"
```

## Troubleshooting

| Error | What to do |
|-------|------------|
| `403 Forbidden` | Not logged in, not a maintainer, or 2FA required — run `npm login` and check `npm owner ls`. |
| `402 Payment Required` | Scoped package published without `--access public` on a free account. |
| `You cannot publish over the previously published versions` | Bump `version` in `package.json`. |
| `package name too similar` | Choose a different name or prove ownership to npm support. |

## Useful links

- [npm publish documentation](https://docs.npmjs.com/cli/v10/commands/npm-publish)
- [Package name guidelines](https://docs.npmjs.com/package-name-guidelines)
- [About semantic versioning](https://docs.npmjs.com/about-semantic-versioning)
