require("coffee-script/register")
assert = require("assert")
require('../js/dentist.js')

describe 'Dentist JS', () ->
	describe 'String.prototype.extract()', () ->
		it 'should return a non-empty object if string does contain parameters. 
		e.g., \"http://google.com?a=1&b=2&z=zebra\"', () ->
			params = "http://google.com?a=1&b=2&z=zebra".extract()
			assert.equal 1, params.a
			assert.equal 2, params.b
			assert.equal "zebra", params.z

		it 'should return a non-empty object as long as key value separator exists (i.e., key-value pair exists)', () ->
			params = "a=1&b=2&z=zebra".extract()
			assert.equal 1, params.a
			assert.equal 2, params.b
			assert.equal "zebra", params.z

		it 'should return a non-empty object with only up to first X keys where X is stated limit size', () ->
			params = "http://google.com?a=1&b=2&z=zebra".extract({limit: 1})
			assert.equal 1, params.a
			assert.equal undefined, params.b
			assert.equal undefined, params.z

		it 'should return a non-empty object when non-errorneous options are requested', () ->
			params = "a-1|b-2|z-zebra".extract({delimiter: "|", keyValueSeparator: "-"})
			assert.equal 1, params.a
			assert.equal 2, params.b
			assert.equal "zebra", params.z

			params = "a-1|b-2|z-zebra".extract({delimiter: "|", keyValueSeparator: "-", startAfter: "|"})
			assert.equal undefined, params.a
			assert.equal 2, params.b
			assert.equal "zebra", params.z

		it 'should return undefined if string does not contain parameters.', () ->
			assert.equal undefined, "".extract()
			assert.equal undefined, "http://google.com".extract()
			assert.equal undefined, "http://google.com?".extract()