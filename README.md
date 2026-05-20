# sjs-nodejs

npm helper to bootstrap [sbt](https://www.scala-sbt.org/) and link [Scala.js](https://www.scala-js.org/) (Scala 3) projects to JavaScript. Scala.js compiles through sbt; this package downloads sbt into `node_modules` and exposes npm scripts for common link and run tasks.

Published on npm: [sjs-nodejs](https://www.npmjs.com/package/sjs-nodejs)

**Requirements:** Node.js 18+

## Recommended versions (v2.x)

| Tool       | Version |
|------------|---------|
| sbt        | 1.10.7  |
| Scala      | 3.5.2   |
| Scala.js   | 1.21.0  |

## Install

In your Scala.js project:

```bash
npm install sjs-nodejs
```

## Use locally

To try changes in this repo from another Scala.js project without publishing to npm.

### Option 1: `npm link`

In this repository:

```bash
cd /path/to/sjs-nodejs
npm install
npm link
```

In your Scala.js app:

```bash
cd /path/to/your-scalajs-app
npm link sjs-nodejs
```

Your app’s `node_modules/sjs-nodejs` now points at your local clone. Re-run `npm link sjs-nodejs` after pulling changes if behavior looks stale.

To unlink later:

```bash
cd /path/to/your-scalajs-app
npm unlink sjs-nodejs
npm install sjs-nodejs   # restore the published package, if needed
```

### Option 2: install from a path

In your Scala.js app:

```bash
npm install /path/to/sjs-nodejs
# or, relative path:
npm install ../sjs-nodejs
```

`package.json` will record a `file:` dependency (for example `"sjs-nodejs": "file:../sjs-nodejs"`).

### Scripts in the consuming project

Whichever option you use, add the same scripts to your app’s `package.json` so npm can find sbt and this package:

```json
{
  "scripts": {
    "sbtInit": "node node_modules/sjs-nodejs/index.js",
    "sjsBuild": "npm run sbtInit && node_modules/sbt/bin/sbt fastLinkJS",
    "sjsBuildFull": "npm run sbtInit && node_modules/sbt/bin/sbt fullLinkJS",
    "sjs": "node_modules/sbt/bin/sbt run"
  }
}
```

Then from your app directory:

```bash
npm run sjsBuild
```

## npm scripts

Add these to your project's `package.json` (or rely on the same script names if you copy them from this package):

| Script         | Command              | Description                          |
|----------------|----------------------|--------------------------------------|
| `sbtInit`      | downloads & unpacks sbt | Run once (also run by build scripts) |
| `sjsBuild`     | `fastLinkJS`         | Fast development link                |
| `sjsBuildFull` | `fullLinkJS`         | Full optimizations for production    |
| `sjs`          | `run`                | Run the Scala.js app via sbt         |

Example:

```bash
npm run sjsBuild      # fast link
npm run sjsBuildFull  # optimized link
npm run sjs           # run
```

## sbt setup (Scala 3)

**`project/plugins.sbt`**

```scala
addSbtPlugin("org.scala-js" % "sbt-scalajs" % "1.21.0")
```

**`build.sbt`**

```scala
lazy val root = project
  .in(file("."))
  .enablePlugins(ScalaJSPlugin)
  .settings(
    scalaVersion := "3.5.2",
    scalaJSUseMainModuleInitializer := true,
  )
```

**`project/build.properties`**

```properties
sbt.version=1.10.7
```

## Breaking changes in v2.0.0

- Targets **Scala 3** and **Scala.js 1.x** (not Scala 2.12 / Scala.js 0.6).
- Build tasks renamed: `fastOptJS` → `fastLinkJS`, `fullOptJS` → `fullLinkJS`.
- Bundled sbt upgraded from 1.0.1 to 1.10.7.

## Example project

https://github.com/devasthali-os/introv.scalajs

## Publishing

Maintainers: see [docs/publishing.md](docs/publishing.md) for logging in to npm, pre-publish checks, `npm publish`, and verification on [npmjs.com](https://www.npmjs.com/package/sjs-nodejs).

## Repository

https://github.com/devasthali-os/sjs-nodejs
