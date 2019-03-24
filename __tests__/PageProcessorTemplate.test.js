/**
 * PageProcessorTemplate.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const PageProcessorTemplate = require('../lib/PageProcessorTemplate');

describe('PageProcessorTemplate', () => {

  describe('process', () => {

    it('renders HTML with title', () => {
      const page = {};
      const templateParameterBuilder = {
        build: jest.fn().mockReturnValue({
          meta: {
            title: 'title',
            alternateLanguages: [],
            openGraph: {}
          },
          appleWebApplication: {},
          pinnedTabIcon: {},
          stylesheets: [],
          scripts: [],
          logo: {},
          links: [],
          navigation: {
            currentPage: {},
            pages: []
          }
        })
      };
      const pageProcessorTemplate = new PageProcessorTemplate(templateParameterBuilder);

      return pageProcessorTemplate.process(page, 'version', 'book')
      .then(() => {
        expect(templateParameterBuilder.build).toHaveBeenCalledTimes(1);
        expect(templateParameterBuilder.build).toHaveBeenCalledWith(page, 'version', 'book');
        expect(page.data).toContain('<title>title</title>');
      });
    });
  });
});
