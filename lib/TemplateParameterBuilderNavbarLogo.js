/**
 * TemplateParameterBuilderNavbarLogo.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const path = require('path');

module.exports = class TemplateParameterBuilderNavbarLogo {

  build(page, version, book) {
    let imagePath = null;
    let href = null;
    let value = null;

    if (page && page.destinationPath) {
      const dirname = path.dirname(page.destinationPath);

      if (book && book.assets && book.assets.length) {
        for (const asset of book.assets) {
          if (asset.type === 'logo') {
            imagePath = path.relative(dirname, asset.destinationPath);
          }
        }
      }
    }

    if (version && version.destinationPath) {
      href = `/${path.relative('.', version.destinationPath)}`;
    }

    if (version && version.language && version.language.title) {
      value = version.language.title;
    } else if (book && book.manifest && book.manifest.title) {
      value = book.manifest.title;
    }

    return {
      logo: {
        imagePath,
        href,
        value
      }
    };
  }
};
