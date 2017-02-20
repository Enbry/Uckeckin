'use strict';

describe('Places E2E Tests:', function () {
  describe('Test places page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/places');
      expect(element.all(by.repeater('place in places')).count()).toEqual(0);
    });
  });
});
