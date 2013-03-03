var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.entityAdd('en', function(error,body) {
  console.log(error,body);
});


