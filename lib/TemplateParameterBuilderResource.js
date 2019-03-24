/**
 * TemplateParameterBuilderResource.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const path = require('path');

module.exports = class TemplateParameterBuilderResource {

  build(page, version, book) {
    let stylesheets = [];
    let scripts = [];

    if (page && page.destinationPath) {
      const cssDestinationPaths = [];
      const jsDestinationPaths = [];

      if (book && book.assets && book.assets.length) {
        for (const asset of book.assets) {
          const { type, destinationPath } = asset;

          switch (type) {
          case 'css':
            cssDestinationPaths.push(destinationPath);
            break;
          case 'js':
            jsDestinationPaths.push(destinationPath);
          }
        }
      }

      const dirname = path.dirname(page.destinationPath);

      stylesheets = cssDestinationPaths.map(cssDestinationPath => {
        const relativePath = path.relative(dirname, cssDestinationPath);

        return relativePath;
      });

      scripts = jsDestinationPaths.map(jsDestinationPath => {
        const relativePath = path.relative(dirname, jsDestinationPath);

        return relativePath;
      });
    }

    return {
      stylesheets,
      scripts
    };
  }
};
