var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.getAutocompleteLocation('dubl', 'ie' ,function(error,body) {
  console.log(error,body);
});

