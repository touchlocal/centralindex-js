var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.searchWhat('ie', 'hotel',null, null, null, function(error,body) {
  console.log(error,body);
});

ci.searchWhat('ie', 'hotel',10, 1, 'en', function(error,body) {
  console.log(error,body);
});


