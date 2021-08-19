const mocha = require('mocha');
const assert = require('assert');
function sum(a, b) {
	return  1 + a +b; 
}
describe("pow", function() {
it("add 2 and 3", function() {
 assert.equal(sum(2, 3), 5);
 });
});