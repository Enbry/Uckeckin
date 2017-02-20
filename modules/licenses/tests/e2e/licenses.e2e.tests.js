'use strict';

describe('Licenses E2E Tests:', function () {
  describe('Test licenses page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/licenses');
      expect(element.all(by.repeater('license in licenses')).count()).toEqual(0);
    });
  });
});
