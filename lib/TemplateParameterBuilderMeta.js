/**
 * TemplateParameterBuilderMeta.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const path = require('path');
const URL = require('url').URL;

module.exports = class TemplateParameterBuilderMeta {

  build(page, currentVersion, book) {
    const title = this.title(page, currentVersion, book);
    const description = this.description(page, currentVersion, book);
    const alternateLanguages = this.alternateLanguages(page, currentVersion, book);
    const openGraphURL = this.openGraphURL(page, currentVersion, book);
    const openGraphImagePath = this.openGraphImagePath(page, currentVersion, book);

    return {
      meta: {
        title,
        description,
        alternateLanguages,
        openGraph: {
          url: openGraphURL,
          title,
          description,
          imagePath: openGraphImagePath
        }
      }
    };
  }

  title(page, currentVersion, book) {
    let bookTitle = null;

    if (currentVersion.language && currentVersion.language.title) {
      bookTitle = currentVersion.language.title;
    } else if (book.manifest.title) {
      bookTitle = book.manifest.title;
    }

    const basename = path.basename(page.destinationPath);

    if (basename === 'index.html') {
      return bookTitle;
    } else {
      return `${page.title} - ${bookTitle}`;
    }
  }

  description(page) {
    return page.description ? page.description : null;
  }

  alternateLanguages(page, currentVersion, book) {
    const alternateLanguages = [];

    for (const version of book.versions) {
      const versionLanguage = version.language;
      const currentVersionLanguage = currentVersion.language;

      if (versionLanguage && currentVersionLanguage) {
        if (versionLanguage.path !== currentVersionLanguage.path) {
          if (version.release === currentVersion.release) {
            let relativePath;

            const basename = path.basename(page.destinationPath);

            if (basename === 'index.html') {
              relativePath = version.destinationPath;
            } else {
              relativePath = path.join(version.destinationPath, page.path);
            }

            const href = new URL(relativePath, book.manifest.baseURL).toString();

            alternateLanguages.push({
              hreflang: versionLanguage.path,
              href
            });
          }
        }
      }
    }

    return alternateLanguages;
  }

  openGraphURL(page, currentVersion, book) {
    const openGraphURL = new URL(page.destinationPath, book.manifest.baseURL).toString();

    return openGraphURL;
  }

  openGraphImagePath(page, currentVersion, book) {
    if (page.openGraphImage) {
      return page.openGraphImage;
    } else {
      let openGraphImagePath = null;

      const dirname = path.dirname(page.destinationPath);

      if (book.assets && book.assets.length) {
        for (const asset of book.assets) {
          if (asset.type === 'openGraphImage') {
            openGraphImagePath = path.relative(dirname, asset.destinationPath);
          }
        }
      }

      return openGraphImagePath;
    }
  }
};
