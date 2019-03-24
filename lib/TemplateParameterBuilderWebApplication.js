/**
 * TemplateParameterBuilderWebApplication.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const nanoid = require('nanoid');
const path = require('path');

module.exports = class TemplateParameterBuilderWebApplication {

  build(page, currentVersion, book) {
    const appleWebApplication = this.appleWebApplication(page, currentVersion, book);
    const pinnedTabIcon = this.pinnedTabIcon(page, currentVersion, book);
    const webAppManifestPath = this.webAppManifestPath(page, currentVersion, book);

    return {
      appleWebApplication,
      pinnedTabIcon,
      webAppManifestPath
    };
  }

  appleWebApplication(page, currentVersion, book) {
    let bookTitle = null;

    if (currentVersion.language && currentVersion.language.title) {
      bookTitle = currentVersion.language.title;
    } else if (book.manifest.title) {
      bookTitle = book.manifest.title;
    }

    let title = null;

    const basename = path.basename(page.destinationPath);

    if (basename === 'index.html') {
      title = bookTitle;
    } else {
      title = page.title;
    }

    let appleTouchIconPath = null;

    const dirname = path.dirname(page.destinationPath);

    for (const asset of book.assets) {
      if (asset.type === 'appleTouchIcon') {
        const destinationPath = path.relative(dirname, asset.destinationPath);

        appleTouchIconPath = `${destinationPath}?v=${nanoid(10)}`;
      }
    }

    return {
      title,
      appleTouchIconPath
    };
  }

  pinnedTabIcon(page, currentVersion, book) {
    let pinnedTabIconPath = null;

    const dirname = path.dirname(page.destinationPath);

    for (const asset of book.assets) {
      if (asset.type === 'pinnedTabIcon') {
        pinnedTabIconPath = path.relative(dirname, asset.destinationPath);
      }
    }

    const color = book.manifest.pinnedTabIconColor ? book.manifest.pinnedTabIconColor : null;

    return {
      pinnedTabIconPath,
      color
    };
  }

  webAppManifestPath(page, currentVersion, book) {
    let webAppManifestPath = null;
    let localizedWebAppManifestPath = null;

    const dirname = path.dirname(page.destinationPath);

    for (const asset of book.assets) {
      if (asset.type === 'webAppManifest') {
        webAppManifestPath = path.relative(dirname, asset.destinationPath);
      } else if (currentVersion.language && asset.type === `webAppManifest/${currentVersion.language.path}`) {
        localizedWebAppManifestPath = path.relative(dirname, asset.destinationPath);
      }
    }

    return localizedWebAppManifestPath ? localizedWebAppManifestPath : webAppManifestPath;
  }
};
