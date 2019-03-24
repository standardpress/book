/**
 * TemplateParameterBuilderReleaseDropdown.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

module.exports = class TemplateParameterBuilderReleaseDropdown {

  build(page, currentVersion, book) {
    const releases = [];

    if (book && book.versions && book.versions.length) {
      for (const version of book.versions) {
        let languagePath;
        let currentLanguagePath;

        if (version.language) {
          languagePath = version.language.path;
        }

        if (currentVersion.language) {
          currentLanguagePath = currentVersion.language.path;
        }

        if (languagePath === currentLanguagePath) {
          releases.push({
            name: version.release,
            href: `/${version.destinationPath === '.' ? '' : version.destinationPath}`
          });
        }
      }
    }

    if (currentVersion.release && releases.length > 1) {
      return {
        releaseDropdown: {
          currentRelease: currentVersion.release,
          releases
        }
      };
    } else {
      return null;
    }
  }
};
