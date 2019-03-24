/**
 * TemplateParameterBuilderResource.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const TemplateParameterBuilderResource = require('../lib/TemplateParameterBuilderResource');

describe('TemplateParameterBuilderResource', () => {

  describe('build', () => {

    it('returns stylesheets', () => {
      const page = {
        destinationPath: 'path/test.html'
      };
      const book = {
        assets: [
          {
            type: 'css',
            destinationPath: 'css/test.css'
          },
          {
            type: 'css',
            destinationPath: 'css/path/test.css'
          }
        ]
      };
      const templateParameterBuilderResource = new TemplateParameterBuilderResource();

      expect(templateParameterBuilderResource.build(page, {}, book)).toEqual({
        stylesheets: [
          '../css/test.css',
          '../css/path/test.css'
        ],
        scripts: []
      });
    });

    it('returns scripts', () => {
      const page = {
        destinationPath: 'path/test.html'
      };
      const book = {
        assets: [
          {
            type: 'js',
            destinationPath: 'js/test.js'
          },
          {
            type: 'js',
            destinationPath: 'js/path/test.js'
          }
        ]
      };
      const templateParameterBuilderResource = new TemplateParameterBuilderResource();

      expect(templateParameterBuilderResource.build(page, {}, book)).toEqual({
        stylesheets: [],
        scripts: [
          '../js/test.js',
          '../js/path/test.js'
        ]
      });
    });

    it('returns stylesheets and scripts', () => {
      const page = {
        destinationPath: 'path/test.html'
      };
      const book = {
        assets: [
          {
            type: 'css',
            destinationPath: 'css/test.css'
          },
          {
            type: 'css',
            destinationPath: 'css/path/test.css'
          },
          {
            type: 'js',
            destinationPath: 'js/test.js'
          },
          {
            type: 'js',
            destinationPath: 'js/path/test.js'
          }
        ]
      };
      const templateParameterBuilderResource = new TemplateParameterBuilderResource();

      expect(templateParameterBuilderResource.build(page, {}, book)).toEqual({
        stylesheets: [
          '../css/test.css',
          '../css/path/test.css'
        ],
        scripts: [
          '../js/test.js',
          '../js/path/test.js'
        ]
      });
    });
  });
});
