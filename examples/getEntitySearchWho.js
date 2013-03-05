var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.getEntitySearchWho('starbucks', null, null, 'ie', function(error,body) {
  console.log(error,body);
});

ci.getEntitySearchWho('starbucks', 10, 1, 'ie', function(error,body) {
  console.log(error,body);
});


