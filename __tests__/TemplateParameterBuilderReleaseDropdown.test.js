/**
 * TemplateParameterBuilderReleaseDropdown.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const TemplateParameterBuilderReleaseDropdown = require('../lib/TemplateParameterBuilderReleaseDropdown');

describe('TemplateParameterBuilderReleaseDropdown', () => {

  describe('build', () => {

    it('returns null when there is no current release', () => {
      const templateParameterBuilderReleaseDropdown = new TemplateParameterBuilderReleaseDropdown();

      expect(templateParameterBuilderReleaseDropdown.build({}, {}, {})).toBeNull();
    });

    it('returns null when there is one release', () => {
      const version = {
        release: '0.1.0'
      };
      const manifest = {
        versions: [
          {
            release: '0.1.0'
          }
        ]
      };
      const templateParameterBuilderReleaseDropdown = new TemplateParameterBuilderReleaseDropdown();

      expect(templateParameterBuilderReleaseDropdown.build({}, version, manifest)).toBeNull();
    });

    it('returns release dropdown', () => {
      const version = {
        release: '0.1.0'
      };
      const manifest = {
        versions: [
          {
            destinationPath: '.',
            release: '0.1.0'
          },
          {
            destinationPath: 'destination/path',
            release: '1.0.0'
          }
        ]
      };
      const templateParameterBuilderReleaseDropdown = new TemplateParameterBuilderReleaseDropdown();

      expect(templateParameterBuilderReleaseDropdown.build({}, version, manifest)).toEqual({
        releaseDropdown: {
          currentRelease: '0.1.0',
          releases: [
            {
              name: '0.1.0',
              href: '/'
            },
            {
              name: '1.0.0',
              href: '/destination/path'
            }
          ]
        }
      });
    });

    it('returns release dropdown for same language', () => {
      const version = {
        language: {
          path: 'language1'
        },
        release: '0.1.0'
      };
      const manifest = {
        versions: [
          {
            destinationPath: '.',
            language: {
              path: 'language1'
            },
            release: '0.1.0'
          },
          {
            destinationPath: 'destination/path',
            language: {
              path: 'language1'
            },
            release: '1.0.0'
          },
          {
            destinationPath: 'destination/path/1',
            language: {
              path: 'language2'
            },
            release: '1.0.0'
          }
        ]
      };
      const templateParameterBuilderReleaseDropdown = new TemplateParameterBuilderReleaseDropdown();

      expect(templateParameterBuilderReleaseDropdown.build({}, version, manifest)).toEqual({
        releaseDropdown: {
          currentRelease: '0.1.0',
          releases: [
            {
              name: '0.1.0',
              href: '/'
            },
            {
              name: '1.0.0',
              href: '/destination/path'
            }
          ]
        }
      });
    });
  });
});
