var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.getEntitySearchWhatBylocation('hotel', 'dublin',null, null, 'ie', null, function(error,body) {
  console.log(error,body);
});

ci.getEntitySearchWhatBylocation('hotel', 'dublin',10, 1, 'ie', 'en', function(error,body) {
  console.log(error,body);
});


