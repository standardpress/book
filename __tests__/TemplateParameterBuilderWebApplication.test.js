/**
 * TemplateParameterBuilderWebApplication.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const TemplateParameterBuilderWebApplication = require('../lib/TemplateParameterBuilderWebApplication');

describe('TemplateParameterBuilderWebApplication', () => {

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
        assets: []
      };
    });

    describe('appleWebApplication', () => {

      it('returns book title when filename is index.html', () => {
        page.destinationPath = 'index.html';

        const templateParameterBuilderWebApplication = new TemplateParameterBuilderWebApplication();

        const parameters = templateParameterBuilderWebApplication.build(page, version, book);

        expect(parameters.appleWebApplication.title).toEqual('title');
      });

      it('returns page title when filename is not index.html', () => {
        page.title = 'pageTitle';

        const templateParameterBuilderWebApplication = new TemplateParameterBuilderWebApplication();

        const parameters = templateParameterBuilderWebApplication.build(page, version, book);

        expect(parameters.appleWebApplication.title).toEqual('pageTitle');
      });

      it('returns Apple touch icon path', () => {
        book.assets = [
          {
            type: 'appleTouchIcon',
            destinationPath: 'assets/apple_touch_icon.png'
          }
        ];

        const templateParameterBuilderWebApplication = new TemplateParameterBuilderWebApplication();

        const parameters = templateParameterBuilderWebApplication.build(page, version, book);

        expect(parameters.appleWebApplication.appleTouchIconPath).toMatch(/..\/..\/assets\/apple_touch_icon.png\?v=[A-Za-z0-9_-]{10}$/);
      });
    });

    describe('pinnedTabIcon', () => {

      it('returns pinned tab icon path', () => {
        book.assets = [
          {
            type: 'pinnedTabIcon',
            destinationPath: 'assets/pinned_tab_icon.svg'
          }
        ];

        const templateParameterBuilderWebApplication = new TemplateParameterBuilderWebApplication();

        const parameters = templateParameterBuilderWebApplication.build(page, version, book);

        expect(parameters.pinnedTabIcon.pinnedTabIconPath).toEqual('../../assets/pinned_tab_icon.svg');
      });

      it('returns pinned tab icon color', () => {
        book.manifest.pinnedTabIconColor = '#000000';

        const templateParameterBuilderWebApplication = new TemplateParameterBuilderWebApplication();

        const parameters = templateParameterBuilderWebApplication.build(page, version, book);

        expect(parameters.pinnedTabIcon.color).toEqual('#000000');
      });
    });

    describe('webAppManifestPath', () => {

      it('returns base web app manifest path', () => {
        book.assets = [
          {
            type: 'webAppManifest',
            destinationPath: 'manifest.json'
          }
        ];

        const templateParameterBuilderWebApplication = new TemplateParameterBuilderWebApplication();

        const parameters = templateParameterBuilderWebApplication.build(page, version, book);

        expect(parameters.webAppManifestPath).toEqual('../../manifest.json');
      });

      it('returns localized web app manifest path', () => {
        version.language = {
          path: 'ko'
        };
        book.assets = [
          {
            type: 'webAppManifest',
            destinationPath: 'manifest.json'
          },
          {
            type: 'webAppManifest/ko',
            destinationPath: 'manifest_ko.json'
          }
        ];

        const templateParameterBuilderWebApplication = new TemplateParameterBuilderWebApplication();

        const parameters = templateParameterBuilderWebApplication.build(page, version, book);

        expect(parameters.webAppManifestPath).toEqual('../../manifest_ko.json');
      });
    });
  });
});
