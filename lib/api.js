/**
 * api.js
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
const BookComponentFactory = require('./BookComponentFactory');
const BookLoader = require('./BookLoader');
const BookWriter = require('./BookWriter');
const FileWriter = require('./FileWriter');
const JSMinifier = require('./JSMinifier');
const PageProcessorComposition = require('./PageProcessorComposition');
const PageProcessorMarkdown = require('./PageProcessorMarkdown');
const PageProcessorTemplate = require('./PageProcessorTemplate');
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

module.exports.AssetLoaderAppleTouchIcon = AssetLoaderAppleTouchIcon;
module.exports.AssetLoaderComposition = AssetLoaderComposition;
module.exports.AssetLoaderFavicon = AssetLoaderFavicon;
module.exports.AssetLoaderLogo = AssetLoaderLogo;
module.exports.AssetLoaderOpenGraphImage = AssetLoaderOpenGraphImage;
module.exports.AssetLoaderPinnedTabIcon = AssetLoaderPinnedTabIcon;
module.exports.AssetLoaderRollup = AssetLoaderRollup;
module.exports.AssetLoaderSass = AssetLoaderSass;
module.exports.AssetLoaderWebAppManifestIcon = AssetLoaderWebAppManifestIcon;
module.exports.BookComponentFactory = BookComponentFactory;
module.exports.BookLoader = BookLoader;
module.exports.BookWriter = BookWriter;
module.exports.FileWriter = FileWriter;
module.exports.JSMinifier = JSMinifier;
module.exports.PageProcessorComposition = PageProcessorComposition;
module.exports.PageProcessorMarkdown = PageProcessorMarkdown;
module.exports.PageProcessorTemplate = PageProcessorTemplate;
module.exports.TemplateParameterBuilderComposition = TemplateParameterBuilderComposition;
module.exports.TemplateParameterBuilderContent = TemplateParameterBuilderContent;
module.exports.TemplateParameterBuilderLanguageDropdown = TemplateParameterBuilderLanguageDropdown;
module.exports.TemplateParameterBuilderMeta = TemplateParameterBuilderMeta;
module.exports.TemplateParameterBuilderNavbarLink = TemplateParameterBuilderNavbarLink;
module.exports.TemplateParameterBuilderNavbarLogo = TemplateParameterBuilderNavbarLogo;
module.exports.TemplateParameterBuilderReleaseDropdown = TemplateParameterBuilderReleaseDropdown;
module.exports.TemplateParameterBuilderResource = TemplateParameterBuilderResource;
module.exports.TemplateParameterBuilderSidebarNavigation = TemplateParameterBuilderSidebarNavigation;
module.exports.TemplateParameterBuilderWebApplication = TemplateParameterBuilderWebApplication;
module.exports.VersionLoaderAsset = VersionLoaderAsset;
module.exports.VersionLoaderComposition = VersionLoaderComposition;
module.exports.VersionLoaderPageData = VersionLoaderPageData;
module.exports.VersionLoaderPageProcessor = VersionLoaderPageProcessor;
module.exports.VersionLoaderVersionFile = VersionLoaderVersionFile;
module.exports.VersionLoaderWebAppManifest = VersionLoaderWebAppManifest;
module.exports.componentFactory = new BookComponentFactory();
module.exports.load = (bookPath, options) => {
  const bookLoader = this.componentFactory.createBookLoader();

  return bookLoader.load(bookPath, options);
};
module.exports.write = (book, destinationPath) => {
  const bookWriter = this.componentFactory.createBookWriter();

  return bookWriter.write(book, destinationPath);
};
