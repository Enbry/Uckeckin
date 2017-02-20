'use strict';

describe('Licenses Prices E2E Tests:', function () {
  describe('Test licenses prices page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/prices/licenses');
      expect(element.all(by.repeater('licensePrice in licensePrices')).count()).toEqual(0);
    });
  });
});
