/**
 * TemplateParameterBuilderLanguageDropdown.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

module.exports = class TemplateParameterBuilderLanguageDropdown {

  build(page, currentVersion, book) {
    const languages = [];

    for (const version of book.versions) {
      if (version.release === currentVersion.release) {
        if (version.language) {
          languages.push({
            name: version.language.name,
            href: `/${version.destinationPath === '.' ? '' : version.destinationPath}`
          });
        }
      }
    }

    if (currentVersion.language && languages.length > 1) {
      return {
        languageDropdown: {
          currentLanguage: currentVersion.language.name,
          languages
        }
      };
    } else {
      return null;
    }
  }
};
