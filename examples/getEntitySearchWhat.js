var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.getEntitySearchWhat('hotel', null, null, 'ie', null, function(error,body) {
  console.log(error,body);
});

ci.getEntitySearchWhat('hotel', 10, 1, 'ie', 'en', function(error,body) {
  console.log(error,body);
});


