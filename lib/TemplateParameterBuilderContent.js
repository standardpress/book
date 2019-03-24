/**
 * TemplateParameterBuilderContent.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

module.exports = class TemplateParameterBuilderContent {

  build(page) {
    return {
      content: page.data
    };
  }
};
