// require('../common/core.js');
const $ = require('jquery');
import myimport from '../comp/index.js';
const myclass = require('../comp/class.js');
const querystring = require('querystring');

var obj = querystring.parse('foo=bar&baz=qux&baz=quux&corge');

$('#test').html(obj.foo+ '|' +myclass.speak() + '|' + myimport());
