/**
 * TemplateParameterBuilderSidebarNavigation.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const deepForEach = require('deep-for-each');
const path = require('path');

module.exports = class TemplateParameterBuilderSidebarNavigation {

  build(page, version) {
    deepForEach(version.pages, (value, key, subject) => {
      if (key !== 'destinationPath') {
        return;
      }

      let href;

      const basename = path.basename(value);
      const dirname = path.dirname(value);

      if (basename === 'index.html') {
        if (dirname === '.') {
          href = '';
        } else {
          href = dirname;
        }
      } else {
        href = value;
      }

      subject.href = `/${href}`;
    });

    return {
      navigation: {
        currentPage: page,
        pages: version.pages
      }
    };
  }
};
