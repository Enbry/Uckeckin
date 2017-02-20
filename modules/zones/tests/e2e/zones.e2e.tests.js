'use strict';

describe('Zones E2E Tests:', function () {
  describe('Test zones page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/zones');
      expect(element.all(by.repeater('zone in zones')).count()).toEqual(0);
    });
  });
});
