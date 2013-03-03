var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.searchWho('ie', 'starbucks',null, null, null, function(error,body) {
  console.log(error,body);
});

ci.searchWho('ie', 'starbucks',10, 1, 'en', function(error,body) {
  console.log(error,body);
});


