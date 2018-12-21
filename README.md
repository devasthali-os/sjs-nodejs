sjs-nodejs
----------

This is a npm module to help transpile scalajs code to js.


TODOs
------

- [x] install sbt to node_modules
- [x] give execute access to node_modules/sbt/bin/sbt
- [ ] deploy to npm repo - https://www.npmjs.com/
- [ ] fix need for sbt repo to run node_modules/sbt/bin/sbt 

```
[repositories]

  local
  jcenter: https://jcenter.bintray.com/
  maven-central
  typesafe-ivy-releases: https://repo.typesafe.com/typesafe/ivy-releases/, [organization]/[module]/[revision]/[type]s/[artifact](-[classifier]).[ext], bootOnly
  sbt-ivy-snapshots: https://repo.scala-sbt.org/scalasbt/ivy-snapshots/, [organization]/[module]/[revision]/[type]s/[artifact](-[classifier]).[ext], bootOnly
```

Example
------

https://github.com/duwamish-os/introv.scalajs

