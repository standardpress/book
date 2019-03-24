/**
 * api.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const AssetLoaderAppleTouchIcon = require('../lib/AssetLoaderAppleTouchIcon');
const AssetLoaderComposition = require('../lib/AssetLoaderComposition');
const AssetLoaderFavicon = require('../lib/AssetLoaderFavicon');
const AssetLoaderLogo = require('../lib/AssetLoaderLogo');
const AssetLoaderOpenGraphImage = require('../lib/AssetLoaderOpenGraphImage');
const AssetLoaderPinnedTabIcon = require('../lib/AssetLoaderPinnedTabIcon');
const AssetLoaderRollup = require('../lib/AssetLoaderRollup');
const AssetLoaderSass = require('../lib/AssetLoaderSass');
const AssetLoaderWebAppManifestIcon = require('../lib/AssetLoaderWebAppManifestIcon');
const BookComponentFactory = require('../lib/BookComponentFactory');
const BookLoader = require('../lib/BookLoader');
const BookWriter = require('../lib/BookWriter');
const FileWriter = require('../lib/FileWriter');
const JSMinifier = require('../lib/JSMinifier');
const PageProcessorComposition = require('../lib/PageProcessorComposition');
const PageProcessorMarkdown = require('../lib/PageProcessorMarkdown');
const PageProcessorTemplate = require('../lib/PageProcessorTemplate');
const TemplateParameterBuilderComposition = require('../lib/TemplateParameterBuilderComposition');
const TemplateParameterBuilderContent = require('../lib/TemplateParameterBuilderContent');
const TemplateParameterBuilderLanguageDropdown = require('../lib/TemplateParameterBuilderLanguageDropdown');
const TemplateParameterBuilderMeta = require('../lib/TemplateParameterBuilderMeta');
const TemplateParameterBuilderNavbarLink = require('../lib/TemplateParameterBuilderNavbarLink');
const TemplateParameterBuilderNavbarLogo = require('../lib/TemplateParameterBuilderNavbarLogo');
const TemplateParameterBuilderReleaseDropdown = require('../lib/TemplateParameterBuilderReleaseDropdown');
const TemplateParameterBuilderResource = require('../lib/TemplateParameterBuilderResource');
const TemplateParameterBuilderSidebarNavigation = require('../lib/TemplateParameterBuilderSidebarNavigation');
const TemplateParameterBuilderWebApplication = require('../lib/TemplateParameterBuilderWebApplication');
const VersionLoaderAsset = require('../lib/VersionLoaderAsset');
const VersionLoaderComposition = require('../lib/VersionLoaderComposition');
const VersionLoaderPageData = require('../lib/VersionLoaderPageData');
const VersionLoaderPageProcessor = require('../lib/VersionLoaderPageProcessor');
const VersionLoaderVersionFile = require('../lib/VersionLoaderVersionFile');
const VersionLoaderWebAppManifest = require('../lib/VersionLoaderWebAppManifest');

describe('api', () => {

  let book;

  beforeEach(() => {
    book = require('../lib/api');
  });

  it('exports classes', () => {
    expect(book.AssetLoaderAppleTouchIcon).toEqual(AssetLoaderAppleTouchIcon);
    expect(book.AssetLoaderComposition).toEqual(AssetLoaderComposition);
    expect(book.AssetLoaderFavicon).toEqual(AssetLoaderFavicon);
    expect(book.AssetLoaderLogo).toEqual(AssetLoaderLogo);
    expect(book.AssetLoaderOpenGraphImage).toEqual(AssetLoaderOpenGraphImage);
    expect(book.AssetLoaderPinnedTabIcon).toEqual(AssetLoaderPinnedTabIcon);
    expect(book.AssetLoaderRollup).toEqual(AssetLoaderRollup);
    expect(book.AssetLoaderSass).toEqual(AssetLoaderSass);
    expect(book.AssetLoaderWebAppManifestIcon).toEqual(AssetLoaderWebAppManifestIcon);
    expect(book.BookComponentFactory).toEqual(BookComponentFactory);
    expect(book.BookLoader).toEqual(BookLoader);
    expect(book.BookWriter).toEqual(BookWriter);
    expect(book.FileWriter).toEqual(FileWriter);
    expect(book.JSMinifier).toEqual(JSMinifier);
    expect(book.PageProcessorComposition).toEqual(PageProcessorComposition);
    expect(book.PageProcessorMarkdown).toEqual(PageProcessorMarkdown);
    expect(book.PageProcessorTemplate).toEqual(PageProcessorTemplate);
    expect(book.TemplateParameterBuilderComposition).toEqual(TemplateParameterBuilderComposition);
    expect(book.TemplateParameterBuilderContent).toEqual(TemplateParameterBuilderContent);
    expect(book.TemplateParameterBuilderLanguageDropdown).toEqual(TemplateParameterBuilderLanguageDropdown);
    expect(book.TemplateParameterBuilderMeta).toEqual(TemplateParameterBuilderMeta);
    expect(book.TemplateParameterBuilderNavbarLink).toEqual(TemplateParameterBuilderNavbarLink);
    expect(book.TemplateParameterBuilderNavbarLogo).toEqual(TemplateParameterBuilderNavbarLogo);
    expect(book.TemplateParameterBuilderReleaseDropdown).toEqual(TemplateParameterBuilderReleaseDropdown);
    expect(book.TemplateParameterBuilderResource).toEqual(TemplateParameterBuilderResource);
    expect(book.TemplateParameterBuilderSidebarNavigation).toEqual(TemplateParameterBuilderSidebarNavigation);
    expect(book.TemplateParameterBuilderWebApplication).toEqual(TemplateParameterBuilderWebApplication);
    expect(book.VersionLoaderAsset).toEqual(VersionLoaderAsset);
    expect(book.VersionLoaderComposition).toEqual(VersionLoaderComposition);
    expect(book.VersionLoaderPageData).toEqual(VersionLoaderPageData);
    expect(book.VersionLoaderPageProcessor).toEqual(VersionLoaderPageProcessor);
    expect(book.VersionLoaderVersionFile).toEqual(VersionLoaderVersionFile);
    expect(book.VersionLoaderWebAppManifest).toEqual(VersionLoaderWebAppManifest);
  });

  describe('componentFactory', () => {

    it('is BookComponentFactory by default', () => {
      expect(book.componentFactory).toBeInstanceOf(BookComponentFactory);
    });
  });

  describe('load', () => {

    it('loads book with book loader from component factory', () => {
      const bookLoader = {
        load: jest.fn(() => new Promise(resolve => {
          resolve('book');
        }))
      };

      book.componentFactory = {
        createBookLoader: () => bookLoader
      };

      return book.load('book/path', 'options')
      .then(() => {
        expect(bookLoader.load).toHaveBeenCalledTimes(1);
        expect(bookLoader.load).toHaveBeenCalledWith('book/path', 'options');
      });
    });
  });

  describe('write', () => {

    it('writes book with book writer from component factory', () => {
      const bookWriter = {
        write: jest.fn(() => new Promise(resolve => {
          resolve();
        }))
      };

      book.componentFactory = {
        createBookWriter: () => bookWriter
      };

      return book.write('book', 'book/path')
      .then(() => {
        expect(bookWriter.write).toHaveBeenCalledTimes(1);
        expect(bookWriter.write).toHaveBeenCalledWith('book', 'book/path');
      });
    });
  });
});
