'use strict';

describe('Beacons Prices E2E Tests:', function () {
  describe('Test beacons prices page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/prices/beacons');
      expect(element.all(by.repeater('price-beacon in prices-beacons')).count()).toEqual(0);
    });
  });
});
