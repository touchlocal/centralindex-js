var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.searchAdvertisers('ie', 'hotel','dublin', 3, 'en', function(error,body) {
  console.log(error,body);
});


