/**
 * TemplateParameterBuilderSidebarNavigation.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const TemplateParameterBuilderSidebarNavigation = require('../lib/TemplateParameterBuilderSidebarNavigation');

describe('TemplateParameterBuilderSidebarNavigation', () => {

  describe('build', () => {

    it('returns pages for sidebar navigation', () => {
      const version = {
        pages: {
          destinationPath: 'path/index.html',
          pages: [
            {
              destinationPath: 'path/page1.html'
            },
            {
              destinationPath: 'path/page2.html'
            }
          ]
        }
      };
      const templateParameterBuilderSidebarNavigation = new TemplateParameterBuilderSidebarNavigation();

      expect(templateParameterBuilderSidebarNavigation.build('page', version, {})).toEqual({
        navigation: {
          currentPage: 'page',
          pages: {
            destinationPath: 'path/index.html',
            href: '/path',
            pages: [
              {
                destinationPath: 'path/page1.html',
                href: '/path/page1.html'
              },
              {
                destinationPath: 'path/page2.html',
                href: '/path/page2.html'
              }
            ]
          }
        }
      });
    });
  });
});
