/**
 * VersionLoaderPageData.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const deepForEach = require('deep-for-each');
const fs = require('fs');
const path = require('path');

module.exports = class VersionLoaderPageData {

  load(version) {
    const promises = [];

    deepForEach(version.pages, (value, key, subject) => {
      if (key !== 'path') {
        return;
      }

      promises.push(new Promise((resolve, reject) => {
        const dataFilePath = path.join(version.path, value);

        fs.readFile(dataFilePath, (error, data) => {
          if (error) {
            reject(error);

            return;
          }

          let destinationPath = subject === version.pages[0] ? 'index.md' : value;

          destinationPath = path.join(version.destinationPath, destinationPath);
          subject.destinationPath = destinationPath;
          subject.data = data.toString();
          resolve();
        });
      }));
    });

    return Promise.all(promises);
  }
};
