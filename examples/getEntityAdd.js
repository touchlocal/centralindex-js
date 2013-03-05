var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.getEntityAdd('en', function(error,body) {
  console.log(error,body);
});


