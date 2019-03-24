/**
 * TemplateParameterBuilderMeta.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const TemplateParameterBuilderMeta = require('../lib/TemplateParameterBuilderMeta');

describe('TemplateParameterBuilderMeta', () => {

  describe('build', () => {

    let page;
    let version;
    let book;

    beforeEach(() => {
      page = {
        destinationPath: 'path/version/page.html'
      };
      version = {
        destinationPath: 'path/version'
      };
      book = {
        manifest: {
          baseURL: 'https://test.com',
          title: 'title'
        },
        versions: []
      };
    });

    describe('title', () => {

      it('returns only book title when filename is index.html', () => {
        page.destinationPath = 'path/version/index.html';

        const templateParameterBuilderMeta = new TemplateParameterBuilderMeta();

        const parameters = templateParameterBuilderMeta.build(page, version, book);

        expect(parameters.meta.title).toEqual('title');
        expect(parameters.meta.openGraph.title).toEqual('title');
      });

      it('returns page title and book title', () => {
        page.title = 'pageTitle';

        const templateParameterBuilderMeta = new TemplateParameterBuilderMeta();

        const parameters = templateParameterBuilderMeta.build(page, version, book);

        expect(parameters.meta.title).toEqual('pageTitle - title');
        expect(parameters.meta.openGraph.title).toEqual('pageTitle - title');
      });

      it('returns page title and localized book title', () => {
        page.title = 'pageTitle';
        version.language = {
          title: 'localizedTitle'
        };

        const templateParameterBuilderMeta = new TemplateParameterBuilderMeta();

        const parameters = templateParameterBuilderMeta.build(page, version, book);

        expect(parameters.meta.title).toEqual('pageTitle - localizedTitle');
        expect(parameters.meta.openGraph.title).toEqual('pageTitle - localizedTitle');
      });
    });

    describe('description', () => {

      it('returns description', () => {
        page.description = 'description';

        const templateParameterBuilderMeta = new TemplateParameterBuilderMeta();

        const parameters = templateParameterBuilderMeta.build(page, version, book);

        expect(parameters.meta.description).toEqual('description');
        expect(parameters.meta.openGraph.description).toEqual('description');
      });

      it('returns null when there is no description', () => {
        const templateParameterBuilderMeta = new TemplateParameterBuilderMeta();

        const parameters = templateParameterBuilderMeta.build(page, version, book);

        expect(parameters.meta.description).toBeNull();
        expect(parameters.meta.openGraph.description).toBeNull();
      });
    });

    describe('alternateLanguages', () => {

      it('returns alternate languages with root path when filename is index.html', () => {
        page.destinationPath = 'path/version/index.html';
        version.language = {
          path: 'ko'
        };
        book.versions = [
          {
            language: {
              path: 'ko'
            }
          },
          {
            destinationPath: 'path/en',
            language: {
              path: 'en'
            }
          },
          {
            destinationPath: 'path/th',
            language: {
              path: 'th'
            }
          }
        ];

        const templateParameterBuilderMeta = new TemplateParameterBuilderMeta();

        const parameters = templateParameterBuilderMeta.build(page, version, book);

        expect(parameters.meta.alternateLanguages).toEqual([
          {
            hreflang: 'en',
            href: 'https://test.com/path/en'
          },
          {
            hreflang: 'th',
            href: 'https://test.com/path/th'
          }
        ]);
      });

      it('returns alternate languages without release', () => {
        page.path = 'page.html';
        version.language = {
          path: 'ko'
        };
        book.versions = [
          {
            language: {
              path: 'ko'
            }
          },
          {
            destinationPath: 'path/en',
            language: {
              path: 'en'
            }
          },
          {
            destinationPath: 'path/th',
            language: {
              path: 'th'
            }
          }
        ];

        const templateParameterBuilderMeta = new TemplateParameterBuilderMeta();

        const parameters = templateParameterBuilderMeta.build(page, version, book);

        expect(parameters.meta.alternateLanguages).toEqual([
          {
            hreflang: 'en',
            href: 'https://test.com/path/en/page.html'
          },
          {
            hreflang: 'th',
            href: 'https://test.com/path/th/page.html'
          }
        ]);
      });

      it('returns alternate languages with release', () => {
        page.path = 'page.html';
        version.language = {
          path: 'ko'
        };
        version.release = '0.1.0';
        book.versions = [
          {
            language: {
              path: 'ko'
            }
          },
          {
            destinationPath: 'path/en/0.1.0',
            language: {
              path: 'en'
            },
            release: '0.1.0'
          },
          {
            language: {
              path: 'th'
            }
          }
        ];

        const templateParameterBuilderMeta = new TemplateParameterBuilderMeta();

        const parameters = templateParameterBuilderMeta.build(page, version, book);

        expect(parameters.meta.alternateLanguages).toEqual([
          {
            hreflang: 'en',
            href: 'https://test.com/path/en/0.1.0/page.html'
          }
        ]);
      });
    });

    describe('openGraphURL', () => {

      it('returns open graph URL', () => {
        const templateParameterBuilderMeta = new TemplateParameterBuilderMeta();

        const parameters = templateParameterBuilderMeta.build(page, version, book);

        expect(parameters.meta.openGraph.url).toEqual('https://test.com/path/version/page.html');
      });
    });

    describe('openGraphImagePath', () => {

      it('returns open graph image from assets', () => {
        book.assets = [
          {
            type: 'openGraphImage',
            destinationPath: 'assets/open_graph_image.png'
          }
        ];

        const templateParameterBuilderMeta = new TemplateParameterBuilderMeta();

        const parameters = templateParameterBuilderMeta.build(page, version, book);

        expect(parameters.meta.openGraph.imagePath).toEqual('../../assets/open_graph_image.png');
      });

      it('prefers page open graph image', () => {
        page.openGraphImage = '../../assets/open_graph_image.png';
        book.assets = [
          {
            type: 'openGraphImage'
          }
        ];

        const templateParameterBuilderMeta = new TemplateParameterBuilderMeta();

        const parameters = templateParameterBuilderMeta.build(page, version, book);

        expect(parameters.meta.openGraph.imagePath).toEqual('../../assets/open_graph_image.png');
      });
    });
  });
});
