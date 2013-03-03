var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.autocompleteLocation('dubl', 'ie' ,function(error,body) {
  console.log(error,body);
});

