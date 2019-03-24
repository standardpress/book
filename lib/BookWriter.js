/**
 * BookWriter.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const deepForEach = require('deep-for-each');
const mkdirp = require('mkdirp');
const path = require('path');

module.exports = class BookWriter {

  constructor(writer) {
    this.writer = writer;
  }

  write(book, destinationPath) {
    const promises = [];

    deepForEach(book, (value, key, subject) => {
      if (key !== 'destinationPath') {
        return;
      }

      if (subject.data) {
        promises.push(new Promise((resolve, reject) => {
          const filePath = path.join(destinationPath, value);

          mkdirp(path.dirname(filePath), error => {
            if (error) {
              reject(error);

              return;
            }

            this.writer.write(filePath, subject.data)
            .then(() => {
              resolve();
            })
            .catch(error => {
              reject(error);
            });
          });
        }));
      }
    });

    return Promise.all(promises);
  }
};
