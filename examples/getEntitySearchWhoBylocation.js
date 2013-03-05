var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.getEntitySearchWhoBylocation('starbucks', 'dublin', null, null, 'ie', function(error,body) {
  console.log(error,body);
});

ci.getEntitySearchWhoBylocation('starbucks', 'dublin', 10, 1, 'ie', function(error,body) {
  console.log(error,body);
});


