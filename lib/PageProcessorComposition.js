/**
 * PageProcessorComposition.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

module.exports = class PageProcessorComposition {

  constructor(pageProcessors) {
    this.pageProcessors = pageProcessors;
  }

  process(page, version, book) {
    return this.pageProcessors.reduce((chain, pageProcessor) => {
      if (chain) {
        return chain.then(() => pageProcessor.process(page, version, book));
      } else {
        return pageProcessor.process(page, version, book);
      }
    }, null);
  }
};
