/**
 * TemplateParameterBuilderNavbarLink.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

module.exports = class TemplateParameterBuilderNavbarLink {

  build(page, version, book) {
    let links = [];

    if (version && version.language && version.language.links) {
      links = version.language.links;
    } else if (book && book.manifest && book.manifest.links) {
      links = book.manifest.links;
    }

    return {
      links
    };
  }
};
