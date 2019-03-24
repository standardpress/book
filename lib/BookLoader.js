/**
 * BookLoader.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const jsonfile = require('jsonfile');
const path = require('path');

module.exports = class BookLoader {

  constructor(assetLoader, versionLoader) {
    this.assetLoader = assetLoader;
    this.versionLoader = versionLoader;
  }

  load(bookPath, options) {
    const book = {};

    return this.loadManifest(bookPath, options)
    .then(manifest => {
      book.manifest = manifest;
      book.versions = this.versions(manifest);
    })
    .then(() => {
      return this.assetLoader.load(bookPath)
      .then(assets => {
        book.assets = assets;
      });
    })
    .then(() => {
      return Promise.all(book.versions.map(version => {
        return new Promise((resolve, reject) => {
          this.versionLoader.load(version, book)
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
        });
      }))
      .then(() => book);
    });
  }

  loadManifest(bookPath, options) {
    const manifestFilePath = path.join(bookPath, 'book.json');

    return jsonfile.readFile(manifestFilePath)
    .then(manifest => {
      if (options && options.baseURL) {
        manifest.baseURL = options.baseURL;
      }

      return manifest;
    });
  }

  versions(manifest) {
    let versions = [];

    if (manifest.languages && manifest.languages.length) {
      manifest.languages.forEach(language => {
        versions.push({
          path: language.path,
          language
        });
      });
    } else {
      versions.push({
        path: '.'
      });
    }

    if (manifest.releases && manifest.releases.length) {
      const extendedVersions = [];

      versions.forEach(version => {
        manifest.releases.forEach(release => {
          const extendedVersion = Object.assign({}, version);
          const extendedVersionPath = path.join(version.path, release);

          extendedVersion.path = extendedVersionPath;
          extendedVersion.release = release;
          extendedVersions.push(extendedVersion);
        });
      });

      versions = extendedVersions;
    }

    let primaryLanguage;
    let stableRelease;

    if (manifest.languages && manifest.languages.length > 1) {
      primaryLanguage = manifest.primaryLanguage ? manifest.primaryLanguage : manifest.languages[0].path;
    }

    if (manifest.releases && manifest.releases.length > 1) {
      stableRelease = manifest.stableRelease ? manifest.stableRelease : manifest.releases[0];
    }

    versions.forEach(version => {
      const contentsVersionPath = path.join('contents', version.path);

      version.path = contentsVersionPath;

      let destinationPath = '.';

      const language = version.language ? version.language.path : null;

      if (primaryLanguage && primaryLanguage !== language) {
        destinationPath = path.join(destinationPath, language);
      }

      if (stableRelease && stableRelease !== version.release) {
        destinationPath = path.join(destinationPath, version.release);
      }

      version.destinationPath = destinationPath;
    });

    return versions;
  }
};
