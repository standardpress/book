/**
 * VersionLoaderWebAppManifest.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const path = require('path');

module.exports = class VersionLoaderWebAppManifest {

  load(version, book) {
    return new Promise(resolve => {
      const destinationPath = '.';

      let icon192DestinationPath;
      let icon512DestinationPath;

      for (const asset of book.assets) {
        if (asset.type === 'webAppManifestIcon192') {
          icon192DestinationPath = path.relative(destinationPath, asset.destinationPath);
        } else if (asset.type === 'webAppManifestIcon512') {
          icon512DestinationPath = path.relative(destinationPath, asset.destinationPath);
        }
      }

      if (!(icon192DestinationPath && icon512DestinationPath)) {
        resolve();

        return;
      }

      const webAppManifest = this.webAppManifest(book.manifest.title, icon192DestinationPath, icon512DestinationPath);
      const webAppManifestJSON = JSON.stringify(webAppManifest);

      book.assets.push({
        type: 'webAppManifest',
        destinationPath: 'manifest.json',
        data: webAppManifestJSON
      });

      if (book.manifest.languages && book.manifest.languages.length) {
        for (const language of book.manifest.languages) {
          if (language.title) {
            const localizedWebAppManifest = this.webAppManifest(language.title, icon192DestinationPath, icon512DestinationPath);
            const localizedWebAppManifestJSON = JSON.stringify(localizedWebAppManifest);

            book.assets.push({
              type: `webAppManifest/${language.path}`,
              destinationPath: `manifest_${language.path}.json`,
              data: localizedWebAppManifestJSON
            });
          }
        }
      }

      resolve();
    });
  }

  webAppManifest(name, icon192DestinationPath, icon512DestinationPath) {
    return {
      name,
      icons: [
        {
          src: icon192DestinationPath,
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: icon512DestinationPath,
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    };
  }
};
