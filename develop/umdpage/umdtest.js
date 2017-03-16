const querystring = require('querystring');

var obj = querystring.parse('foo=bar&baz=qux&baz=quux&corge');


$('#test').html(obj.foo);
