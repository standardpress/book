/**
 * BookComponentFactory.test.js
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
const path = require('path');
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

describe('BookComponentFactory', () => {

  const bookComponentFactory = new BookComponentFactory();

  describe('createAssetLoader', () => {

    it('creates AssetLoader', () => {
      const nodeModulesPath = path.join(__dirname, '../node_modules');
      const camoSassFilePath = path.join(__dirname, '../node_modules/@usecamo/camo/scss/camo.scss');
      const bookSassFilePath = path.join(__dirname, '../template/book.scss');
      const camoJSFilePath = path.join(__dirname, '../node_modules/@usecamo/camo/js/index.js');
      const assetLoader = bookComponentFactory.createAssetLoader();

      expect(assetLoader).toBeInstanceOf(AssetLoaderComposition);
      expect(assetLoader.assetLoaders).toHaveLength(9);
      expect(assetLoader.assetLoaders[0]).toBeInstanceOf(AssetLoaderAppleTouchIcon);
      expect(assetLoader.assetLoaders[1]).toBeInstanceOf(AssetLoaderFavicon);
      expect(assetLoader.assetLoaders[2]).toBeInstanceOf(AssetLoaderLogo);
      expect(assetLoader.assetLoaders[3]).toBeInstanceOf(AssetLoaderOpenGraphImage);
      expect(assetLoader.assetLoaders[4]).toBeInstanceOf(AssetLoaderPinnedTabIcon);
      expect(assetLoader.assetLoaders[5]).toBeInstanceOf(AssetLoaderRollup);
      expect(assetLoader.assetLoaders[5].name).toEqual('camo');
      expect(assetLoader.assetLoaders[5].inputOptions).toEqual({
        input: camoJSFilePath
      });
      expect(assetLoader.assetLoaders[5].outputOptions).toEqual({
        format: 'cjs'
      });
      expect(assetLoader.assetLoaders[5].jsMinifier).toBeInstanceOf(JSMinifier);
      expect(assetLoader.assetLoaders[6]).toBeInstanceOf(AssetLoaderSass);
      expect(assetLoader.assetLoaders[6].name).toEqual('camo');
      expect(assetLoader.assetLoaders[6].renderOptions).toEqual({
        file: camoSassFilePath,
        includePaths: [
          nodeModulesPath
        ],
        outputStyle: 'compressed'
      });
      expect(assetLoader.assetLoaders[7]).toBeInstanceOf(AssetLoaderSass);
      expect(assetLoader.assetLoaders[7].name).toEqual('book');
      expect(assetLoader.assetLoaders[7].renderOptions).toEqual({
        file: bookSassFilePath,
        includePaths: [
          nodeModulesPath
        ],
        outputStyle: 'compressed'
      });
      expect(assetLoader.assetLoaders[8]).toBeInstanceOf(AssetLoaderWebAppManifestIcon);
    });
  });

  describe('createVersionLoader', () => {

    it('creates VersionLoader', () => {
      const versionLoader = bookComponentFactory.createVersionLoader();

      expect(versionLoader).toBeInstanceOf(VersionLoaderComposition);
      expect(versionLoader.versionLoaders).toHaveLength(6);
      expect(versionLoader.versionLoaders[0]).toBeInstanceOf(VersionLoaderVersionFile);
      expect(versionLoader.versionLoaders[1]).toBeInstanceOf(VersionLoaderAsset);
      expect(versionLoader.versionLoaders[2]).toBeInstanceOf(VersionLoaderWebAppManifest);
      expect(versionLoader.versionLoaders[3]).toBeInstanceOf(VersionLoaderPageData);
      expect(versionLoader.versionLoaders[4]).toBeInstanceOf(VersionLoaderPageProcessor);
      expect(versionLoader.versionLoaders[4].pageProcessor).toBeInstanceOf(PageProcessorComposition);
      expect(versionLoader.versionLoaders[4].pageProcessor.pageProcessors).toHaveLength(1);
      expect(versionLoader.versionLoaders[4].pageProcessor.pageProcessors[0]).toBeInstanceOf(PageProcessorMarkdown);
      expect(versionLoader.versionLoaders[5]).toBeInstanceOf(VersionLoaderPageProcessor);
      expect(versionLoader.versionLoaders[5].pageProcessor).toBeInstanceOf(PageProcessorComposition);
      expect(versionLoader.versionLoaders[5].pageProcessor.pageProcessors).toHaveLength(1);
      expect(versionLoader.versionLoaders[5].pageProcessor.pageProcessors[0]).toBeInstanceOf(PageProcessorTemplate);

      const templateParameterBuilder = versionLoader.versionLoaders[5].pageProcessor.pageProcessors[0].templateParameterBuilder;

      expect(templateParameterBuilder).toBeInstanceOf(TemplateParameterBuilderComposition);
      expect(templateParameterBuilder.templateParameterBuilders).toHaveLength(9);
      expect(templateParameterBuilder.templateParameterBuilders[0]).toBeInstanceOf(TemplateParameterBuilderContent);
      expect(templateParameterBuilder.templateParameterBuilders[1]).toBeInstanceOf(TemplateParameterBuilderLanguageDropdown);
      expect(templateParameterBuilder.templateParameterBuilders[2]).toBeInstanceOf(TemplateParameterBuilderMeta);
      expect(templateParameterBuilder.templateParameterBuilders[3]).toBeInstanceOf(TemplateParameterBuilderNavbarLink);
      expect(templateParameterBuilder.templateParameterBuilders[4]).toBeInstanceOf(TemplateParameterBuilderNavbarLogo);
      expect(templateParameterBuilder.templateParameterBuilders[5]).toBeInstanceOf(TemplateParameterBuilderReleaseDropdown);
      expect(templateParameterBuilder.templateParameterBuilders[6]).toBeInstanceOf(TemplateParameterBuilderResource);
      expect(templateParameterBuilder.templateParameterBuilders[7]).toBeInstanceOf(TemplateParameterBuilderSidebarNavigation);
      expect(templateParameterBuilder.templateParameterBuilders[8]).toBeInstanceOf(TemplateParameterBuilderWebApplication);
    });
  });

  describe('createBookLoader', () => {

    it('creates BookLoader', () => {
      const bookLoader = bookComponentFactory.createBookLoader();

      expect(bookLoader).toBeInstanceOf(BookLoader);
      expect(bookLoader.assetLoader).toBeInstanceOf(AssetLoaderComposition);
      expect(bookLoader.versionLoader).toBeInstanceOf(VersionLoaderComposition);
    });
  });

  describe('createBookWriter', () => {

    it('creates BookWriter', () => {
      const bookWriter = bookComponentFactory.createBookWriter();

      expect(bookWriter).toBeInstanceOf(BookWriter);
      expect(bookWriter.writer).toBeInstanceOf(FileWriter);
    });
  });
});
