const core = require('@actions/core');
const github = require('@actions/github');

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
  const stream = fs.createWriteStream(outPath);

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
