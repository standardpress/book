/**
 * PageProcessorMarkdown.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const hljs = require('highlight.js');
const marked = require('marked');
const replaceExt = require('replace-ext');

module.exports = class PageProcessorMarkdown {

  constructor() {
    const renderer = new marked.Renderer();

    renderer.code = (code, lang) => {
      let highlightedCode;

      if (lang) {
        highlightedCode = hljs.highlight(lang, code).value;
      } else {
        highlightedCode = hljs.highlightAuto(code).value;
      }

      return `<pre><code class="hljs ${lang || ''}">${highlightedCode}</code></pre>`;
    };

    marked.setOptions({
      headerIds: false,
      renderer
    });
  }

  process(page) {
    const { destinationPath, data } = page;

    return new Promise((resolve, reject) => {
      marked(data, (error, html) => {
        if (error) {
          reject(error);

          return;
        }

        const processedDestinationPath = replaceExt(destinationPath, '.html');

        page.destinationPath = processedDestinationPath;
        page.data = html;
        resolve();
      });
    });
  }
};
