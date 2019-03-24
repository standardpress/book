/**
 * TemplateParameterBuilderComposition.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const TemplateParameterBuilderComposition = require('../lib/TemplateParameterBuilderComposition');

describe('TemplateParameterBuilderComposition', () => {

  describe('build', () => {

    it('builds parameters with template parameter builders', () => {
      const templateParameterBuilder1 = {
        build: jest.fn().mockReturnValue({
          parameter1: 'parameter1'
        })
      };
      const templateParameterBuilder2 = {
        build: jest.fn().mockReturnValue({
          parameter2: 'parameter2'
        })
      };
      const templateParameterBuilderComposition = new TemplateParameterBuilderComposition([
        templateParameterBuilder1,
        templateParameterBuilder2
      ]);

      expect(templateParameterBuilderComposition.build('page', 'version', 'book')).toEqual({
        parameter1: 'parameter1',
        parameter2: 'parameter2'
      });
      expect(templateParameterBuilder1.build).toHaveBeenCalledTimes(1);
      expect(templateParameterBuilder1.build).toHaveBeenCalledWith('page', 'version', 'book');
      expect(templateParameterBuilder2.build).toHaveBeenCalledTimes(1);
      expect(templateParameterBuilder2.build).toHaveBeenCalledWith('page', 'version', 'book');
    });
  });
});
