'use strict';

describe('Gains E2E Tests:', function () {
  describe('Test gains page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/gains');
      expect(element.all(by.repeater('gain in gains')).count()).toEqual(0);
    });
  });
});
