/**
 * TemplateParameterBuilderLanguageDropdown.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const TemplateParameterBuilderLanguageDropdown = require('../lib/TemplateParameterBuilderLanguageDropdown');

describe('TemplateParameterBuilderLanguageDropdown', () => {

  describe('build', () => {

    it('returns null when there is one language', () => {
      const version = {
        destinationPath: 'destination/path',
        language: {
          name: 'ko'
        }
      };
      const book = {
        versions: [
          {
            destinationPath: 'destination/path',
            language: {
              name: 'ko'
            }
          }
        ]
      };
      const templateParameterBuilderLanguageDropdown = new TemplateParameterBuilderLanguageDropdown();

      expect(templateParameterBuilderLanguageDropdown.build({}, version, book)).toBeNull();
    });

    it('returns language dropdown', () => {
      const version = {
        destinationPath: '.',
        language: {
          name: 'ko'
        }
      };
      const book = {
        versions: [
          {
            destinationPath: '.',
            language: {
              name: 'ko'
            }
          },
          {
            destinationPath: 'destination/path',
            language: {
              name: 'en'
            }
          }
        ]
      };
      const templateParameterBuilderLanguageDropdown = new TemplateParameterBuilderLanguageDropdown();

      expect(templateParameterBuilderLanguageDropdown.build({}, version, book)).toEqual({
        languageDropdown: {
          currentLanguage: 'ko',
          languages: [
            {
              name: 'ko',
              href: '/'
            },
            {
              name: 'en',
              href: '/destination/path'
            }
          ]
        }
      });
    });

    it('returns language dropdown for same release', () => {
      const version = {
        destinationPath: '.',
        language: {
          name: 'ko'
        },
        release: '0.1.0'
      };
      const book = {
        versions: [
          {
            destinationPath: '.',
            language: {
              name: 'ko'
            },
            release: '0.1.0'
          },
          {
            destinationPath: '0.1.0/path',
            language: {
              name: 'en'
            },
            release: '0.1.0'
          },
          {
            destinationPath: '1.0.0/path',
            language: {
              name: 'ko'
            },
            release: '1.0.0'
          }
        ]
      };
      const templateParameterBuilderLanguageDropdown = new TemplateParameterBuilderLanguageDropdown();

      expect(templateParameterBuilderLanguageDropdown.build({}, version, book)).toEqual({
        languageDropdown: {
          currentLanguage: 'ko',
          languages: [
            {
              name: 'ko',
              href: '/'
            },
            {
              name: 'en',
              href: '/0.1.0/path'
            }
          ]
        }
      });
    });
  });
});
