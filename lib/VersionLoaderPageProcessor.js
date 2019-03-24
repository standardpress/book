/**
 * VersionLoaderPageProcessor.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const deepForEach = require('deep-for-each');

module.exports = class VersionLoaderPageProcessor {

  constructor(pageProcessor) {
    this.pageProcessor = pageProcessor;
  }

  load(version, book) {
    const promises = [];

    deepForEach(version.pages, (value, key, subject) => {
      if (key !== 'path') {
        return;
      }

      promises.push(new Promise((resolve, reject) => {
        this.pageProcessor.process(subject, version, book)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
      }));
    });

    return Promise.all(promises);
  }
};
