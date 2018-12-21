var http = require('https');
var path = require("path");
var fs = require('fs');
var zlib = require('zlib');
var http_client = require('request');
var yauzl = require("yauzl");

var sbtUrl = "https://piccolo.link/sbt-1.2.7.zip";
var output = "sbt.zip";

http_client({url: sbtUrl, encoding: null}, function(err, resp, body) {
  if(err) throw err;
  fs.writeFile(output, body, function(err) {
    console.log("sbt downloaded");
    setup_sbt(() => chmod_sbt());
  });
});

function mkdirp(dir, cb) {
  if (dir === ".") return cb();
  fs.stat(dir, function(err) {
    if (err == null) return cb(); // already exists

    var parent = path.dirname(dir);
    console.log("[INFO] " + parent)
    mkdirp(parent, function() {
      process.stdout.write(dir.replace(/\/$/, "") + "/\n");
      fs.mkdir(dir, function() {
        fs.chmod(dir, '777', cb)
      });
    });
  });
}

function setup_sbt(fn) {

console.log("setting up sbt")
yauzl.open("sbt.zip", {lazyEntries: true}, function(err, zipfile) {
  if (err) throw err;
  zipfile.readEntry();
  zipfile.on("entry", function(entry) {
    //console.log("entry: " + entry.fileName)
    if (/\/$/.test(entry.fileName)) {
      // Directory file names end with '/'.
      // Note that entires for directories themselves are optional.
      // An entry's fileName implicitly requires its parent directories to exist.
      mkdirp(entry.fileName, function() {
        if (err) throw err;
        zipfile.readEntry();
      });
    } else {
     mkdirp(path.dirname(entry.fileName), function() {
      // file entry
      zipfile.openReadStream(entry, function(err, readStream) {
        if (err) throw err;
        readStream.on("end", function() {
          zipfile.readEntry();
        });
        var writeStream = fs.createWriteStream(entry.fileName);
	readStream.pipe(writeStream);
//        fn();
      });
    });
   }
  });
});
}

// chmod -R 777 sbt
function chmod_sbt() {
  fs.chmod('sbt', 777)
}

