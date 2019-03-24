/**
 * FileWriter.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

jest.mock('fs');

const FileWriter = require('../lib/FileWriter');
const fs = require('fs');

describe('FileWriter', () => {

  describe('write', () => {

    it('writes data to file', () => {
      const fileWriter = new FileWriter();
      const promise = fileWriter.write('path/to/file', 'data');

      fs.writeFile.mock.calls[0][2]();

      return promise
      .then(() => {
        expect(fs.writeFile).toHaveBeenCalledTimes(1);
        expect(fs.writeFile).toHaveBeenCalledWith('path/to/file', 'data', expect.anything());
      });
    });
  });
});
