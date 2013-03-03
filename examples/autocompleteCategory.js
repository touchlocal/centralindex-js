var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.autocompleteCategory('restaur', 'en' ,function(error,body) {
  console.log(error,body);
});

