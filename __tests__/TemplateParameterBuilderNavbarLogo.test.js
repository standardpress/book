/**
 * TemplateParameterBuilderNavbarLogo.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const TemplateParameterBuilderNavbarLogo = require('../lib/TemplateParameterBuilderNavbarLogo');

describe('TemplateParameterBuilderNavbarLogo', () => {

  describe('build', () => {

    describe('imagePath', () => {

      it('returns navbar logo image path', () => {
        const page = {
          destinationPath: 'destination/path/page.html'
        };
        const book = {
          assets: [
            {
              type: 'logo',
              destinationPath: 'assets/logo.png'
            }
          ]
        };
        const templateParameterBuilderNavbarLogo = new TemplateParameterBuilderNavbarLogo();

        const parameters = templateParameterBuilderNavbarLogo.build(page, {}, book);

        expect(parameters.logo.imagePath).toEqual('../../assets/logo.png');
      });
    });

    describe('href', () => {

      it('returns navbar logo herf for root path', () => {
        const version = {
          destinationPath: '.'
        };
        const templateParameterBuilderNavbarLogo = new TemplateParameterBuilderNavbarLogo();

        const parameters = templateParameterBuilderNavbarLogo.build({}, version, {});

        expect(parameters.logo.href).toEqual('/');
      });

      it('returns navbar logo herf', () => {
        const version = {
          destinationPath: 'destination/path'
        };
        const templateParameterBuilderNavbarLogo = new TemplateParameterBuilderNavbarLogo();

        const parameters = templateParameterBuilderNavbarLogo.build({}, version, {});

        expect(parameters.logo.href).toEqual('/destination/path');
      });
    });

    describe('value', () => {

      it('returns navbar logo value', () => {
        const book = {
          manifest: {
            title: 'title'
          }
        };
        const templateParameterBuilderNavbarLogo = new TemplateParameterBuilderNavbarLogo();

        const parameters = templateParameterBuilderNavbarLogo.build({}, {}, book);

        expect(parameters.logo.value).toEqual('title');
      });

      it('returns navbar localized logo value', () => {
        const version = {
          language: {
            title: 'title'
          }
        };
        const templateParameterBuilderNavbarLogo = new TemplateParameterBuilderNavbarLogo();

        const parameters = templateParameterBuilderNavbarLogo.build({}, version, {});

        expect(parameters.logo.value).toEqual('title');
      });

      it('prefers localized logo value', () => {
        const version = {
          language: {
            title: 'localizedTitle'
          }
        };
        const book = {
          manifest: {
            title: 'title'
          }
        };
        const templateParameterBuilderNavbarLogo = new TemplateParameterBuilderNavbarLogo();

        const parameters = templateParameterBuilderNavbarLogo.build({}, version, book);

        expect(parameters.logo.value).toEqual('localizedTitle');
      });
    });

    it('returns navbar logo image path, href and value', () => {
      const page = {
        destinationPath: 'page/destination/path/page.html'
      };
      const version = {
        destinationPath: 'destination/path'
      };
      const book = {
        manifest: {
          title: 'title'
        },
        assets: [
          {
            type: 'logo',
            destinationPath: 'assets/logo.png'
          }
        ]
      };
      const templateParameterBuilderNavbarLogo = new TemplateParameterBuilderNavbarLogo();

      const parameters = templateParameterBuilderNavbarLogo.build(page, version, book);

      expect(parameters.logo.imagePath).toEqual('../../../assets/logo.png');
      expect(parameters.logo.href).toEqual('/destination/path');
      expect(parameters.logo.value).toEqual('title');
    });
  });
});
