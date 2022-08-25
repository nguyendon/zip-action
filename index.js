const core = require('@actions/core');
const github = require('@actions/github');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

try {
  const srcPath = core.getInput('src-path');
  console.log(`Fetching ${srcPath}!`);
  const dest = core.getInput('dest');
  console.log(`Attempting to write to ${dest}...`);

  zipDirectory(srcPath, dest)
    .then((res) => {
      core.setOutput('output', dest);
      console.log(`Success, output is written to ${dest}`);
    })
    .catch((err) => {
      core.setFailed(err.message);
    });
} catch (error) {
  core.setFailed(error.message);
}

/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir, outPath) {
  const archive = archiver('zip', { zlib: { level: 9 }});
  const formedPath = path.join(process.cwd(), outPath);
  const outDir = path.dirname(formedPath);

  if (!fs.existsSync(outDir)){
    fs.mkdirSync(outDir);
  }

  const stream = fs.createWriteStream(formedPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .pipe(stream)
    ;

    stream.on('close', () => resolve());
    archive.finalize();
  });
}
