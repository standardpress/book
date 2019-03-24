/**
 * PageProcessorMarkdown.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const PageProcessorMarkdown = require('../lib/PageProcessorMarkdown');

describe('PageProcessorMarkdown', () => {

  describe('process', () => {

    it('processes markdown to HTML', () => {
      const page = {
        destinationPath: 'test.md',
        data: '# title\npage __markdown__\n'
      };
      const pageProcessorMarkdown = new PageProcessorMarkdown();

      return pageProcessorMarkdown.process(page)
      .then(() => {
        expect(page).toEqual({
          destinationPath: 'test.html',
          data: '<h1>title</h1>\n<p>page <strong>markdown</strong></p>\n'
        });
      });
    });
  });
});
