var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.searchWhatByLocation('ie', 'hotel', 'dublin',null, null, null, function(error,body) {
  console.log(error,body);
});

ci.searchWhatByLocation('ie', 'hotel', 'dublin',10, 1, 'en', function(error,body) {
  console.log(error,body);
});


