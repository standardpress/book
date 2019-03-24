/**
 * PageProcessorComposition.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const PageProcessorComposition = require('../lib/PageProcessorComposition');

describe('PageProcessorComposition', () => {

  describe('process', () => {

    it('processes page with page processors sequentially', () => {
      const page = {
        data: 'data1'
      };
      const pageProcessor1 = {
        process: jest.fn(() => new Promise(resolve => {
          pageProcessor1.receivedData = page.data;
          page.data = 'data2';
          resolve();
        }))
      };
      const pageProcessor2 = {
        process: jest.fn(() => new Promise(resolve => {
          pageProcessor2.receivedData = page.data;
          page.data = 'data3';
          resolve();
        }))
      };
      const pageProcessorComposition = new PageProcessorComposition([
        pageProcessor1,
        pageProcessor2
      ]);

      return pageProcessorComposition.process(page, 'version', 'book')
      .then(() => {
        expect(pageProcessor1.process).toHaveBeenCalledTimes(1);
        expect(pageProcessor1.process).toHaveBeenCalledWith(page, 'version', 'book');
        expect(pageProcessor1.receivedData).toEqual('data1');
        expect(pageProcessor2.process).toHaveBeenCalledTimes(1);
        expect(pageProcessor2.process).toHaveBeenCalledWith(page, 'version', 'book');
        expect(pageProcessor2.receivedData).toEqual('data2');
        expect(page.data).toEqual('data3');
      });
    });
  });
});
