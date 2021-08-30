const assert = require('assert');
function add (x, y) {
	//
}
describe('Simple tests', function() {
  it('Should add basic numbers', function() {
    assert.equals(add(1, 1), 2);
    assert.equal(add(3, 2), 5);
  });
  it('Should add basic 2 numbers', function() {
    assert.equal(add(1, 1), 2);
    assert.equal(add(3, 2), 5);
  });
});
  describe('Simple tests 2', function() {
  it('Should add basic 3 numbers', function() {
    assert.equal(add(1, 1), 2);
    assert.equal(add(3, 2), 5);
  });
  it('Should add basic 4 numbers', function() {
    assert.equal(add(1, 1), 2);
    assert.equal(add(3, 2), 5);
  });
});