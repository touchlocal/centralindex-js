var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.searchWhoByLocation('ie', 'starbucks', 'dublin',null, null, null, function(error,body) {
  console.log(error,body);
});

ci.searchWhoByLocation('ie', 'starbucks', 'dublin',10, 1, 'en', function(error,body) {
  console.log(error,body);
});


