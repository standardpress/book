/**
 * BookWriter.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const BookWriter = require('../lib/BookWriter');
const mkdirp = require('mkdirp');

describe('BookWriter', () => {

  describe('write', () => {

    it('writes book', () => {
      const book = {
        files: [
          {
            destinationPath: 'file-1.html',
            data: 'data-1'
          },
          {
            destinationPath: 'file/path/file-2.html',
            data: 'data-2'
          },
          [
            {
              destinationPath: 'file-3.html',
              data: 'data-3'
            },
            {
              destinationPath: 'file-4.html',
              data: 'data-4'
            }
          ]
        ]
      };
      const writer = {
        write: jest.fn(() => new Promise(resolve => {
          resolve();
        }))
      };
      const bookWriter = new BookWriter(writer);

      return bookWriter.write(book, 'destination/path')
      .then(() => {
        expect(mkdirp).toHaveBeenCalledTimes(4);
        expect(mkdirp).toHaveBeenNthCalledWith(1, 'destination/path', expect.anything());
        expect(mkdirp).toHaveBeenNthCalledWith(2, 'destination/path/file/path', expect.anything());
        expect(mkdirp).toHaveBeenNthCalledWith(3, 'destination/path', expect.anything());
        expect(mkdirp).toHaveBeenNthCalledWith(4, 'destination/path', expect.anything());
        expect(writer.write).toHaveBeenCalledTimes(4);
        expect(writer.write).toHaveBeenNthCalledWith(1, 'destination/path/file-1.html', 'data-1');
        expect(writer.write).toHaveBeenNthCalledWith(2, 'destination/path/file/path/file-2.html', 'data-2');
        expect(writer.write).toHaveBeenNthCalledWith(3, 'destination/path/file-3.html', 'data-3');
        expect(writer.write).toHaveBeenNthCalledWith(4, 'destination/path/file-4.html', 'data-4');
      });
    });
  });
});
