/**
 * BookComponentFactory.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const AssetLoaderAppleTouchIcon = require('./AssetLoaderAppleTouchIcon');
const AssetLoaderComposition = require('./AssetLoaderComposition');
const AssetLoaderFavicon = require('./AssetLoaderFavicon');
const AssetLoaderLogo = require('./AssetLoaderLogo');
const AssetLoaderOpenGraphImage = require('./AssetLoaderOpenGraphImage');
const AssetLoaderPinnedTabIcon = require('./AssetLoaderPinnedTabIcon');
const AssetLoaderRollup = require('./AssetLoaderRollup');
const AssetLoaderSass = require('./AssetLoaderSass');
const AssetLoaderWebAppManifestIcon = require('./AssetLoaderWebAppManifestIcon');
const BookLoader = require('./BookLoader');
const BookWriter = require('./BookWriter');
const FileWriter = require('./FileWriter');
const JSMinifier = require('./JSMinifier');
const PageProcessorComposition = require('./PageProcessorComposition');
const PageProcessorMarkdown = require('./PageProcessorMarkdown');
const PageProcessorTemplate = require('./PageProcessorTemplate');
const path = require('path');
const TemplateParameterBuilderComposition = require('./TemplateParameterBuilderComposition');
const TemplateParameterBuilderContent = require('./TemplateParameterBuilderContent');
const TemplateParameterBuilderLanguageDropdown = require('./TemplateParameterBuilderLanguageDropdown');
const TemplateParameterBuilderMeta = require('./TemplateParameterBuilderMeta');
const TemplateParameterBuilderNavbarLink = require('./TemplateParameterBuilderNavbarLink');
const TemplateParameterBuilderNavbarLogo = require('./TemplateParameterBuilderNavbarLogo');
const TemplateParameterBuilderReleaseDropdown = require('./TemplateParameterBuilderReleaseDropdown');
const TemplateParameterBuilderResource = require('./TemplateParameterBuilderResource');
const TemplateParameterBuilderSidebarNavigation = require('./TemplateParameterBuilderSidebarNavigation');
const TemplateParameterBuilderWebApplication = require('./TemplateParameterBuilderWebApplication');
const VersionLoaderAsset = require('./VersionLoaderAsset');
const VersionLoaderComposition = require('./VersionLoaderComposition');
const VersionLoaderPageData = require('./VersionLoaderPageData');
const VersionLoaderPageProcessor = require('./VersionLoaderPageProcessor');
const VersionLoaderVersionFile = require('./VersionLoaderVersionFile');
const VersionLoaderWebAppManifest = require('./VersionLoaderWebAppManifest');

module.exports = class BookComponentFactory {

  createAssetLoader() {
    const assetLoaderAppleTouchIcon = new AssetLoaderAppleTouchIcon();
    const assetLoaderFavicon = new AssetLoaderFavicon();
    const assetLoaderLogo = new AssetLoaderLogo();
    const assetLoaderOpenGraphImage = new AssetLoaderOpenGraphImage();
    const assetLoaderPinnedTabIcon = new AssetLoaderPinnedTabIcon();
    const camoJSFilePath = path.join(__dirname, '../node_modules/@usecamo/camo/js/index.js');
    const inputOptions = {
      input: camoJSFilePath
    };
    const outputOptions = {
      format: 'cjs'
    };
    const jsMinifier = new JSMinifier();
    const assetLoaderCamoJS = new AssetLoaderRollup('camo', inputOptions, outputOptions, jsMinifier);
    const nodeModulesPath = path.join(__dirname, '../node_modules');
    const camoSassFilePath = path.join(__dirname, '../node_modules/@usecamo/camo/scss/camo.scss');
    const camoSassRenderOptions = {
      file: camoSassFilePath,
      includePaths: [
        nodeModulesPath
      ],
      outputStyle: 'compressed'
    };
    const bookSassFilePath = path.join(__dirname, '../template/book.scss');
    const bookSassRenderOptions = {
      file: bookSassFilePath,
      includePaths: [
        nodeModulesPath
      ],
      outputStyle: 'compressed'
    };
    const assetLoaderCamoSass = new AssetLoaderSass('camo', camoSassRenderOptions);
    const assetLoaderBookSass = new AssetLoaderSass('book', bookSassRenderOptions);
    const assetLoaderWebAppManifestIcon = new AssetLoaderWebAppManifestIcon();
    const assetLoader = new AssetLoaderComposition([
      assetLoaderAppleTouchIcon,
      assetLoaderFavicon,
      assetLoaderLogo,
      assetLoaderOpenGraphImage,
      assetLoaderPinnedTabIcon,
      assetLoaderCamoJS,
      assetLoaderCamoSass,
      assetLoaderBookSass,
      assetLoaderWebAppManifestIcon
    ]);

    return assetLoader;
  }

  createVersionLoader() {
    const versionLoaderVersionFile = new VersionLoaderVersionFile();
    const versionLoaderAsset = new VersionLoaderAsset();
    const versionLoaderWebAppManifest = new VersionLoaderWebAppManifest();
    const versionLoaderPageData = new VersionLoaderPageData();
    const pageProcessorMarkdown = new PageProcessorMarkdown();
    const pageProcessor = new PageProcessorComposition([
      pageProcessorMarkdown
    ]);
    const versionLoaderPageProcessor = new VersionLoaderPageProcessor(pageProcessor);
    const templateParameterBuilderContent = new TemplateParameterBuilderContent();
    const templateParameterBuilderLanguageDropdown = new TemplateParameterBuilderLanguageDropdown();
    const templateParameterBuilderMeta = new TemplateParameterBuilderMeta();
    const templateParameterBuilderNavbarLink = new TemplateParameterBuilderNavbarLink();
    const templateParameterBuilderNavbarLogo = new TemplateParameterBuilderNavbarLogo();
    const templateParameterBuilderReleaseDropdown = new TemplateParameterBuilderReleaseDropdown();
    const templateParameterBuilderResource = new TemplateParameterBuilderResource();
    const templateParameterBuilderSidebarNavigation = new TemplateParameterBuilderSidebarNavigation();
    const templateParameterBuilderWebApplication = new TemplateParameterBuilderWebApplication();
    const templateParameterBuilder = new TemplateParameterBuilderComposition([
      templateParameterBuilderContent,
      templateParameterBuilderLanguageDropdown,
      templateParameterBuilderMeta,
      templateParameterBuilderNavbarLink,
      templateParameterBuilderNavbarLogo,
      templateParameterBuilderReleaseDropdown,
      templateParameterBuilderResource,
      templateParameterBuilderSidebarNavigation,
      templateParameterBuilderWebApplication
    ]);
    const pageProcessorTemplate = new PageProcessorTemplate(templateParameterBuilder);
    const pagePostProcessor = new PageProcessorComposition([
      pageProcessorTemplate
    ]);
    const versionLoaderPagePostProcessor = new VersionLoaderPageProcessor(pagePostProcessor);
    const versionLoader = new VersionLoaderComposition([
      versionLoaderVersionFile,
      versionLoaderAsset,
      versionLoaderWebAppManifest,
      versionLoaderPageData,
      versionLoaderPageProcessor,
      versionLoaderPagePostProcessor
    ]);

    return versionLoader;
  }

  createBookLoader() {
    const assetLoader = this.createAssetLoader();
    const versionLoader = this.createVersionLoader();
    const bookLoader = new BookLoader(
      assetLoader,
      versionLoader
    );

    return bookLoader;
  }

  createBookWriter() {
    const fileWriter = new FileWriter();
    const bookWriter = new BookWriter(fileWriter);

    return bookWriter;
  }
};
