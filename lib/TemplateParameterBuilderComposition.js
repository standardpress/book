/**
 * TemplateParameterBuilderComposition.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

module.exports = class TemplateParameterBuilderComposition {

  constructor(templateParameterBuilders) {
    this.templateParameterBuilders = templateParameterBuilders;
  }

  build(page, version, book) {
    const parameters = {};

    for (const templateParameterBuilder of this.templateParameterBuilders) {
      const parsedParameters = templateParameterBuilder.build(page, version, book);

      Object.assign(parameters, parsedParameters);
    }

    return parameters;
  }
};
