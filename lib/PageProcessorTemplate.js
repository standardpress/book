/**
 * PageProcessorTemplate.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const path = require('path');
const pug = require('pug');

module.exports = class PageProcessorTemplate {

  constructor(templateParameterBuilder) {
    const templatePath = path.resolve(__dirname, '../template/page.pug');

    this.render = pug.compileFile(templatePath);
    this.templateParameterBuilder = templateParameterBuilder;
  }

  process(page, version, book) {
    const renderOptions = this.templateParameterBuilder.build(page, version, book);

    return new Promise(resolve => {
      const html = this.render(renderOptions);

      page.data = html;
      resolve();
    });
  }
};
