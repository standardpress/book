/**
 * TemplateParameterBuilderNavbarLink.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const TemplateParameterBuilderNavbarLink = require('../lib/TemplateParameterBuilderNavbarLink');

describe('TemplateParameterBuilderNavbarLink', () => {

  describe('build', () => {

    it('returns navbar links', () => {
      const book = {
        manifest: {
          links: [
            'link1',
            'link2'
          ]
        }
      };
      const templateParameterBuilderNavbarLink = new TemplateParameterBuilderNavbarLink();

      expect(templateParameterBuilderNavbarLink.build({}, {}, book)).toEqual({
        links: [
          'link1',
          'link2'
        ]
      });
    });

    it('returns navbar localized links', () => {
      const version = {
        language: {
          links: [
            'link1',
            'link2'
          ]
        }
      };
      const templateParameterBuilderNavbarLink = new TemplateParameterBuilderNavbarLink();

      expect(templateParameterBuilderNavbarLink.build({}, version, {})).toEqual({
        links: [
          'link1',
          'link2'
        ]
      });
    });

    it('prefers navbar localized links', () => {
      const version = {
        language: {
          links: [
            'localizedLink1',
            'localizedLink2'
          ]
        }
      };
      const book = {
        manifest: {
          links: [
            'link1',
            'link2'
          ]
        }
      };
      const templateParameterBuilderNavbarLink = new TemplateParameterBuilderNavbarLink();

      expect(templateParameterBuilderNavbarLink.build({}, version, book)).toEqual({
        links: [
          'localizedLink1',
          'localizedLink2'
        ]
      });
    });
  });
});
