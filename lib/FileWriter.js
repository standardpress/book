/**
 * FileWriter.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const fs = require('fs');

module.exports = class FileWriter {

  write(filePath, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, data, error => {
        if (error) {
          reject(error);

          return;
        }

        resolve();
      });
    });
  }
};
