/**
 * TemplateParameterBuilderContent.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const TemplateParameterBuilderContent = require('../lib/TemplateParameterBuilderContent');

describe('TemplateParameterBuilderContent', () => {

  describe('build', () => {

    it('returns page data', () => {
      const page = {
        data: 'pageData'
      };
      const templateParameterBuilderContent = new TemplateParameterBuilderContent();

      expect(templateParameterBuilderContent.build(page, {}, {}).content).toEqual('pageData');
    });
  });
});
