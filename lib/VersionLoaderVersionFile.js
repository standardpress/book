/**
 * VersionLoaderVersionFile.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const jsonfile = require('jsonfile');
const path = require('path');

module.exports = class VersionLoaderVersionFile {

  load(version) {
    const versionFilePath = path.join(version.path, 'version.json');

    return jsonfile.readFile(versionFilePath)
    .then(loadedVersion => {
      Object.assign(version, loadedVersion);
    });
  }
};
