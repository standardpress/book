/**
 * AssetLoaderPinnedTabIcon.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const fs = require('fs');
const path = require('path');

module.exports = class AssetLoaderPinnedTabIcon {

  load(bookPath) {
    return new Promise((resolve, reject) => {
      const pinnedTabIconFilePath = path.join(bookPath, 'assets/pinned_tab_icon.svg');

      fs.readFile(pinnedTabIconFilePath, (error, data) => {
        if (error) {
          if (error.code === 'ENOENT') {
            resolve(null);
          } else {
            reject(error);
          }

          return;
        }

        resolve({
          type: 'pinnedTabIcon',
          destinationPath: 'pinned_tab_icon.svg',
          data
        });
      });
    });
  }
};
