  // require the request library
  var request = require('request');

  // constants
  var debugMode = true;
  var apiKey = null;
  var apiUrl = "http://api.centralindex.com/v1";
  
  var setApiKey = function(key){
    apiKey = key;
    return;
  }

  // make API request
  var doCurl = function(url, data, callback) {
  
    // set the api key
    data.api_key = apiKey;
    
    // set the api url
    url = apiUrl + url;
  
    // do the api call
    request( { url: url, qs: data }, function (error, response, body) {
      try {
        body = JSON.parse(body);
      } catch (e) {
      }
      callback(error, body);
  
      if(debugMode){
        console.log("URL = "+url);
        console.log("Data: \n", data);
        console.log("Error: \n", error);
        console.log("Output: \n", body);
      }
    });
  
  }


  /**
   * Get the activity from the collection
   *
   *  @param type - The activity type: add, claim, special offer, image, video, description, testimonial
   *  @param country - The country to filter by
   *  @param latitude_1 - The latitude_1 to filter by
   *  @param longitude_1 - The longitude_1 to filter by
   *  @param latitude_2 - The latitude_2 to filter by
   *  @param longitude_2 - The longitude_2 to filter by
   *  @param number_results - The number_results to filter by
   *  @param unique_action - Return only the most recent instance of this action?
   *  @return - the data from the api
  */
  var getActivity_stream = function (type, country, latitude_1, longitude_1, latitude_2, longitude_2, number_results, unique_action, callback) {

    params = {};
    params.type = type;
    params.country = country;
    params.latitude_1 = latitude_1;
    params.longitude_1 = longitude_1;
    params.latitude_2 = latitude_2;
    params.longitude_2 = longitude_2;
    params.number_results = number_results;
    params.unique_action = unique_action;
    
    doCurl("/activity_stream",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * When we get some activity make a record of it
   *
   *  @param entity_id - The entity to pull
   *  @param entity_name - The entity name this entry refers to
   *  @param type - The activity type.
   *  @param country - The country for the activity
   *  @param longitude - The longitude for teh activity
   *  @param latitude - The latitude for teh activity
   *  @return - the data from the api
  */
  var postActivity_stream = function (entity_id, entity_name, type, country, longitude, latitude, callback) {

    params = {};
    params.entity_id = entity_id;
    params.entity_name = entity_name;
    params.type = type;
    params.country = country;
    params.longitude = longitude;
    params.latitude = latitude;
    
    doCurl("/activity_stream",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get all advertisers that have been updated from a give date for a given reseller
   *
   *  @param from_date
   *  @param country
   *  @return - the data from the api
  */
  var getAdvertiserUpdated = function (from_date, country, callback) {

    params = {};
    params.from_date = from_date;
    params.country = country;
    
    doCurl("/advertiser/updated",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get all advertisers that have been updated from a give date for a given publisher
   *
   *  @param publisher_id
   *  @param from_date
   *  @param country
   *  @return - the data from the api
  */
  var getAdvertiserUpdatedBy_publisher = function (publisher_id, from_date, country, callback) {

    params = {};
    params.publisher_id = publisher_id;
    params.from_date = from_date;
    params.country = country;
    
    doCurl("/advertiser/updated/by_publisher",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * The search matches a category name on a given string and language.
   *
   *  @param str - A string to search against, E.g. Plumbers e.g. but
   *  @param language - An ISO compatible language code, E.g. en e.g. en
   *  @return - the data from the api
  */
  var getAutocompleteCategory = function (str, language, callback) {

    params = {};
    params.str = str;
    params.language = language;
    
    doCurl("/autocomplete/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * The search matches a category name or synonym on a given string and language.
   *
   *  @param str - A string to search against, E.g. Plumbers e.g. but
   *  @param language - An ISO compatible language code, E.g. en e.g. en
   *  @return - the data from the api
  */
  var getAutocompleteKeyword = function (str, language, callback) {

    params = {};
    params.str = str;
    params.language = language;
    
    doCurl("/autocomplete/keyword",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * The search matches a location name or synonym on a given string and language.
   *
   *  @param str - A string to search against, E.g. Dub e.g. dub
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en e.g. en
   *  @return - the data from the api
  */
  var getAutocompleteLocation = function (str, country, language, callback) {

    params = {};
    params.str = str;
    params.country = country;
    params.language = language;
    
    doCurl("/autocomplete/location",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * The search matches a location name or synonym on a given string and language.
   *
   *  @param str - A string to search against, E.g. Middle e.g. dub
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param resolution
   *  @return - the data from the api
  */
  var getAutocompleteLocationBy_resolution = function (str, country, resolution, callback) {

    params = {};
    params.str = str;
    params.country = country;
    params.resolution = resolution;
    
    doCurl("/autocomplete/location/by_resolution",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create a new business entity with all it's objects
   *
   *  @param name
   *  @param building_number
   *  @param branch_name
   *  @param address1
   *  @param address2
   *  @param address3
   *  @param district
   *  @param town
   *  @param county
   *  @param province
   *  @param postcode
   *  @param country
   *  @param latitude
   *  @param longitude
   *  @param timezone
   *  @param telephone_number
   *  @param additional_telephone_number
   *  @param email
   *  @param website
   *  @param category_id
   *  @param category_type
   *  @param do_not_display
   *  @param referrer_url
   *  @param referrer_name
   *  @param destructive
   *  @return - the data from the api
  */
  var putBusiness = function (name, building_number, branch_name, address1, address2, address3, district, town, county, province, postcode, country, latitude, longitude, timezone, telephone_number, additional_telephone_number, email, website, category_id, category_type, do_not_display, referrer_url, referrer_name, destructive, callback) {

    params = {};
    params.name = name;
    params.building_number = building_number;
    params.branch_name = branch_name;
    params.address1 = address1;
    params.address2 = address2;
    params.address3 = address3;
    params.district = district;
    params.town = town;
    params.county = county;
    params.province = province;
    params.postcode = postcode;
    params.country = country;
    params.latitude = latitude;
    params.longitude = longitude;
    params.timezone = timezone;
    params.telephone_number = telephone_number;
    params.additional_telephone_number = additional_telephone_number;
    params.email = email;
    params.website = website;
    params.category_id = category_id;
    params.category_type = category_type;
    params.do_not_display = do_not_display;
    params.referrer_url = referrer_url;
    params.referrer_name = referrer_name;
    params.destructive = destructive;
    
    doCurl("/business",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Delete a business tool with a specified tool_id
   *
   *  @param tool_id
   *  @return - the data from the api
  */
  var deleteBusiness_tool = function (tool_id, callback) {

    params = {};
    params.tool_id = tool_id;
    
    doCurl("/business_tool",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a Business Tool
   *
   *  @param tool_id
   *  @param country
   *  @param headline
   *  @param description
   *  @param link_url
   *  @param active
   *  @return - the data from the api
  */
  var postBusiness_tool = function (tool_id, country, headline, description, link_url, active, callback) {

    params = {};
    params.tool_id = tool_id;
    params.country = country;
    params.headline = headline;
    params.description = description;
    params.link_url = link_url;
    params.active = active;
    
    doCurl("/business_tool",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns business tool that matches a given tool id
   *
   *  @param tool_id
   *  @return - the data from the api
  */
  var getBusiness_tool = function (tool_id, callback) {

    params = {};
    params.tool_id = tool_id;
    
    doCurl("/business_tool",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns active business tools for a specific masheryid in a given country
   *
   *  @param country
   *  @return - the data from the api
  */
  var getBusiness_toolBy_masheryid = function (country, callback) {

    params = {};
    params.country = country;
    
    doCurl("/business_tool/by_masheryid",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Assigns a Business Tool image
   *
   *  @param tool_id
   *  @param filedata
   *  @return - the data from the api
  */
  var postBusiness_toolImage = function (tool_id, filedata, callback) {

    params = {};
    params.tool_id = tool_id;
    params.filedata = filedata;
    
    doCurl("/business_tool/image",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known category id, an category object can be added.
   *
   *  @param category_id
   *  @param language
   *  @param name
   *  @return - the data from the api
  */
  var putCategory = function (category_id, language, name, callback) {

    params = {};
    params.category_id = category_id;
    params.language = language;
    params.name = name;
    
    doCurl("/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns the supplied wolf category object by fetching the supplied category_id from our categories object.
   *
   *  @param category_id
   *  @return - the data from the api
  */
  var getCategory = function (category_id, callback) {

    params = {};
    params.category_id = category_id;
    
    doCurl("/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns all Central Index categories and associated data
   *
   *  @return - the data from the api
  */
  var getCategoryAll = function (callback) {

    params = {};
    
    doCurl("/category/all",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known category id, a mapping object can be added.
   *
   *  @param category_id
   *  @param type
   *  @param id
   *  @param name
   *  @return - the data from the api
  */
  var postCategoryMappings = function (category_id, type, id, name, callback) {

    params = {};
    params.category_id = category_id;
    params.type = type;
    params.id = id;
    params.name = name;
    
    doCurl("/category/mappings",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known category id, a mapping object can be deleted.
   *
   *  @param category_id
   *  @param category_type
   *  @param mapped_id
   *  @return - the data from the api
  */
  var deleteCategoryMappings = function (category_id, category_type, mapped_id, callback) {

    params = {};
    params.category_id = category_id;
    params.category_type = category_type;
    params.mapped_id = mapped_id;
    
    doCurl("/category/mappings",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a category object to merged with another
   *
   *  @param from
   *  @param to
   *  @return - the data from the api
  */
  var postCategoryMerge = function (from, to, callback) {

    params = {};
    params.from = from;
    params.to = to;
    
    doCurl("/category/merge",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known category id, a synonyms object can be removed.
   *
   *  @param category_id
   *  @param synonym
   *  @param language
   *  @return - the data from the api
  */
  var deleteCategorySynonym = function (category_id, synonym, language, callback) {

    params = {};
    params.category_id = category_id;
    params.synonym = synonym;
    params.language = language;
    
    doCurl("/category/synonym",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known category id, an synonym object can be added.
   *
   *  @param category_id
   *  @param synonym
   *  @param language
   *  @return - the data from the api
  */
  var postCategorySynonym = function (category_id, synonym, language, callback) {

    params = {};
    params.category_id = category_id;
    params.synonym = synonym;
    params.language = language;
    
    doCurl("/category/synonym",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the contract from the ID supplied
   *
   *  @param contract_id
   *  @return - the data from the api
  */
  var getContract = function (contract_id, callback) {

    params = {};
    params.contract_id = contract_id;
    
    doCurl("/contract",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a contract from the payment provider id supplied
   *
   *  @param payment_provider
   *  @param payment_provider_id
   *  @return - the data from the api
  */
  var getContractBy_payment_provider_id = function (payment_provider, payment_provider_id, callback) {

    params = {};
    params.payment_provider = payment_provider;
    params.payment_provider_id = payment_provider_id;
    
    doCurl("/contract/by_payment_provider_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the active contracts from the ID supplied
   *
   *  @param user_id
   *  @return - the data from the api
  */
  var getContractBy_user_id = function (user_id, callback) {

    params = {};
    params.user_id = user_id;
    
    doCurl("/contract/by_user_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Cancels an existing contract for a given id
   *
   *  @param contract_id
   *  @return - the data from the api
  */
  var postContractCancel = function (contract_id, callback) {

    params = {};
    params.contract_id = contract_id;
    
    doCurl("/contract/cancel",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Creates a new contract for a given entity
   *
   *  @param entity_id
   *  @param user_id
   *  @param payment_provider
   *  @param basket
   *  @param billing_period
   *  @param source
   *  @param channel
   *  @param campaign
   *  @return - the data from the api
  */
  var postContractCreate = function (entity_id, user_id, payment_provider, basket, billing_period, source, channel, campaign, callback) {

    params = {};
    params.entity_id = entity_id;
    params.user_id = user_id;
    params.payment_provider = payment_provider;
    params.basket = basket;
    params.billing_period = billing_period;
    params.source = source;
    params.channel = channel;
    params.campaign = campaign;
    
    doCurl("/contract/create",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * When we failed to receive money add the dates etc to the contract
   *
   *  @param contract_id
   *  @param failure_reason
   *  @param payment_date
   *  @param amount
   *  @param currency
   *  @param response
   *  @return - the data from the api
  */
  var postContractPaymentFailure = function (contract_id, failure_reason, payment_date, amount, currency, response, callback) {

    params = {};
    params.contract_id = contract_id;
    params.failure_reason = failure_reason;
    params.payment_date = payment_date;
    params.amount = amount;
    params.currency = currency;
    params.response = response;
    
    doCurl("/contract/payment/failure",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Adds payment details to a given contract_id
   *
   *  @param contract_id
   *  @param payment_provider_id
   *  @param payment_provider_profile
   *  @param user_name
   *  @param user_surname
   *  @param user_billing_address
   *  @param user_email_address
   *  @return - the data from the api
  */
  var postContractPaymentSetup = function (contract_id, payment_provider_id, payment_provider_profile, user_name, user_surname, user_billing_address, user_email_address, callback) {

    params = {};
    params.contract_id = contract_id;
    params.payment_provider_id = payment_provider_id;
    params.payment_provider_profile = payment_provider_profile;
    params.user_name = user_name;
    params.user_surname = user_surname;
    params.user_billing_address = user_billing_address;
    params.user_email_address = user_email_address;
    
    doCurl("/contract/payment/setup",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * When we receive money add the dates etc to the contract
   *
   *  @param contract_id
   *  @param payment_date
   *  @param amount
   *  @param currency
   *  @param response
   *  @return - the data from the api
  */
  var postContractPaymentSuccess = function (contract_id, payment_date, amount, currency, response, callback) {

    params = {};
    params.contract_id = contract_id;
    params.payment_date = payment_date;
    params.amount = amount;
    params.currency = currency;
    params.response = response;
    
    doCurl("/contract/payment/success",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Go through all the products in a contract and provision them
   *
   *  @param contract_id
   *  @return - the data from the api
  */
  var postContractProvision = function (contract_id, callback) {

    params = {};
    params.contract_id = contract_id;
    
    doCurl("/contract/provision",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the contract log from the ID supplied
   *
   *  @param contract_log_id
   *  @return - the data from the api
  */
  var getContract_log = function (contract_log_id, callback) {

    params = {};
    params.contract_log_id = contract_log_id;
    
    doCurl("/contract_log",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Creates a new contract log for a given contract
   *
   *  @param contract_id
   *  @param date
   *  @param payment_provider
   *  @param response
   *  @param success
   *  @param amount
   *  @param currency
   *  @return - the data from the api
  */
  var postContract_log = function (contract_id, date, payment_provider, response, success, amount, currency, callback) {

    params = {};
    params.contract_id = contract_id;
    params.date = date;
    params.payment_provider = payment_provider;
    params.response = response;
    params.success = success;
    params.amount = amount;
    params.currency = currency;
    
    doCurl("/contract_log",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the contract logs from the ID supplied
   *
   *  @param contract_id
   *  @param page
   *  @param per_page
   *  @return - the data from the api
  */
  var getContract_logBy_contract_id = function (contract_id, page, per_page, callback) {

    params = {};
    params.contract_id = contract_id;
    params.page = page;
    params.per_page = per_page;
    
    doCurl("/contract_log/by_contract_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the contract logs from the payment_provider supplied
   *
   *  @param payment_provider
   *  @param page
   *  @param per_page
   *  @return - the data from the api
  */
  var getContract_logBy_payment_provider = function (payment_provider, page, per_page, callback) {

    params = {};
    params.payment_provider = payment_provider;
    params.page = page;
    params.per_page = per_page;
    
    doCurl("/contract_log/by_payment_provider",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the contract log from the ID supplied
   *
   *  @param date
   *  @param success
   *  @return - the data from the api
  */
  var getContract_logSuccess_by_date = function (date, success, callback) {

    params = {};
    params.date = date;
    params.success = success;
    
    doCurl("/contract_log/success_by_date",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetching a country
   *
   *  @param country_id
   *  @return - the data from the api
  */
  var getCountry = function (country_id, callback) {

    params = {};
    params.country_id = country_id;
    
    doCurl("/country",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a country
   *
   *  @param country_id
   *  @param name
   *  @param synonyms
   *  @param continentName
   *  @param continent
   *  @param geonameId
   *  @param dbpediaURL
   *  @param freebaseURL
   *  @param population
   *  @param currencyCode
   *  @param languages
   *  @param areaInSqKm
   *  @param capital
   *  @param east
   *  @param west
   *  @param north
   *  @param south
   *  @param claimPrice
   *  @param claimMethods
   *  @param twilio_sms
   *  @param twilio_phone
   *  @param twilio_voice
   *  @param currency_symbol - the symbol of this country's currency
   *  @param currency_symbol_html - the html version of the symbol of this country's currency
   *  @param postcodeLookupActive - Whether the lookup is activated for this country
   *  @param addressFields - Whether fields are activated for this country
   *  @param addressMatching - The configurable matching algorithm
   *  @param dateFormat - The format of the date for this country
   *  @param iso_3166_alpha_3
   *  @param iso_3166_numeric
   *  @return - the data from the api
  */
  var postCountry = function (country_id, name, synonyms, continentName, continent, geonameId, dbpediaURL, freebaseURL, population, currencyCode, languages, areaInSqKm, capital, east, west, north, south, claimPrice, claimMethods, twilio_sms, twilio_phone, twilio_voice, currency_symbol, currency_symbol_html, postcodeLookupActive, addressFields, addressMatching, dateFormat, iso_3166_alpha_3, iso_3166_numeric, callback) {

    params = {};
    params.country_id = country_id;
    params.name = name;
    params.synonyms = synonyms;
    params.continentName = continentName;
    params.continent = continent;
    params.geonameId = geonameId;
    params.dbpediaURL = dbpediaURL;
    params.freebaseURL = freebaseURL;
    params.population = population;
    params.currencyCode = currencyCode;
    params.languages = languages;
    params.areaInSqKm = areaInSqKm;
    params.capital = capital;
    params.east = east;
    params.west = west;
    params.north = north;
    params.south = south;
    params.claimPrice = claimPrice;
    params.claimMethods = claimMethods;
    params.twilio_sms = twilio_sms;
    params.twilio_phone = twilio_phone;
    params.twilio_voice = twilio_voice;
    params.currency_symbol = currency_symbol;
    params.currency_symbol_html = currency_symbol_html;
    params.postcodeLookupActive = postcodeLookupActive;
    params.addressFields = addressFields;
    params.addressMatching = addressMatching;
    params.dateFormat = dateFormat;
    params.iso_3166_alpha_3 = iso_3166_alpha_3;
    params.iso_3166_numeric = iso_3166_numeric;
    
    doCurl("/country",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * For a given country add/update a background image to show in the add/edit path
   *
   *  @param country_id
   *  @param filedata
   *  @param backgroundImageAttr
   *  @return - the data from the api
  */
  var postCountryBackgroundImage = function (country_id, filedata, backgroundImageAttr, callback) {

    params = {};
    params.country_id = country_id;
    params.filedata = filedata;
    params.backgroundImageAttr = backgroundImageAttr;
    
    doCurl("/country/backgroundImage",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * For a given country add/update a social login background image to show in the add/edit path
   *
   *  @param country_id
   *  @param filedata
   *  @return - the data from the api
  */
  var postCountrySocialLoginImage = function (country_id, filedata, callback) {

    params = {};
    params.country_id = country_id;
    params.filedata = filedata;
    
    doCurl("/country/socialLoginImage",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Send an email via amazon
   *
   *  @param to_email_address - The email address to send the email too
   *  @param reply_email_address - The email address to add in the reply to field
   *  @param source_account - The source account to send the email from
   *  @param subject - The subject for the email
   *  @param body - The body for the email
   *  @param html_body - If the body of the email is html
   *  @return - the data from the api
  */
  var postEmail = function (to_email_address, reply_email_address, source_account, subject, body, html_body, callback) {

    params = {};
    params.to_email_address = to_email_address;
    params.reply_email_address = reply_email_address;
    params.source_account = source_account;
    params.subject = subject;
    params.body = body;
    params.html_body = html_body;
    
    doCurl("/email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * This entity isn't really supported anymore. You probably want PUT /business. Only to be used for testing.
   *
   *  @param type
   *  @param scope
   *  @param country
   *  @param trust
   *  @param our_data
   *  @return - the data from the api
  */
  var putEntity = function (type, scope, country, trust, our_data, callback) {

    params = {};
    params.type = type;
    params.scope = scope;
    params.country = country;
    params.trust = trust;
    params.our_data = our_data;
    
    doCurl("/entity",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a whole entity to be pulled from the datastore by its unique id
   *
   *  @param entity_id - The unique entity ID e.g. 379236608286720
   *  @return - the data from the api
  */
  var getEntity = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an add can be updated.
   *
   *  @param entity_id
   *  @param add_referrer_url
   *  @param add_referrer_name
   *  @return - the data from the api
  */
  var postEntityAdd = function (entity_id, add_referrer_url, add_referrer_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.add_referrer_url = add_referrer_url;
    params.add_referrer_name = add_referrer_name;
    
    doCurl("/entity/add",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows an advertiser object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityAdvertiser = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/advertiser",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Expires an advertiser from and entity
   *
   *  @param entity_id
   *  @param publisher_id
   *  @param reseller_ref
   *  @param reseller_agent_id
   *  @return - the data from the api
  */
  var postEntityAdvertiserCancel = function (entity_id, publisher_id, reseller_ref, reseller_agent_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.publisher_id = publisher_id;
    params.reseller_ref = reseller_ref;
    params.reseller_agent_id = reseller_agent_id;
    
    doCurl("/entity/advertiser/cancel",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a advertiser is added
   *
   *  @param entity_id
   *  @param tags
   *  @param locations
   *  @param max_tags
   *  @param max_locations
   *  @param expiry_date
   *  @param is_national
   *  @param language
   *  @param reseller_ref
   *  @param reseller_agent_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var postEntityAdvertiserCreate = function (entity_id, tags, locations, max_tags, max_locations, expiry_date, is_national, language, reseller_ref, reseller_agent_id, publisher_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.tags = tags;
    params.locations = locations;
    params.max_tags = max_tags;
    params.max_locations = max_locations;
    params.expiry_date = expiry_date;
    params.is_national = is_national;
    params.language = language;
    params.reseller_ref = reseller_ref;
    params.reseller_agent_id = reseller_agent_id;
    params.publisher_id = publisher_id;
    
    doCurl("/entity/advertiser/create",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Adds/removes locations
   *
   *  @param entity_id
   *  @param gen_id
   *  @param locations_to_add
   *  @param locations_to_remove
   *  @return - the data from the api
  */
  var postEntityAdvertiserLocation = function (entity_id, gen_id, locations_to_add, locations_to_remove, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    params.locations_to_add = locations_to_add;
    params.locations_to_remove = locations_to_remove;
    
    doCurl("/entity/advertiser/location",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Renews an advertiser from an entity
   *
   *  @param entity_id
   *  @param expiry_date
   *  @param publisher_id
   *  @param reseller_ref
   *  @param reseller_agent_id
   *  @return - the data from the api
  */
  var postEntityAdvertiserRenew = function (entity_id, expiry_date, publisher_id, reseller_ref, reseller_agent_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.expiry_date = expiry_date;
    params.publisher_id = publisher_id;
    params.reseller_ref = reseller_ref;
    params.reseller_agent_id = reseller_agent_id;
    
    doCurl("/entity/advertiser/renew",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows the removal or insertion of tags into an advertiser object
   *
   *  @param gen_id - The gen_id of this advertiser
   *  @param entity_id - The entity_id of the advertiser
   *  @param language - The tag language to alter
   *  @param tags_to_add - The tags to add
   *  @param tags_to_remove - The tags to remove
   *  @return - the data from the api
  */
  var postEntityAdvertiserTag = function (gen_id, entity_id, language, tags_to_add, tags_to_remove, callback) {

    params = {};
    params.gen_id = gen_id;
    params.entity_id = entity_id;
    params.language = language;
    params.tags_to_add = tags_to_add;
    params.tags_to_remove = tags_to_remove;
    
    doCurl("/entity/advertiser/tag",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an advertiser is updated
   *
   *  @param entity_id
   *  @param tags
   *  @param locations
   *  @param extra_tags
   *  @param extra_locations
   *  @param is_national
   *  @param language
   *  @param reseller_ref
   *  @param reseller_agent_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var postEntityAdvertiserUpsell = function (entity_id, tags, locations, extra_tags, extra_locations, is_national, language, reseller_ref, reseller_agent_id, publisher_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.tags = tags;
    params.locations = locations;
    params.extra_tags = extra_tags;
    params.extra_locations = extra_locations;
    params.is_national = is_national;
    params.language = language;
    params.reseller_ref = reseller_ref;
    params.reseller_agent_id = reseller_agent_id;
    params.publisher_id = publisher_id;
    
    doCurl("/entity/advertiser/upsell",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities that are advertisers and return a random selection upto the limit requested
   *
   *  @param tag - The word or words the advertiser is to appear for in searches
   *  @param where - The location to get results for. E.g. Dublin
   *  @param limit - The number of advertisers that are to be returned
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @return - the data from the api
  */
  var getEntityAdvertisers = function (tag, where, limit, country, language, callback) {

    params = {};
    params.tag = tag;
    params.where = where;
    params.limit = limit;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/advertisers",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an affiliate link object can be added.
   *
   *  @param entity_id
   *  @param affiliate_name
   *  @param affiliate_link
   *  @param affiliate_message
   *  @param affiliate_logo
   *  @return - the data from the api
  */
  var postEntityAffiliate_link = function (entity_id, affiliate_name, affiliate_link, affiliate_message, affiliate_logo, callback) {

    params = {};
    params.entity_id = entity_id;
    params.affiliate_name = affiliate_name;
    params.affiliate_link = affiliate_link;
    params.affiliate_message = affiliate_message;
    params.affiliate_logo = affiliate_logo;
    
    doCurl("/entity/affiliate_link",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows an affiliate link object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityAffiliate_link = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/affiliate_link",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an background object can be added. There can however only be one background object.
   *
   *  @param entity_id
   *  @param number_of_employees
   *  @param turnover
   *  @param net_profit
   *  @param vat_number
   *  @param duns_number
   *  @param registered_company_number
   *  @return - the data from the api
  */
  var postEntityBackground = function (entity_id, number_of_employees, turnover, net_profit, vat_number, duns_number, registered_company_number, callback) {

    params = {};
    params.entity_id = entity_id;
    params.number_of_employees = number_of_employees;
    params.turnover = turnover;
    params.net_profit = net_profit;
    params.vat_number = vat_number;
    params.duns_number = duns_number;
    params.registered_company_number = registered_company_number;
    
    doCurl("/entity/background",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Uploads a CSV file of known format and bulk inserts into DB
   *
   *  @param filedata
   *  @return - the data from the api
  */
  var postEntityBulkCsv = function (filedata, callback) {

    params = {};
    params.filedata = filedata;
    
    doCurl("/entity/bulk/csv",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Shows the current status of a bulk upload
   *
   *  @param upload_id
   *  @return - the data from the api
  */
  var getEntityBulkCsvStatus = function (upload_id, callback) {

    params = {};
    params.upload_id = upload_id;
    
    doCurl("/entity/bulk/csv/status",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Uploads a JSON file of known format and bulk inserts into DB
   *
   *  @param data
   *  @return - the data from the api
  */
  var postEntityBulkJson = function (data, callback) {

    params = {};
    params.data = data;
    
    doCurl("/entity/bulk/json",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Shows the current status of a bulk JSON upload
   *
   *  @param upload_id
   *  @return - the data from the api
  */
  var getEntityBulkJsonStatus = function (upload_id, callback) {

    params = {};
    params.upload_id = upload_id;
    
    doCurl("/entity/bulk/json/status",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get all entities within a specified group
   *
   *  @param group_id
   *  @return - the data from the api
  */
  var getEntityBy_groupid = function (group_id, callback) {

    params = {};
    params.group_id = group_id;
    
    doCurl("/entity/by_groupid",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * uncontributes a given entities supplier content and makes the entity inactive if the entity is un-usable
   *
   *  @param entity_id - The entity to pull
   *  @param supplier_masheryid - The suppliers masheryid to match
   *  @param supplier_id - The supplier id to match
   *  @param supplier_user_id - The user id to match
   *  @return - the data from the api
  */
  var deleteEntityBy_supplier = function (entity_id, supplier_masheryid, supplier_id, supplier_user_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.supplier_masheryid = supplier_masheryid;
    params.supplier_id = supplier_id;
    params.supplier_user_id = supplier_user_id;
    
    doCurl("/entity/by_supplier",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetches the documents that match the given masheryid and supplier_id
   *
   *  @param supplier_id - The Supplier ID
   *  @return - the data from the api
  */
  var getEntityBy_supplier_id = function (supplier_id, callback) {

    params = {};
    params.supplier_id = supplier_id;
    
    doCurl("/entity/by_supplier_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get all entiies claimed by a specific user
   *
   *  @param user_id - The unique user ID of the user with claimed entities e.g. 379236608286720
   *  @return - the data from the api
  */
  var getEntityBy_user_id = function (user_id, callback) {

    params = {};
    params.user_id = user_id;
    
    doCurl("/entity/by_user_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a category object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityCategory = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an category object can be added.
   *
   *  @param entity_id
   *  @param category_id
   *  @param category_type
   *  @return - the data from the api
  */
  var postEntityCategory = function (entity_id, category_id, category_type, callback) {

    params = {};
    params.entity_id = entity_id;
    params.category_id = category_id;
    params.category_type = category_type;
    
    doCurl("/entity/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetches the changelog documents that match the given entity_id
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var getEntityChangelog = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/changelog",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allow an entity to be claimed by a valid user
   *
   *  @param entity_id
   *  @param claimed_user_id
   *  @param claimed_reseller_id
   *  @param expiry_date
   *  @param claimed_date
   *  @param claim_method
   *  @param phone_number
   *  @param referrer_url
   *  @param referrer_name
   *  @return - the data from the api
  */
  var postEntityClaim = function (entity_id, claimed_user_id, claimed_reseller_id, expiry_date, claimed_date, claim_method, phone_number, referrer_url, referrer_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.claimed_user_id = claimed_user_id;
    params.claimed_reseller_id = claimed_reseller_id;
    params.expiry_date = expiry_date;
    params.claimed_date = claimed_date;
    params.claim_method = claim_method;
    params.phone_number = phone_number;
    params.referrer_url = referrer_url;
    params.referrer_name = referrer_name;
    
    doCurl("/entity/claim",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a description object can be added.
   *
   *  @param entity_id
   *  @param headline
   *  @param body
   *  @param gen_id
   *  @return - the data from the api
  */
  var postEntityDescription = function (entity_id, headline, body, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.headline = headline;
    params.body = body;
    params.gen_id = gen_id;
    
    doCurl("/entity/description",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a description object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityDescription = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/description",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an document object can be added.
   *
   *  @param entity_id
   *  @param name
   *  @param filedata
   *  @return - the data from the api
  */
  var postEntityDocument = function (entity_id, name, filedata, callback) {

    params = {};
    params.entity_id = entity_id;
    params.name = name;
    params.filedata = filedata;
    
    doCurl("/entity/document",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a phone object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityDocument = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/document",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an email address object can be added.
   *
   *  @param entity_id
   *  @param email_address
   *  @param email_description
   *  @return - the data from the api
  */
  var postEntityEmail = function (entity_id, email_address, email_description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.email_address = email_address;
    params.email_description = email_description;
    
    doCurl("/entity/email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a email object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityEmail = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an employee object can be added.
   *
   *  @param entity_id
   *  @param title
   *  @param forename
   *  @param surname
   *  @param job_title
   *  @param description
   *  @param email
   *  @param phone_number
   *  @return - the data from the api
  */
  var postEntityEmployee = function (entity_id, title, forename, surname, job_title, description, email, phone_number, callback) {

    params = {};
    params.entity_id = entity_id;
    params.title = title;
    params.forename = forename;
    params.surname = surname;
    params.job_title = job_title;
    params.description = description;
    params.email = email;
    params.phone_number = phone_number;
    
    doCurl("/entity/employee",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows an employee object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityEmployee = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/employee",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an fax object can be added.
   *
   *  @param entity_id
   *  @param number
   *  @param description
   *  @return - the data from the api
  */
  var postEntityFax = function (entity_id, number, description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.number = number;
    params.description = description;
    
    doCurl("/entity/fax",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a fax object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityFax = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/fax",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a geopoint can be updated.
   *
   *  @param entity_id
   *  @param longitude
   *  @param latitude
   *  @param accuracy
   *  @return - the data from the api
  */
  var postEntityGeopoint = function (entity_id, longitude, latitude, accuracy, callback) {

    params = {};
    params.entity_id = entity_id;
    params.longitude = longitude;
    params.latitude = latitude;
    params.accuracy = accuracy;
    
    doCurl("/entity/geopoint",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a group  can be added to group members.
   *
   *  @param entity_id
   *  @param group_id
   *  @return - the data from the api
  */
  var postEntityGroup = function (entity_id, group_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.group_id = group_id;
    
    doCurl("/entity/group",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a group object to be removed from an entities group members
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityGroup = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/group",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a image object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityImage = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/image",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a image object can be added.
   *
   *  @param entity_id
   *  @param filedata
   *  @param image_name
   *  @return - the data from the api
  */
  var postEntityImage = function (entity_id, filedata, image_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.filedata = filedata;
    params.image_name = image_name;
    
    doCurl("/entity/image",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id and a known invoice_address ID, we can delete a specific invoice_address object from an enitity.
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var deleteEntityInvoice_address = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/invoice_address",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an invoice_address object can be updated.
   *
   *  @param entity_id
   *  @param building_number
   *  @param address1
   *  @param address2
   *  @param address3
   *  @param district
   *  @param town
   *  @param county
   *  @param province
   *  @param postcode
   *  @param address_type
   *  @return - the data from the api
  */
  var postEntityInvoice_address = function (entity_id, building_number, address1, address2, address3, district, town, county, province, postcode, address_type, callback) {

    params = {};
    params.entity_id = entity_id;
    params.building_number = building_number;
    params.address1 = address1;
    params.address2 = address2;
    params.address3 = address3;
    params.district = district;
    params.town = town;
    params.county = county;
    params.province = province;
    params.postcode = postcode;
    params.address_type = address_type;
    
    doCurl("/entity/invoice_address",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a list description object to be reduced in confidence
   *
   *  @param gen_id
   *  @param entity_id
   *  @return - the data from the api
  */
  var deleteEntityList = function (gen_id, entity_id, callback) {

    params = {};
    params.gen_id = gen_id;
    params.entity_id = entity_id;
    
    doCurl("/entity/list",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a list description object can be added.
   *
   *  @param entity_id
   *  @param headline
   *  @param body
   *  @return - the data from the api
  */
  var postEntityList = function (entity_id, headline, body, callback) {

    params = {};
    params.entity_id = entity_id;
    params.headline = headline;
    params.body = body;
    
    doCurl("/entity/list",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find all entities in a group
   *
   *  @param group_id - A valid group_id
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @return - the data from the api
  */
  var getEntityList_by_group_id = function (group_id, per_page, page, callback) {

    params = {};
    params.group_id = group_id;
    params.per_page = per_page;
    params.page = page;
    
    doCurl("/entity/list_by_group_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a logo object can be added.
   *
   *  @param entity_id
   *  @param filedata
   *  @param logo_name
   *  @return - the data from the api
  */
  var postEntityLogo = function (entity_id, filedata, logo_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.filedata = filedata;
    params.logo_name = logo_name;
    
    doCurl("/entity/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a phone object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityLogo = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Merge two entities into one
   *
   *  @param from
   *  @param to
   *  @param override_trust - Do you want to override the trust of the 'from' entity
   *  @param uncontribute_masheryid - Do we want to uncontribute any data for a masheryid?
   *  @param uncontribute_userid - Do we want to uncontribute any data for a user_id?
   *  @param uncontribute_supplierid - Do we want to uncontribute any data for a supplier_id?
   *  @return - the data from the api
  */
  var postEntityMerge = function (from, to, override_trust, uncontribute_masheryid, uncontribute_userid, uncontribute_supplierid, callback) {

    params = {};
    params.from = from;
    params.to = to;
    params.override_trust = override_trust;
    params.uncontribute_masheryid = uncontribute_masheryid;
    params.uncontribute_userid = uncontribute_userid;
    params.uncontribute_supplierid = uncontribute_supplierid;
    
    doCurl("/entity/merge",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update entities that use an old category ID to a new one
   *
   *  @param from
   *  @param to
   *  @param limit
   *  @return - the data from the api
  */
  var postEntityMigrate_category = function (from, to, limit, callback) {

    params = {};
    params.from = from;
    params.to = to;
    params.limit = limit;
    
    doCurl("/entity/migrate_category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a name can be updated.
   *
   *  @param entity_id
   *  @param name
   *  @param formal_name
   *  @param branch_name
   *  @return - the data from the api
  */
  var postEntityName = function (entity_id, name, formal_name, branch_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.name = name;
    params.formal_name = formal_name;
    params.branch_name = branch_name;
    
    doCurl("/entity/name",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a opening times object can be removed.
   *
   *  @param entity_id - The id of the entity to edit
   *  @return - the data from the api
  */
  var deleteEntityOpening_times = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/opening_times",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a opening times object can be added. Each day can be either 'closed' to indicate that the entity is closed that day, '24hour' to indicate that the entity is open all day or single/split time ranges can be supplied in 4-digit 24-hour format, such as '09001730' or '09001200,13001700' to indicate hours of opening.
   *
   *  @param entity_id - The id of the entity to edit
   *  @param monday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param tuesday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param wednesday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param thursday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param friday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param saturday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param sunday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param closed - a comma-separated list of dates that the entity is closed e.g. '2013-04-29,2013-05-02'
   *  @param closed_public_holidays - whether the entity is closed on public holidays
   *  @return - the data from the api
  */
  var postEntityOpening_times = function (entity_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, closed, closed_public_holidays, callback) {

    params = {};
    params.entity_id = entity_id;
    params.monday = monday;
    params.tuesday = tuesday;
    params.wednesday = wednesday;
    params.thursday = thursday;
    params.friday = friday;
    params.saturday = saturday;
    params.sunday = sunday;
    params.closed = closed;
    params.closed_public_holidays = closed_public_holidays;
    
    doCurl("/entity/opening_times",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a phone object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityPhone = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/phone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a new phone object to be added to a specified entity. A new object id will be calculated and returned to you if successful.
   *
   *  @param entity_id
   *  @param number
   *  @param trackable
   *  @return - the data from the api
  */
  var postEntityPhone = function (entity_id, number, trackable, callback) {

    params = {};
    params.entity_id = entity_id;
    params.number = number;
    params.trackable = trackable;
    
    doCurl("/entity/phone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create/Update a postal address
   *
   *  @param entity_id
   *  @param building_number
   *  @param address1
   *  @param address2
   *  @param address3
   *  @param district
   *  @param town
   *  @param county
   *  @param province
   *  @param postcode
   *  @param address_type
   *  @param do_not_display
   *  @return - the data from the api
  */
  var postEntityPostal_address = function (entity_id, building_number, address1, address2, address3, district, town, county, province, postcode, address_type, do_not_display, callback) {

    params = {};
    params.entity_id = entity_id;
    params.building_number = building_number;
    params.address1 = address1;
    params.address2 = address2;
    params.address3 = address3;
    params.district = district;
    params.town = town;
    params.county = county;
    params.province = province;
    params.postcode = postcode;
    params.address_type = address_type;
    params.do_not_display = do_not_display;
    
    doCurl("/entity/postal_address",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetches the documents that match the given masheryid and supplier_id
   *
   *  @param supplier_id - The Supplier ID
   *  @return - the data from the api
  */
  var getEntityProvisionalBy_supplier_id = function (supplier_id, callback) {

    params = {};
    params.supplier_id = supplier_id;
    
    doCurl("/entity/provisional/by_supplier_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a list of available revisions to be returned by its entity id
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var getEntityRevisions = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/revisions",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a specific revision of an entity to be returned by entity id and a revision number
   *
   *  @param entity_id
   *  @param revision_id
   *  @return - the data from the api
  */
  var getEntityRevisionsByRevisionID = function (entity_id, revision_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.revision_id = revision_id;
    
    doCurl("/entity/revisions/byRevisionID",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param latitude_1
   *  @param longitude_1
   *  @param latitude_2
   *  @param longitude_2
   *  @param per_page
   *  @param page
   *  @param country
   *  @param language
   *  @return - the data from the api
  */
  var getEntitySearchByboundingbox = function (latitude_1, longitude_1, latitude_2, longitude_2, per_page, page, country, language, callback) {

    params = {};
    params.latitude_1 = latitude_1;
    params.longitude_1 = longitude_1;
    params.latitude_2 = latitude_2;
    params.longitude_2 = longitude_2;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search/byboundingbox",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param where - Location to search for results. E.g. Dublin e.g. Dublin
   *  @param per_page - How many results per page
   *  @param page - What page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @param latitude - The decimal latitude of the search context (optional)
   *  @param longitude - The decimal longitude of the search context (optional)
   *  @return - the data from the api
  */
  var getEntitySearchBylocation = function (where, per_page, page, country, language, latitude, longitude, callback) {

    params = {};
    params.where = where;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    params.latitude = latitude;
    params.longitude = longitude;
    
    doCurl("/entity/search/bylocation",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param what - What to get results for. E.g. Plumber e.g. plumber
   *  @param per_page - Number of results returned per page
   *  @param page - The page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @return - the data from the api
  */
  var getEntitySearchWhat = function (what, per_page, page, country, language, callback) {

    params = {};
    params.what = what;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search/what",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param what - What to get results for. E.g. Plumber e.g. plumber
   *  @param latitude_1 - Latitude of first point in bounding box e.g. 53.396842
   *  @param longitude_1 - Longitude of first point in bounding box e.g. -6.37619
   *  @param latitude_2 - Latitude of second point in bounding box e.g. 53.290463
   *  @param longitude_2 - Longitude of second point in bounding box e.g. -6.207275
   *  @param per_page
   *  @param page
   *  @param country - A valid ISO 3166 country code e.g. ie
   *  @param language
   *  @return - the data from the api
  */
  var getEntitySearchWhatByboundingbox = function (what, latitude_1, longitude_1, latitude_2, longitude_2, per_page, page, country, language, callback) {

    params = {};
    params.what = what;
    params.latitude_1 = latitude_1;
    params.longitude_1 = longitude_1;
    params.latitude_2 = latitude_2;
    params.longitude_2 = longitude_2;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search/what/byboundingbox",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param what - What to get results for. E.g. Plumber e.g. plumber
   *  @param where - The location to get results for. E.g. Dublin e.g. Dublin
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @param latitude - The decimal latitude of the search context (optional)
   *  @param longitude - The decimal longitude of the search context (optional)
   *  @return - the data from the api
  */
  var getEntitySearchWhatBylocation = function (what, where, per_page, page, country, language, latitude, longitude, callback) {

    params = {};
    params.what = what;
    params.where = where;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    params.latitude = latitude;
    params.longitude = longitude;
    
    doCurl("/entity/search/what/bylocation",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities, ordered by nearness
   *
   *  @param what - What to get results for. E.g. Plumber e.g. plumber
   *  @param country - The country to fetch results for e.g. gb
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @param language - An ISO compatible language code, E.g. en
   *  @param latitude - The decimal latitude of the centre point of the search
   *  @param longitude - The decimal longitude of the centre point of the search
   *  @return - the data from the api
  */
  var getEntitySearchWhatBynearest = function (what, country, per_page, page, language, latitude, longitude, callback) {

    params = {};
    params.what = what;
    params.country = country;
    params.per_page = per_page;
    params.page = page;
    params.language = language;
    params.latitude = latitude;
    params.longitude = longitude;
    
    doCurl("/entity/search/what/bynearest",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param who - Company name e.g. Starbucks
   *  @param per_page - How many results per page
   *  @param page - What page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @return - the data from the api
  */
  var getEntitySearchWho = function (who, per_page, page, country, language, callback) {

    params = {};
    params.who = who;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search/who",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param who
   *  @param latitude_1
   *  @param longitude_1
   *  @param latitude_2
   *  @param longitude_2
   *  @param per_page
   *  @param page
   *  @param country
   *  @param language - An ISO compatible language code, E.g. en
   *  @return - the data from the api
  */
  var getEntitySearchWhoByboundingbox = function (who, latitude_1, longitude_1, latitude_2, longitude_2, per_page, page, country, language, callback) {

    params = {};
    params.who = who;
    params.latitude_1 = latitude_1;
    params.longitude_1 = longitude_1;
    params.latitude_2 = latitude_2;
    params.longitude_2 = longitude_2;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search/who/byboundingbox",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param who - Company Name e.g. Starbucks
   *  @param where - The location to get results for. E.g. Dublin e.g. Dublin
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param latitude - The decimal latitude of the search context (optional)
   *  @param longitude - The decimal longitude of the search context (optional)
   *  @param language - An ISO compatible language code, E.g. en
   *  @return - the data from the api
  */
  var getEntitySearchWhoBylocation = function (who, where, per_page, page, country, latitude, longitude, language, callback) {

    params = {};
    params.who = who;
    params.where = where;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.latitude = latitude;
    params.longitude = longitude;
    params.language = language;
    
    doCurl("/entity/search/who/bylocation",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for entities matching the supplied 'who', ordered by nearness
   *
   *  @param who - What to get results for. E.g. Plumber e.g. plumber
   *  @param country - The country to fetch results for e.g. gb
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @param language - An ISO compatible language code, E.g. en
   *  @param latitude - The decimal latitude of the centre point of the search
   *  @param longitude - The decimal longitude of the centre point of the search
   *  @return - the data from the api
  */
  var getEntitySearchWhoBynearest = function (who, country, per_page, page, language, latitude, longitude, callback) {

    params = {};
    params.who = who;
    params.country = country;
    params.per_page = per_page;
    params.page = page;
    params.language = language;
    params.latitude = latitude;
    params.longitude = longitude;
    
    doCurl("/entity/search/who/bynearest",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Send an email to an email address specified in an entity
   *
   *  @param entity_id - The entity id of the entity you wish to contact
   *  @param gen_id - The gen_id of the email address you wish to send the message to
   *  @param from_email - The email of the person sending the message 
   *  @param subject - The subject for the email
   *  @param content - The content of the email
   *  @return - the data from the api
  */
  var postEntitySend_email = function (entity_id, gen_id, from_email, subject, content, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    params.from_email = from_email;
    params.subject = subject;
    params.content = content;
    
    doCurl("/entity/send_email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a social media object can be added.
   *
   *  @param entity_id
   *  @param type
   *  @param website_url
   *  @return - the data from the api
  */
  var postEntitySocialmedia = function (entity_id, type, website_url, callback) {

    params = {};
    params.entity_id = entity_id;
    params.type = type;
    params.website_url = website_url;
    
    doCurl("/entity/socialmedia",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a social media object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntitySocialmedia = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/socialmedia",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a website object can be added.
   *
   *  @param entity_id
   *  @param title
   *  @param description
   *  @param terms
   *  @param start_date
   *  @param expiry_date
   *  @param url
   *  @param image_url
   *  @return - the data from the api
  */
  var postEntitySpecial_offer = function (entity_id, title, description, terms, start_date, expiry_date, url, image_url, callback) {

    params = {};
    params.entity_id = entity_id;
    params.title = title;
    params.description = description;
    params.terms = terms;
    params.start_date = start_date;
    params.expiry_date = expiry_date;
    params.url = url;
    params.image_url = image_url;
    
    doCurl("/entity/special_offer",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a special offer object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntitySpecial_offer = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/special_offer",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a status object can be updated.
   *
   *  @param entity_id
   *  @param status
   *  @param inactive_reason
   *  @param inactive_description
   *  @return - the data from the api
  */
  var postEntityStatus = function (entity_id, status, inactive_reason, inactive_description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.status = status;
    params.inactive_reason = inactive_reason;
    params.inactive_description = inactive_description;
    
    doCurl("/entity/status",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an tag object can be added.
   *
   *  @param entity_id
   *  @param tag
   *  @param language
   *  @return - the data from the api
  */
  var postEntityTag = function (entity_id, tag, language, callback) {

    params = {};
    params.entity_id = entity_id;
    params.tag = tag;
    params.language = language;
    
    doCurl("/entity/tag",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a tag object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityTag = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/tag",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a testimonial object can be added.
   *
   *  @param entity_id
   *  @param title
   *  @param text
   *  @param date
   *  @param testifier_name
   *  @return - the data from the api
  */
  var postEntityTestimonial = function (entity_id, title, text, date, testifier_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.title = title;
    params.text = text;
    params.date = date;
    params.testifier_name = testifier_name;
    
    doCurl("/entity/testimonial",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a testimonial object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityTestimonial = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/testimonial",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the updates a uncontribute would perform
   *
   *  @param entity_id - The entity to pull
   *  @param object_name - The entity object to update
   *  @param supplier_id - The supplier_id to remove
   *  @param user_id - The user_id to remove
   *  @return - the data from the api
  */
  var getEntityUncontribute = function (entity_id, object_name, supplier_id, user_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.object_name = object_name;
    params.supplier_id = supplier_id;
    params.user_id = user_id;
    
    doCurl("/entity/uncontribute",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Separates an entity into two distinct entities 
   *
   *  @param entity_id
   *  @param supplier_masheryid
   *  @param supplier_id
   *  @return - the data from the api
  */
  var postEntityUnmerge = function (entity_id, supplier_masheryid, supplier_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.supplier_masheryid = supplier_masheryid;
    params.supplier_id = supplier_id;
    
    doCurl("/entity/unmerge",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a video object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityVideo = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/video",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a YouTube video object can be added.
   *
   *  @param entity_id
   *  @param embed_code
   *  @return - the data from the api
  */
  var postEntityVideoYoutube = function (entity_id, embed_code, callback) {

    params = {};
    params.entity_id = entity_id;
    params.embed_code = embed_code;
    
    doCurl("/entity/video/youtube",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a website object can be added.
   *
   *  @param entity_id
   *  @param website_url
   *  @param display_url
   *  @param website_description
   *  @param gen_id
   *  @return - the data from the api
  */
  var postEntityWebsite = function (entity_id, website_url, display_url, website_description, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.website_url = website_url;
    params.display_url = display_url;
    params.website_description = website_description;
    params.gen_id = gen_id;
    
    doCurl("/entity/website",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a website object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityWebsite = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/website",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add an entityserve document
   *
   *  @param entity_id - The id of the entity to create the entityserve event for
   *  @param country - the ISO code of the country
   *  @param event_type - The event type being recorded
   *  @return - the data from the api
  */
  var putEntityserve = function (entity_id, country, event_type, callback) {

    params = {};
    params.entity_id = entity_id;
    params.country = country;
    params.event_type = event_type;
    
    doCurl("/entityserve",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a flatpack
   *
   *  @param flatpack_id - the unique id to search for
   *  @return - the data from the api
  */
  var getFlatpack = function (flatpack_id, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    
    doCurl("/flatpack",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a flatpack
   *
   *  @param flatpack_id - this record's unique, auto-generated id - if supplied, then this is an edit, otherwise it's an add
   *  @param domainName - the domain name to serve this flatpack site on (no leading http:// or anything please)
   *  @param stub - the stub that is appended to the flatpack's url e.g. http://dev.localhost/stub
   *  @param flatpackName - the name of the Flat pack instance
   *  @param less - the LESS configuration to use to overrides the Bootstrap CSS
   *  @param language - the language in which to render the flatpack site
   *  @param country - the country to use for searches etc
   *  @param mapsType - the type of maps to use
   *  @param mapKey - the nokia map key to use to render maps
   *  @param searchFormShowOn - list of pages to show the search form
   *  @param searchFormShowKeywordsBox - whether to display the keywords box on the search form
   *  @param searchFormShowLocationBox - whether to display the location box on search forms - not required
   *  @param searchFormKeywordsAutoComplete - whether to do auto-completion on the keywords box on the search form
   *  @param searchFormLocationsAutoComplete - whether to do auto-completion on the locations box on the search form
   *  @param searchFormDefaultLocation - the string to use as the default location for searches if no location is supplied
   *  @param searchFormPlaceholderKeywords - the string to show in the keyword box as placeholder text e.g. e.g. cafe
   *  @param searchFormPlaceholderLocation - the string to show in the location box as placeholder text e.g. e.g. Dublin
   *  @param searchFormKeywordsLabel - the string to show next to the keywords control e.g. I'm looking for
   *  @param searchFormLocationLabel - the string to show next to the location control e.g. Located in
   *  @param cannedLinksHeader - the string to show above canned searches
   *  @param homepageTitle - the page title of site's home page
   *  @param homepageDescription - the meta description of the home page
   *  @param homepageIntroTitle - the introductory title for the homepage
   *  @param homepageIntroText - the introductory text for the homepage
   *  @param head - payload to put in the head of the flatpack
   *  @param adblock - payload to put in the adblock of the flatpack
   *  @param bodyTop - the payload to put in the top of the body of a flatpack
   *  @param bodyBottom - the payload to put in the bottom of the body of a flatpack
   *  @param header_menu - the JSON that describes a navigation at the top of the page
   *  @param header_menu_bottom - the JSON that describes a navigation below the masthead
   *  @param footer_menu - the JSON that describes a navigation at the bottom of the page
   *  @param bdpTitle - The page title of the entity business profile pages
   *  @param bdpDescription - The meta description of entity business profile pages
   *  @param bdpAds - The block of HTML/JS that renders Ads on BDPs
   *  @param serpTitle - The page title of the serps
   *  @param serpDescription - The meta description of serps
   *  @param serpNumberResults - The number of results per search page
   *  @param serpNumberAdverts - The number of adverts to show on the first search page
   *  @param serpAds - The block of HTML/JS that renders Ads on Serps
   *  @param serpTitleNoWhat - The text to display in the title for where only searches
   *  @param serpDescriptionNoWhat - The text to display in the description for where only searches
   *  @param cookiePolicyUrl - The cookie policy url of the flatpack
   *  @param cookiePolicyNotice - Whether to show the cookie policy on this flatpack
   *  @param addBusinessButtonText - The text used in the 'Add your business' button
   *  @param twitterUrl - Twitter link
   *  @param facebookUrl - Facebook link
   *  @param copyright - Copyright message
   *  @param phoneReveal - record phone number reveal
   *  @param loginLinkText - the link text for the Login link
   *  @param contextLocationId - The location ID to use as the context for searches on this flatpack
   *  @param addBusinessButtonPosition - The location ID to use as the context for searches on this flatpack
   *  @param denyIndexing - Whether to noindex a flatpack
   *  @param contextRadius - allows you to set a catchment area around the contextLocationId in miles for use when displaying the activity stream module
   *  @param activityStream - allows you to set the activity to be displayed in the activity stream
   *  @param activityStreamSize - Sets the number of items to show within the activity stream.
   *  @param products - A Collection of Central Index products the flatpack is allowed to sell
   *  @return - the data from the api
  */
  var postFlatpack = function (flatpack_id, domainName, stub, flatpackName, less, language, country, mapsType, mapKey, searchFormShowOn, searchFormShowKeywordsBox, searchFormShowLocationBox, searchFormKeywordsAutoComplete, searchFormLocationsAutoComplete, searchFormDefaultLocation, searchFormPlaceholderKeywords, searchFormPlaceholderLocation, searchFormKeywordsLabel, searchFormLocationLabel, cannedLinksHeader, homepageTitle, homepageDescription, homepageIntroTitle, homepageIntroText, head, adblock, bodyTop, bodyBottom, header_menu, header_menu_bottom, footer_menu, bdpTitle, bdpDescription, bdpAds, serpTitle, serpDescription, serpNumberResults, serpNumberAdverts, serpAds, serpTitleNoWhat, serpDescriptionNoWhat, cookiePolicyUrl, cookiePolicyNotice, addBusinessButtonText, twitterUrl, facebookUrl, copyright, phoneReveal, loginLinkText, contextLocationId, addBusinessButtonPosition, denyIndexing, contextRadius, activityStream, activityStreamSize, products, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.domainName = domainName;
    params.stub = stub;
    params.flatpackName = flatpackName;
    params.less = less;
    params.language = language;
    params.country = country;
    params.mapsType = mapsType;
    params.mapKey = mapKey;
    params.searchFormShowOn = searchFormShowOn;
    params.searchFormShowKeywordsBox = searchFormShowKeywordsBox;
    params.searchFormShowLocationBox = searchFormShowLocationBox;
    params.searchFormKeywordsAutoComplete = searchFormKeywordsAutoComplete;
    params.searchFormLocationsAutoComplete = searchFormLocationsAutoComplete;
    params.searchFormDefaultLocation = searchFormDefaultLocation;
    params.searchFormPlaceholderKeywords = searchFormPlaceholderKeywords;
    params.searchFormPlaceholderLocation = searchFormPlaceholderLocation;
    params.searchFormKeywordsLabel = searchFormKeywordsLabel;
    params.searchFormLocationLabel = searchFormLocationLabel;
    params.cannedLinksHeader = cannedLinksHeader;
    params.homepageTitle = homepageTitle;
    params.homepageDescription = homepageDescription;
    params.homepageIntroTitle = homepageIntroTitle;
    params.homepageIntroText = homepageIntroText;
    params.head = head;
    params.adblock = adblock;
    params.bodyTop = bodyTop;
    params.bodyBottom = bodyBottom;
    params.header_menu = header_menu;
    params.header_menu_bottom = header_menu_bottom;
    params.footer_menu = footer_menu;
    params.bdpTitle = bdpTitle;
    params.bdpDescription = bdpDescription;
    params.bdpAds = bdpAds;
    params.serpTitle = serpTitle;
    params.serpDescription = serpDescription;
    params.serpNumberResults = serpNumberResults;
    params.serpNumberAdverts = serpNumberAdverts;
    params.serpAds = serpAds;
    params.serpTitleNoWhat = serpTitleNoWhat;
    params.serpDescriptionNoWhat = serpDescriptionNoWhat;
    params.cookiePolicyUrl = cookiePolicyUrl;
    params.cookiePolicyNotice = cookiePolicyNotice;
    params.addBusinessButtonText = addBusinessButtonText;
    params.twitterUrl = twitterUrl;
    params.facebookUrl = facebookUrl;
    params.copyright = copyright;
    params.phoneReveal = phoneReveal;
    params.loginLinkText = loginLinkText;
    params.contextLocationId = contextLocationId;
    params.addBusinessButtonPosition = addBusinessButtonPosition;
    params.denyIndexing = denyIndexing;
    params.contextRadius = contextRadius;
    params.activityStream = activityStream;
    params.activityStreamSize = activityStreamSize;
    params.products = products;
    
    doCurl("/flatpack",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Remove a flatpack using a supplied flatpack_id
   *
   *  @param flatpack_id - the id of the flatpack to delete
   *  @return - the data from the api
  */
  var deleteFlatpack = function (flatpack_id, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    
    doCurl("/flatpack",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Upload a CSS file for the Admin for this flatpack
   *
   *  @param flatpack_id - the id of the flatpack to update
   *  @param filedata
   *  @return - the data from the api
  */
  var postFlatpackAdminCSS = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/adminCSS",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Upload an image to serve out as the large logo in the Admin for this flatpack
   *
   *  @param flatpack_id - the id of the flatpack to update
   *  @param filedata
   *  @return - the data from the api
  */
  var postFlatpackAdminLargeLogo = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/adminLargeLogo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Upload an image to serve out as the small logo in the Admin for this flatpack
   *
   *  @param flatpack_id - the id of the flatpack to update
   *  @param filedata
   *  @return - the data from the api
  */
  var postFlatpackAdminSmallLogo = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/adminSmallLogo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a flatpack using a domain name
   *
   *  @param domainName - the domain name to search for
   *  @return - the data from the api
  */
  var getFlatpackBy_domain_name = function (domainName, callback) {

    params = {};
    params.domainName = domainName;
    
    doCurl("/flatpack/by_domain_name",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get flatpacks that match the supplied masheryid
   *
   *  @return - the data from the api
  */
  var getFlatpackBy_masheryid = function (callback) {

    params = {};
    
    doCurl("/flatpack/by_masheryid",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Clone an existing flatpack
   *
   *  @param flatpack_id - the flatpack_id to clone
   *  @param domainName - the domain of the new flatpack site (no leading http:// or anything please)
   *  @return - the data from the api
  */
  var getFlatpackClone = function (flatpack_id, domainName, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.domainName = domainName;
    
    doCurl("/flatpack/clone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Upload an icon to serve out with this flatpack
   *
   *  @param flatpack_id - the id of the flatpack to update
   *  @param filedata
   *  @return - the data from the api
  */
  var postFlatpackIcon = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/icon",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Remove a canned link to an existing flatpack site.
   *
   *  @param flatpack_id - the id of the flatpack to delete
   *  @param gen_id - the id of the canned link to remove
   *  @return - the data from the api
  */
  var deleteFlatpackLink = function (flatpack_id, gen_id, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.gen_id = gen_id;
    
    doCurl("/flatpack/link",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a canned link to an existing flatpack site.
   *
   *  @param flatpack_id - the id of the flatpack to delete
   *  @param keywords - the keywords to use in the canned search
   *  @param location - the location to use in the canned search
   *  @param linkText - the link text to be used to in the canned search link
   *  @return - the data from the api
  */
  var postFlatpackLink = function (flatpack_id, keywords, location, linkText, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.keywords = keywords;
    params.location = location;
    params.linkText = linkText;
    
    doCurl("/flatpack/link",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Upload a logo to serve out with this flatpack
   *
   *  @param flatpack_id - the id of the flatpack to update
   *  @param filedata
   *  @return - the data from the api
  */
  var postFlatpackLogo = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Upload a TXT file to act as the sitemap for this flatpack
   *
   *  @param flatpack_id - the id of the flatpack to update
   *  @param filedata
   *  @return - the data from the api
  */
  var postFlatpackSitemap = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/sitemap",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Upload a file to our asset server and return the url
   *
   *  @param filedata
   *  @return - the data from the api
  */
  var postFlatpackUpload = function (filedata, callback) {

    params = {};
    params.filedata = filedata;
    
    doCurl("/flatpack/upload",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns group that matches a given group id
   *
   *  @param group_id
   *  @return - the data from the api
  */
  var getGroup = function (group_id, callback) {

    params = {};
    params.group_id = group_id;
    
    doCurl("/group",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Delete a group with a specified group_id
   *
   *  @param group_id
   *  @return - the data from the api
  */
  var deleteGroup = function (group_id, callback) {

    params = {};
    params.group_id = group_id;
    
    doCurl("/group",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a Group
   *
   *  @param group_id
   *  @param name
   *  @param description
   *  @param url
   *  @return - the data from the api
  */
  var postGroup = function (group_id, name, description, url, callback) {

    params = {};
    params.group_id = group_id;
    params.name = name;
    params.description = description;
    params.url = url;
    
    doCurl("/group",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns all groups
   *
   *  @return - the data from the api
  */
  var getGroupAll = function (callback) {

    params = {};
    
    doCurl("/group/all",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Bulk delete entities from a specified group
   *
   *  @param group_id
   *  @param filedata
   *  @return - the data from the api
  */
  var postGroupBulk_delete = function (group_id, filedata, callback) {

    params = {};
    params.group_id = group_id;
    params.filedata = filedata;
    
    doCurl("/group/bulk_delete",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Bulk ingest entities into a specified group
   *
   *  @param group_id
   *  @param filedata
   *  @param category_type
   *  @return - the data from the api
  */
  var postGroupBulk_ingest = function (group_id, filedata, category_type, callback) {

    params = {};
    params.group_id = group_id;
    params.filedata = filedata;
    params.category_type = category_type;
    
    doCurl("/group/bulk_ingest",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Bulk update entities with a specified group
   *
   *  @param group_id
   *  @param data
   *  @return - the data from the api
  */
  var postGroupBulk_update = function (group_id, data, callback) {

    params = {};
    params.group_id = group_id;
    params.data = data;
    
    doCurl("/group/bulk_update",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get number of claims today
   *
   *  @param from_date
   *  @param to_date
   *  @param country_id
   *  @return - the data from the api
  */
  var getHeartbeatBy_date = function (from_date, to_date, country_id, callback) {

    params = {};
    params.from_date = from_date;
    params.to_date = to_date;
    params.country_id = country_id;
    
    doCurl("/heartbeat/by_date",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get number of claims today
   *
   *  @param country
   *  @param claim_type
   *  @return - the data from the api
  */
  var getHeartbeatTodayClaims = function (country, claim_type, callback) {

    params = {};
    params.country = country;
    params.claim_type = claim_type;
    
    doCurl("/heartbeat/today/claims",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Process a bulk file
   *
   *  @param job_id
   *  @param filedata - A tab separated file for ingest
   *  @return - the data from the api
  */
  var postIngest_file = function (job_id, filedata, callback) {

    params = {};
    params.job_id = job_id;
    params.filedata = filedata;
    
    doCurl("/ingest_file",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get an ingest job from the collection
   *
   *  @param job_id
   *  @return - the data from the api
  */
  var getIngest_job = function (job_id, callback) {

    params = {};
    params.job_id = job_id;
    
    doCurl("/ingest_job",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a ingest job to the collection
   *
   *  @param description
   *  @param category_type
   *  @return - the data from the api
  */
  var postIngest_job = function (description, category_type, callback) {

    params = {};
    params.description = description;
    params.category_type = category_type;
    
    doCurl("/ingest_job",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get an ingest log from the collection
   *
   *  @param job_id
   *  @param success
   *  @param errors
   *  @param limit
   *  @param skip
   *  @return - the data from the api
  */
  var getIngest_logBy_job_id = function (job_id, success, errors, limit, skip, callback) {

    params = {};
    params.job_id = job_id;
    params.success = success;
    params.errors = errors;
    params.limit = limit;
    params.skip = skip;
    
    doCurl("/ingest_log/by_job_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Check the status of the Ingest queue, and potentially flush it
   *
   *  @param flush
   *  @return - the data from the api
  */
  var getIngest_queue = function (flush, callback) {

    params = {};
    params.flush = flush;
    
    doCurl("/ingest_queue",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Read a location with the supplied ID in the locations reference database.
   *
   *  @param location_id
   *  @return - the data from the api
  */
  var getLocation = function (location_id, callback) {

    params = {};
    params.location_id = location_id;
    
    doCurl("/location",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create/update a new locz document with the supplied ID in the locations reference database.
   *
   *  @param location_id
   *  @param type
   *  @param country
   *  @param language
   *  @param name
   *  @param formal_name
   *  @param resolution
   *  @param population
   *  @param description
   *  @param timezone
   *  @param latitude
   *  @param longitude
   *  @param parent_town
   *  @param parent_county
   *  @param parent_province
   *  @param parent_region
   *  @param parent_neighbourhood
   *  @param parent_district
   *  @param postalcode
   *  @param searchable_id
   *  @param searchable_ids
   *  @return - the data from the api
  */
  var postLocation = function (location_id, type, country, language, name, formal_name, resolution, population, description, timezone, latitude, longitude, parent_town, parent_county, parent_province, parent_region, parent_neighbourhood, parent_district, postalcode, searchable_id, searchable_ids, callback) {

    params = {};
    params.location_id = location_id;
    params.type = type;
    params.country = country;
    params.language = language;
    params.name = name;
    params.formal_name = formal_name;
    params.resolution = resolution;
    params.population = population;
    params.description = description;
    params.timezone = timezone;
    params.latitude = latitude;
    params.longitude = longitude;
    params.parent_town = parent_town;
    params.parent_county = parent_county;
    params.parent_province = parent_province;
    params.parent_region = parent_region;
    params.parent_neighbourhood = parent_neighbourhood;
    params.parent_district = parent_district;
    params.postalcode = postalcode;
    params.searchable_id = searchable_id;
    params.searchable_ids = searchable_ids;
    
    doCurl("/location",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Given a location_id or a lat/lon, find other locations within the radius
   *
   *  @param location_id
   *  @param latitude
   *  @param longitude
   *  @param radius - Radius in km
   *  @param resolution
   *  @param country
   *  @return - the data from the api
  */
  var getLocationContext = function (location_id, latitude, longitude, radius, resolution, country, callback) {

    params = {};
    params.location_id = location_id;
    params.latitude = latitude;
    params.longitude = longitude;
    params.radius = radius;
    params.resolution = resolution;
    params.country = country;
    
    doCurl("/location/context",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Read multiple locations with the supplied ID in the locations reference database.
   *
   *  @param location_ids
   *  @return - the data from the api
  */
  var getLocationMultiple = function (location_ids, callback) {

    params = {};
    params.location_ids = location_ids;
    
    doCurl("/location/multiple",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the project logo, the symbol of the Wolf
   *
   *  @param a
   *  @return - the data from the api
  */
  var putLogo = function (a, callback) {

    params = {};
    params.a = a;
    
    doCurl("/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the project logo, the symbol of the Wolf
   *
   *  @param a
   *  @param b
   *  @param c
   *  @param d
   *  @return - the data from the api
  */
  var getLogo = function (a, b, c, d, callback) {

    params = {};
    params.a = a;
    params.b = b;
    params.c = c;
    params.d = d;
    
    doCurl("/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find a category from cache or cloudant depending if it is in the cache
   *
   *  @param string - A string to search against, E.g. Plumbers
   *  @param language - An ISO compatible language code, E.g. en
   *  @return - the data from the api
  */
  var getLookupCategory = function (string, language, callback) {

    params = {};
    params.string = string;
    params.language = language;
    
    doCurl("/lookup/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find a category from a legacy ID or supplier (e.g. bill_moss)
   *
   *  @param id
   *  @param type
   *  @return - the data from the api
  */
  var getLookupLegacyCategory = function (id, type, callback) {

    params = {};
    params.id = id;
    params.type = type;
    
    doCurl("/lookup/legacy/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find a location from cache or cloudant depending if it is in the cache (locz)
   *
   *  @param string
   *  @param language
   *  @param country
   *  @param latitude
   *  @param longitude
   *  @return - the data from the api
  */
  var getLookupLocation = function (string, language, country, latitude, longitude, callback) {

    params = {};
    params.string = string;
    params.language = language;
    params.country = country;
    params.latitude = latitude;
    params.longitude = longitude;
    
    doCurl("/lookup/location",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find all matches by phone number and then return all matches that also match company name and location. Default location_strictness is defined in Km and the default is set to 0.2 (200m)
   *
   *  @param phone
   *  @param company_name
   *  @param latitude
   *  @param longitude
   *  @param postcode
   *  @param country
   *  @param name_strictness
   *  @param location_strictness
   *  @return - the data from the api
  */
  var getMatchByphone = function (phone, company_name, latitude, longitude, postcode, country, name_strictness, location_strictness, callback) {

    params = {};
    params.phone = phone;
    params.company_name = company_name;
    params.latitude = latitude;
    params.longitude = longitude;
    params.postcode = postcode;
    params.country = country;
    params.name_strictness = name_strictness;
    params.location_strictness = location_strictness;
    
    doCurl("/match/byphone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find all matches by phone number, returning up to 10 matches
   *
   *  @param phone
   *  @param country
   *  @param exclude - Entity ID to exclude from the results
   *  @return - the data from the api
  */
  var getMatchByphone2 = function (phone, country, exclude, callback) {

    params = {};
    params.phone = phone;
    params.country = country;
    params.exclude = exclude;
    
    doCurl("/match/byphone2",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Perform a match on the two supplied entities, returning the outcome and showing our working
   *
   *  @param primary_entity_id
   *  @param secondary_entity_id
   *  @param return_entities - Should we return the entity documents
   *  @return - the data from the api
  */
  var getMatchOftheday = function (primary_entity_id, secondary_entity_id, return_entities, callback) {

    params = {};
    params.primary_entity_id = primary_entity_id;
    params.secondary_entity_id = secondary_entity_id;
    params.return_entities = return_entities;
    
    doCurl("/match/oftheday",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create a matching log
   *
   *  @param processed_entity_id
   *  @param matched_entity_id
   *  @param processed_mega
   *  @param matched_mega
   *  @param processed_group
   *  @param matched_group
   *  @param merged
   *  @return - the data from the api
  */
  var putMatching_log = function (processed_entity_id, matched_entity_id, processed_mega, matched_mega, processed_group, matched_group, merged, callback) {

    params = {};
    params.processed_entity_id = processed_entity_id;
    params.matched_entity_id = matched_entity_id;
    params.processed_mega = processed_mega;
    params.matched_mega = matched_mega;
    params.processed_group = processed_group;
    params.matched_group = matched_group;
    params.merged = merged;
    
    doCurl("/matching_log",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a message
   *
   *  @param message_id - Message id to pull
   *  @param ses_id - Aamazon email id
   *  @param from_user_id - User sending the message
   *  @param from_email - Sent from email address
   *  @param to_entity_id - The id of the entity being sent the message
   *  @param to_email - Sent from email address
   *  @param subject - Subject for the message
   *  @param body - Body for the message
   *  @param bounced - If the message bounced
   *  @return - the data from the api
  */
  var postMessage = function (message_id, ses_id, from_user_id, from_email, to_entity_id, to_email, subject, body, bounced, callback) {

    params = {};
    params.message_id = message_id;
    params.ses_id = ses_id;
    params.from_user_id = from_user_id;
    params.from_email = from_email;
    params.to_entity_id = to_entity_id;
    params.to_email = to_email;
    params.subject = subject;
    params.body = body;
    params.bounced = bounced;
    
    doCurl("/message",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetching a message
   *
   *  @param message_id - The message id to pull the message for
   *  @return - the data from the api
  */
  var getMessage = function (message_id, callback) {

    params = {};
    params.message_id = message_id;
    
    doCurl("/message",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetching messages by ses_id
   *
   *  @param ses_id - The amazon id to pull the message for
   *  @return - the data from the api
  */
  var getMessageBy_ses_id = function (ses_id, callback) {

    params = {};
    params.ses_id = ses_id;
    
    doCurl("/message/by_ses_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a private object can be added.
   *
   *  @param entity_id - The entity to associate the private object with
   *  @param data - The data to store
   *  @return - the data from the api
  */
  var putPrivate_object = function (entity_id, data, callback) {

    params = {};
    params.entity_id = entity_id;
    params.data = data;
    
    doCurl("/private_object",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a private object to be removed
   *
   *  @param private_object_id - The id of the private object to remove
   *  @return - the data from the api
  */
  var deletePrivate_object = function (private_object_id, callback) {

    params = {};
    params.private_object_id = private_object_id;
    
    doCurl("/private_object",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a private object to be returned based on the entity_id and masheryid
   *
   *  @param entity_id - The entity associated with the private object
   *  @return - the data from the api
  */
  var getPrivate_objectAll = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/private_object/all",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a product
   *
   *  @param product_id - The ID of the product
   *  @param name - The name of the product
   *  @param strapline - The description of the product
   *  @param price - The price of the product
   *  @param tax_rate - The tax markup for this product
   *  @param currency - The currency in which the price is in
   *  @param active - is this an active product
   *  @param billing_period
   *  @param title - Title of the product
   *  @param intro_paragraph - introduction paragraph
   *  @param bullets - product features
   *  @param outro_paragraph - closing paragraph
   *  @return - the data from the api
  */
  var postProduct = function (product_id, name, strapline, price, tax_rate, currency, active, billing_period, title, intro_paragraph, bullets, outro_paragraph, callback) {

    params = {};
    params.product_id = product_id;
    params.name = name;
    params.strapline = strapline;
    params.price = price;
    params.tax_rate = tax_rate;
    params.currency = currency;
    params.active = active;
    params.billing_period = billing_period;
    params.title = title;
    params.intro_paragraph = intro_paragraph;
    params.bullets = bullets;
    params.outro_paragraph = outro_paragraph;
    
    doCurl("/product",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns the product information given a valid product_id
   *
   *  @param product_id
   *  @return - the data from the api
  */
  var getProduct = function (product_id, callback) {

    params = {};
    params.product_id = product_id;
    
    doCurl("/product",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Removes a provisioning object from product
   *
   *  @param product_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteProductProvisioning = function (product_id, gen_id, callback) {

    params = {};
    params.product_id = product_id;
    params.gen_id = gen_id;
    
    doCurl("/product/provisioning",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Adds advertising provisioning object to a product
   *
   *  @param product_id
   *  @param publisher_id
   *  @param max_tags
   *  @param max_locations
   *  @return - the data from the api
  */
  var postProductProvisioningAdvert = function (product_id, publisher_id, max_tags, max_locations, callback) {

    params = {};
    params.product_id = product_id;
    params.publisher_id = publisher_id;
    params.max_tags = max_tags;
    params.max_locations = max_locations;
    
    doCurl("/product/provisioning/advert",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Adds claim provisioning object to a product
   *
   *  @param product_id
   *  @return - the data from the api
  */
  var postProductProvisioningClaim = function (product_id, callback) {

    params = {};
    params.product_id = product_id;
    
    doCurl("/product/provisioning/claim",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Adds syndication provisioning object to a product
   *
   *  @param product_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var postProductProvisioningSyndication = function (product_id, publisher_id, callback) {

    params = {};
    params.product_id = product_id;
    params.publisher_id = publisher_id;
    
    doCurl("/product/provisioning/syndication",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Perform the whole PTB process on the supplied entity
   *
   *  @param entity_id
   *  @param destructive
   *  @return - the data from the api
  */
  var getPtbAll = function (entity_id, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.destructive = destructive;
    
    doCurl("/ptb/all",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Report on what happened to specific entity_id
   *
   *  @param year - the year to examine
   *  @param month - the month to examine
   *  @param entity_id - the entity to research
   *  @return - the data from the api
  */
  var getPtbLog = function (year, month, entity_id, callback) {

    params = {};
    params.year = year;
    params.month = month;
    params.entity_id = entity_id;
    
    doCurl("/ptb/log",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Process an entity with a specific PTB module
   *
   *  @param entity_id
   *  @param module
   *  @param destructive
   *  @return - the data from the api
  */
  var getPtbModule = function (entity_id, module, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.module = module;
    params.destructive = destructive;
    
    doCurl("/ptb/module",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Report on the run-rate of the Paint the Bridge System
   *
   *  @param country - the country to get the runrate for
   *  @param year - the year to examine
   *  @param month - the month to examine
   *  @param day - the day to examine
   *  @return - the data from the api
  */
  var getPtbRunrate = function (country, year, month, day, callback) {

    params = {};
    params.country = country;
    params.year = year;
    params.month = month;
    params.day = day;
    
    doCurl("/ptb/runrate",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Report on the value being added by Paint The Bridge
   *
   *  @param country - the country to get the runrate for
   *  @param year - the year to examine
   *  @param month - the month to examine
   *  @param day - the day to examine
   *  @return - the data from the api
  */
  var getPtbValueadded = function (country, year, month, day, callback) {

    params = {};
    params.country = country;
    params.year = year;
    params.month = month;
    params.day = day;
    
    doCurl("/ptb/valueadded",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a publisher
   *
   *  @param publisher_id
   *  @param country
   *  @param name
   *  @param description
   *  @param active
   *  @return - the data from the api
  */
  var postPublisher = function (publisher_id, country, name, description, active, callback) {

    params = {};
    params.publisher_id = publisher_id;
    params.country = country;
    params.name = name;
    params.description = description;
    params.active = active;
    
    doCurl("/publisher",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns publisher that matches a given publisher id
   *
   *  @param publisher_id
   *  @return - the data from the api
  */
  var getPublisher = function (publisher_id, callback) {

    params = {};
    params.publisher_id = publisher_id;
    
    doCurl("/publisher",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Delete a publisher with a specified publisher_id
   *
   *  @param publisher_id
   *  @return - the data from the api
  */
  var deletePublisher = function (publisher_id, callback) {

    params = {};
    params.publisher_id = publisher_id;
    
    doCurl("/publisher",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns publisher that matches a given publisher id
   *
   *  @param country
   *  @return - the data from the api
  */
  var getPublisherByCountry = function (country, callback) {

    params = {};
    params.country = country;
    
    doCurl("/publisher/byCountry",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns publishers that are available for a given entity_id.
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var getPublisherByEntityId = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/publisher/byEntityId",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known queue id, a queue item can be removed.
   *
   *  @param queue_id
   *  @return - the data from the api
  */
  var deleteQueue = function (queue_id, callback) {

    params = {};
    params.queue_id = queue_id;
    
    doCurl("/queue",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Retrieve queue items.
   *
   *  @param limit
   *  @param queue_name
   *  @return - the data from the api
  */
  var getQueue = function (limit, queue_name, callback) {

    params = {};
    params.limit = limit;
    params.queue_name = queue_name;
    
    doCurl("/queue",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create a queue item
   *
   *  @param queue_name
   *  @param data
   *  @return - the data from the api
  */
  var putQueue = function (queue_name, data, callback) {

    params = {};
    params.queue_name = queue_name;
    params.data = data;
    
    doCurl("/queue",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add an error to a queue item
   *
   *  @param queue_id
   *  @param error
   *  @return - the data from the api
  */
  var postQueueError = function (queue_id, error, callback) {

    params = {};
    params.queue_id = queue_id;
    params.error = error;
    
    doCurl("/queue/error",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find a queue item by its type and id
   *
   *  @param type
   *  @param id
   *  @return - the data from the api
  */
  var getQueueSearch = function (type, id, callback) {

    params = {};
    params.type = type;
    params.id = id;
    
    doCurl("/queue/search",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Unlock queue items.
   *
   *  @param queue_name
   *  @param seconds
   *  @return - the data from the api
  */
  var postQueueUnlock = function (queue_name, seconds, callback) {

    params = {};
    params.queue_name = queue_name;
    params.seconds = seconds;
    
    doCurl("/queue/unlock",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a reseller
   *
   *  @param reseller_id
   *  @param country
   *  @param name
   *  @param description
   *  @param active
   *  @return - the data from the api
  */
  var postReseller = function (reseller_id, country, name, description, active, callback) {

    params = {};
    params.reseller_id = reseller_id;
    params.country = country;
    params.name = name;
    params.description = description;
    params.active = active;
    
    doCurl("/reseller",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns reseller that matches a given reseller id
   *
   *  @param reseller_id
   *  @return - the data from the api
  */
  var getReseller = function (reseller_id, callback) {

    params = {};
    params.reseller_id = reseller_id;
    
    doCurl("/reseller",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Return a sales log by id
   *
   *  @param sales_log_id - The sales log id to pull
   *  @return - the data from the api
  */
  var getSales_log = function (sales_log_id, callback) {

    params = {};
    params.sales_log_id = sales_log_id;
    
    doCurl("/sales_log",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Return a sales log by id
   *
   *  @param from_date
   *  @param country
   *  @param action_type
   *  @return - the data from the api
  */
  var getSales_logBy_countryBy_date = function (from_date, country, action_type, callback) {

    params = {};
    params.from_date = from_date;
    params.country = country;
    params.action_type = action_type;
    
    doCurl("/sales_log/by_country/by_date",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Return a sales log by id
   *
   *  @param from_date
   *  @param to_date
   *  @return - the data from the api
  */
  var getSales_logBy_date = function (from_date, to_date, callback) {

    params = {};
    params.from_date = from_date;
    params.to_date = to_date;
    
    doCurl("/sales_log/by_date",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Log a sale
   *
   *  @param entity_id - The entity the sale was made against
   *  @param country - The country code the sales log orginated
   *  @param action_type - The type of action we are performing
   *  @param publisher_id - The publisher id that has made the sale
   *  @param mashery_id - The mashery id
   *  @param reseller_ref - The reference of the sale made by the seller
   *  @param reseller_agent_id - The id of the agent selling the product
   *  @param max_tags - The number of tags available to the entity
   *  @param max_locations - The number of locations available to the entity
   *  @param extra_tags - The extra number of tags
   *  @param extra_locations - The extra number of locations
   *  @param expiry_date - The date the product expires
   *  @return - the data from the api
  */
  var postSales_logEntity = function (entity_id, country, action_type, publisher_id, mashery_id, reseller_ref, reseller_agent_id, max_tags, max_locations, extra_tags, extra_locations, expiry_date, callback) {

    params = {};
    params.entity_id = entity_id;
    params.country = country;
    params.action_type = action_type;
    params.publisher_id = publisher_id;
    params.mashery_id = mashery_id;
    params.reseller_ref = reseller_ref;
    params.reseller_agent_id = reseller_agent_id;
    params.max_tags = max_tags;
    params.max_locations = max_locations;
    params.extra_tags = extra_tags;
    params.extra_locations = extra_locations;
    params.expiry_date = expiry_date;
    
    doCurl("/sales_log/entity",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a Sales Log document for a syndication action
   *
   *  @param action_type
   *  @param syndication_type
   *  @param publisher_id
   *  @param expiry_date
   *  @param entity_id
   *  @param group_id
   *  @param seed_masheryid
   *  @param supplier_masheryid
   *  @param country
   *  @param reseller_masheryid
   *  @return - the data from the api
  */
  var postSales_logSyndication = function (action_type, syndication_type, publisher_id, expiry_date, entity_id, group_id, seed_masheryid, supplier_masheryid, country, reseller_masheryid, callback) {

    params = {};
    params.action_type = action_type;
    params.syndication_type = syndication_type;
    params.publisher_id = publisher_id;
    params.expiry_date = expiry_date;
    params.entity_id = entity_id;
    params.group_id = group_id;
    params.seed_masheryid = seed_masheryid;
    params.supplier_masheryid = supplier_masheryid;
    params.country = country;
    params.reseller_masheryid = reseller_masheryid;
    
    doCurl("/sales_log/syndication",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * For insance, reporting a phone number as wrong
   *
   *  @param entity_id - A valid entity_id e.g. 379236608286720
   *  @param country - The country code from where the signal originated e.g. ie
   *  @param gen_id - The gen_id for the item being reported
   *  @param signal_type - The signal that is to be reported e.g. wrong
   *  @param data_type - The type of data being reported
   *  @param inactive_reason - The reason for making the entity inactive
   *  @param inactive_description - A description to accompany the inactive reasoning
   *  @return - the data from the api
  */
  var postSignal = function (entity_id, country, gen_id, signal_type, data_type, inactive_reason, inactive_description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.country = country;
    params.gen_id = gen_id;
    params.signal_type = signal_type;
    params.data_type = data_type;
    params.inactive_reason = inactive_reason;
    params.inactive_description = inactive_description;
    
    doCurl("/signal",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the number of times an entity has been served out as an advert or on serps/bdp pages
   *
   *  @param entity_id - A valid entity_id e.g. 379236608286720
   *  @param year - The year to report on
   *  @param month - The month to report on
   *  @return - the data from the api
  */
  var getStatsEntityBy_date = function (entity_id, year, month, callback) {

    params = {};
    params.entity_id = entity_id;
    params.year = year;
    params.month = month;
    
    doCurl("/stats/entity/by_date",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the stats on an entity in a given year
   *
   *  @param entity_id - A valid entity_id e.g. 379236608286720
   *  @param year - The year to report on
   *  @return - the data from the api
  */
  var getStatsEntityBy_year = function (entity_id, year, callback) {

    params = {};
    params.entity_id = entity_id;
    params.year = year;
    
    doCurl("/stats/entity/by_year",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Confirms that the API is active, and returns the current version number
   *
   *  @return - the data from the api
  */
  var getStatus = function (callback) {

    params = {};
    
    doCurl("/status",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * get a Syndication
   *
   *  @param syndication_id
   *  @return - the data from the api
  */
  var getSyndication = function (syndication_id, callback) {

    params = {};
    params.syndication_id = syndication_id;
    
    doCurl("/syndication",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a Syndicate
   *
   *  @param syndication_type
   *  @param publisher_id
   *  @param expiry_date
   *  @param entity_id
   *  @param group_id
   *  @param seed_masheryid
   *  @param supplier_masheryid
   *  @param country
   *  @return - the data from the api
  */
  var postSyndicationCreate = function (syndication_type, publisher_id, expiry_date, entity_id, group_id, seed_masheryid, supplier_masheryid, country, callback) {

    params = {};
    params.syndication_type = syndication_type;
    params.publisher_id = publisher_id;
    params.expiry_date = expiry_date;
    params.entity_id = entity_id;
    params.group_id = group_id;
    params.seed_masheryid = seed_masheryid;
    params.supplier_masheryid = supplier_masheryid;
    params.country = country;
    
    doCurl("/syndication/create",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Renew a Syndicate
   *
   *  @param syndication_type
   *  @param publisher_id
   *  @param entity_id
   *  @param group_id
   *  @param seed_masheryid
   *  @param supplier_masheryid
   *  @param country
   *  @param reseller_masheryid - This parameter is derived from the incoming Mashery API key and is stored as reseller_masheryid in the syndication document.
   *  @param expiry_date
   *  @return - the data from the api
  */
  var postSyndicationRenew = function (syndication_type, publisher_id, entity_id, group_id, seed_masheryid, supplier_masheryid, country, reseller_masheryid, expiry_date, callback) {

    params = {};
    params.syndication_type = syndication_type;
    params.publisher_id = publisher_id;
    params.entity_id = entity_id;
    params.group_id = group_id;
    params.seed_masheryid = seed_masheryid;
    params.supplier_masheryid = supplier_masheryid;
    params.country = country;
    params.reseller_masheryid = reseller_masheryid;
    params.expiry_date = expiry_date;
    
    doCurl("/syndication/renew",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * When we get a syndication update make a record of it
   *
   *  @param entity_id - The entity to pull
   *  @param publisher_id - The publisher this log entry refers to
   *  @param action - The log type
   *  @param success - If the syndication was successful
   *  @param message - An optional message e.g. submitted to the syndication partner
   *  @param syndicated_id - The entity as known to the publisher
   *  @return - the data from the api
  */
  var postSyndication_log = function (entity_id, publisher_id, action, success, message, syndicated_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.publisher_id = publisher_id;
    params.action = action;
    params.success = success;
    params.message = message;
    params.syndicated_id = syndicated_id;
    
    doCurl("/syndication_log",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get all syndication log entries for a given entity id
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var getSyndication_logBy_entity_id = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/syndication_log/by_entity_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the latest syndication log feedback entry for a given entity id and publisher
   *
   *  @param entity_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var getSyndication_logLast_syndicated_id = function (entity_id, publisher_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.publisher_id = publisher_id;
    
    doCurl("/syndication_log/last_syndicated_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Provides a tokenised URL to redirect a user so they can add an entity to Central Index
   *
   *  @param language - The language to use to render the add path e.g. en
   *  @param portal_name - The name of the website that data is to be added on e.g. YourLocal
   *  @param country - The country of the entity to be added e.g. gb
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @return - the data from the api
  */
  var getTokenAdd = function (language, portal_name, country, flatpack_id, callback) {

    params = {};
    params.language = language;
    params.portal_name = portal_name;
    params.country = country;
    params.flatpack_id = flatpack_id;
    
    doCurl("/token/add",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Provides a tokenised URL to redirect a user to claim an entity on Central Index
   *
   *  @param entity_id - Entity ID to be claimed e.g. 380348266819584
   *  @param language - The language to use to render the claim path e.g. en
   *  @param portal_name - The name of the website that entity is being claimed on e.g. YourLocal
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @return - the data from the api
  */
  var getTokenClaim = function (entity_id, language, portal_name, flatpack_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.language = language;
    params.portal_name = portal_name;
    params.flatpack_id = flatpack_id;
    
    doCurl("/token/claim",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows us to identify the user, entity and element from an encoded endpoint URL's token
   *
   *  @param token
   *  @return - the data from the api
  */
  var getTokenDecode = function (token, callback) {

    params = {};
    params.token = token;
    
    doCurl("/token/decode",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch token for edit path
   *
   *  @param entity_id - The id of the entity being upgraded
   *  @param language - The language for the app
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @param edit_page - the page in the edit path that the user should land on
   *  @return - the data from the api
  */
  var getTokenEdit = function (entity_id, language, flatpack_id, edit_page, callback) {

    params = {};
    params.entity_id = entity_id;
    params.language = language;
    params.flatpack_id = flatpack_id;
    params.edit_page = edit_page;
    
    doCurl("/token/edit",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch token for login path
   *
   *  @param portal_name - The name of the application that has initiated the login process, example: 'Your Local'
   *  @param language - The language for the app
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @return - the data from the api
  */
  var getTokenLogin = function (portal_name, language, flatpack_id, callback) {

    params = {};
    params.portal_name = portal_name;
    params.language = language;
    params.flatpack_id = flatpack_id;
    
    doCurl("/token/login",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch token for messaging path
   *
   *  @param entity_id - The id of the entity being messaged
   *  @param portal_name - The name of the application that has initiated the email process, example: 'Your Local'
   *  @param language - The language for the app
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @return - the data from the api
  */
  var getTokenMessage = function (entity_id, portal_name, language, flatpack_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.portal_name = portal_name;
    params.language = language;
    params.flatpack_id = flatpack_id;
    
    doCurl("/token/message",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch token for product path
   *
   *  @param entity_id - The id of the entity to add a product to
   *  @param product_id - The product id of the product
   *  @param language - The language for the app
   *  @param portal_name - The portal name
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @param source - email, social media etc
   *  @param channel - 
   *  @param campaign - the campaign identifier
   *  @return - the data from the api
  */
  var getTokenProduct = function (entity_id, product_id, language, portal_name, flatpack_id, source, channel, campaign, callback) {

    params = {};
    params.entity_id = entity_id;
    params.product_id = product_id;
    params.language = language;
    params.portal_name = portal_name;
    params.flatpack_id = flatpack_id;
    params.source = source;
    params.channel = channel;
    params.campaign = campaign;
    
    doCurl("/token/product",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Provides a tokenised URL that allows a user to report incorrect entity information
   *
   *  @param entity_id - The unique Entity ID e.g. 379236608286720
   *  @param portal_name - The name of the portal that the user is coming from e.g. YourLocal
   *  @param language - The language to use to render the report path
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @return - the data from the api
  */
  var getTokenReport = function (entity_id, portal_name, language, flatpack_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.portal_name = portal_name;
    params.language = language;
    params.flatpack_id = flatpack_id;
    
    doCurl("/token/report",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * The JaroWinklerDistance between two entities postal address objects
   *
   *  @param first_entity_id - The entity id of the first entity to be used in the postal address difference
   *  @param second_entity_id - The entity id of the second entity to be used in the postal address difference
   *  @return - the data from the api
  */
  var getToolsAddressdiff = function (first_entity_id, second_entity_id, callback) {

    params = {};
    params.first_entity_id = first_entity_id;
    params.second_entity_id = second_entity_id;
    
    doCurl("/tools/addressdiff",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Provide a method, a path and some data to run a load of curl commands and get emailed when complete
   *
   *  @param method - The method e.g. POST
   *  @param path - The relative api call e.g. /entity/phone
   *  @param filedata - A tab separated file for ingest
   *  @param email - Response email address e.g. dave@fender.com
   *  @return - the data from the api
  */
  var postToolsCurl = function (method, path, filedata, email, callback) {

    params = {};
    params.method = method;
    params.path = path;
    params.filedata = filedata;
    params.email = email;
    
    doCurl("/tools/curl",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Use this call to get information (in HTML or JSON) about the data structure of given entity object (e.g. a phone number or an address)
   *
   *  @param object - The API call documentation is required for
   *  @param format - The format of the returned data eg. JSON or HTML
   *  @return - the data from the api
  */
  var getToolsDocs = function (object, format, callback) {

    params = {};
    params.object = object;
    params.format = format;
    
    doCurl("/tools/docs",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Format an address according to the rules of the country supplied
   *
   *  @param address - The address to format
   *  @param country - The country where the address is based
   *  @return - the data from the api
  */
  var getToolsFormatAddress = function (address, country, callback) {

    params = {};
    params.address = address;
    params.country = country;
    
    doCurl("/tools/format/address",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Format a phone number according to the rules of the country supplied
   *
   *  @param number - The telephone number to format
   *  @param country - The country where the telephone number is based
   *  @return - the data from the api
  */
  var getToolsFormatPhone = function (number, country, callback) {

    params = {};
    params.number = number;
    params.country = country;
    
    doCurl("/tools/format/phone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Supply an address to geocode - returns lat/lon and accuracy
   *
   *  @param building_number
   *  @param address1
   *  @param address2
   *  @param address3
   *  @param district
   *  @param town
   *  @param county
   *  @param province
   *  @param postcode
   *  @param country
   *  @return - the data from the api
  */
  var getToolsGeocode = function (building_number, address1, address2, address3, district, town, county, province, postcode, country, callback) {

    params = {};
    params.building_number = building_number;
    params.address1 = address1;
    params.address2 = address2;
    params.address3 = address3;
    params.district = district;
    params.town = town;
    params.county = county;
    params.province = province;
    params.postcode = postcode;
    params.country = country;
    
    doCurl("/tools/geocode",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Given a spreadsheet id add a row
   *
   *  @param spreadsheet_key - The key of the spreadsheet to edit
   *  @param data - A comma separated list to add as cells
   *  @return - the data from the api
  */
  var postToolsGooglesheetAdd_row = function (spreadsheet_key, data, callback) {

    params = {};
    params.spreadsheet_key = spreadsheet_key;
    params.data = data;
    
    doCurl("/tools/googlesheet/add_row",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Given some image data we can resize and upload the images
   *
   *  @param filedata - The image data to upload and resize
   *  @param type - The type of image to upload and resize
   *  @return - the data from the api
  */
  var postToolsImage = function (filedata, type, callback) {

    params = {};
    params.filedata = filedata;
    params.type = type;
    
    doCurl("/tools/image",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Generate JSON in the format to generate Mashery's IODocs
   *
   *  @param mode - The HTTP method of the API call to document. e.g. GET
   *  @param path - The path of the API call to document e.g, /entity
   *  @param endpoint - The Mashery 'endpoint' to prefix to our API paths e.g. v1
   *  @param doctype - Mashery has two forms of JSON to describe API methods; one on github, the other on its customer dashboard
   *  @return - the data from the api
  */
  var getToolsIodocs = function (mode, path, endpoint, doctype, callback) {

    params = {};
    params.mode = mode;
    params.path = path;
    params.endpoint = endpoint;
    params.doctype = doctype;
    
    doCurl("/tools/iodocs",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * compile the supplied less with the standard Bootstrap less into a CSS file
   *
   *  @param less - The LESS code to compile
   *  @return - the data from the api
  */
  var getToolsLess = function (less, callback) {

    params = {};
    params.less = less;
    
    doCurl("/tools/less",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Ring the person and verify their account
   *
   *  @param to - The phone number to verify
   *  @param from - The phone number to call from
   *  @param pin - The pin to verify the phone number with
   *  @param twilio_voice - The language to read the verification in
   *  @return - the data from the api
  */
  var getToolsPhonecallVerify = function (to, from, pin, twilio_voice, callback) {

    params = {};
    params.to = to;
    params.from = from;
    params.pin = pin;
    params.twilio_voice = twilio_voice;
    
    doCurl("/tools/phonecall/verify",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Return the phonetic representation of a string
   *
   *  @param text
   *  @return - the data from the api
  */
  var getToolsPhonetic = function (text, callback) {

    params = {};
    params.text = text;
    
    doCurl("/tools/phonetic",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Attempt to process a phone number, removing anything which is not a digit
   *
   *  @param number
   *  @return - the data from the api
  */
  var getToolsProcess_phone = function (number, callback) {

    params = {};
    params.number = number;
    
    doCurl("/tools/process_phone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fully process a string. This includes removing punctuation, stops words and stemming a string. Also returns the phonetic representation of this string.
   *
   *  @param text
   *  @return - the data from the api
  */
  var getToolsProcess_string = function (text, callback) {

    params = {};
    params.text = text;
    
    doCurl("/tools/process_string",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Force refresh of search indexes
   *
   *  @return - the data from the api
  */
  var getToolsReindex = function (callback) {

    params = {};
    
    doCurl("/tools/reindex",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * replace some text parameters with some entity details
   *
   *  @param entity_id - The entity to pull for replacements
   *  @param string - The string full of parameters
   *  @return - the data from the api
  */
  var getToolsReplace = function (entity_id, string, callback) {

    params = {};
    params.entity_id = entity_id;
    params.string = string;
    
    doCurl("/tools/replace",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Check to see if a supplied email address is valid
   *
   *  @param from - The phone number from which the SMS orginates
   *  @param to - The phone number to which the SMS is to be sent
   *  @param message - The message to be sent in the SMS
   *  @return - the data from the api
  */
  var getToolsSendsms = function (from, to, message, callback) {

    params = {};
    params.from = from;
    params.to = to;
    params.message = message;
    
    doCurl("/tools/sendsms",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Spider a single url looking for key facts
   *
   *  @param url
   *  @param pages
   *  @param country
   *  @return - the data from the api
  */
  var getToolsSpider = function (url, pages, country, callback) {

    params = {};
    params.url = url;
    params.pages = pages;
    params.country = country;
    
    doCurl("/tools/spider",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns a stemmed version of a string
   *
   *  @param text
   *  @return - the data from the api
  */
  var getToolsStem = function (text, callback) {

    params = {};
    params.text = text;
    
    doCurl("/tools/stem",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Removes stopwords from a string
   *
   *  @param text
   *  @return - the data from the api
  */
  var getToolsStopwords = function (text, callback) {

    params = {};
    params.text = text;
    
    doCurl("/tools/stopwords",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to Bing Ads CSV format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var getToolsSyndicateBingads = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/bingads",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to Bing Places CSV format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var getToolsSyndicateBingplaces = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/bingplaces",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to DnB TSV format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var getToolsSyndicateDnb = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/dnb",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert add it to arlington
   *
   *  @param entity_id - The entity_id to fetch
   *  @param reseller_masheryid - The reseller_masheryid
   *  @param destructive - Add the entity or simulate adding the entity
   *  @return - the data from the api
  */
  var getToolsSyndicateEnablemedia = function (entity_id, reseller_masheryid, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.reseller_masheryid = reseller_masheryid;
    params.destructive = destructive;
    
    doCurl("/tools/syndicate/enablemedia",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert add it to Factual
   *
   *  @param entity_id - The entity_id to fetch
   *  @param destructive - Add the entity or simulate adding the entity
   *  @return - the data from the api
  */
  var getToolsSyndicateFactual = function (entity_id, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.destructive = destructive;
    
    doCurl("/tools/syndicate/factual",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Syndicate an entity to Foursquare
   *
   *  @param entity_id - The entity_id to fetch
   *  @param destructive - Add the entity or simulate adding the entity
   *  @return - the data from the api
  */
  var getToolsSyndicateFoursquare = function (entity_id, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.destructive = destructive;
    
    doCurl("/tools/syndicate/foursquare",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to TomTom XML format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var getToolsSyndicateGoogle = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/google",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to Google KML format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var getToolsSyndicateKml = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/kml",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to Nokia CSV format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var getToolsSyndicateNokia = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/nokia",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Post an entity to OpenStreetMap
   *
   *  @param entity_id - The entity_id to fetch
   *  @param destructive - Add the entity or simulate adding the entity
   *  @return - the data from the api
  */
  var getToolsSyndicateOsm = function (entity_id, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.destructive = destructive;
    
    doCurl("/tools/syndicate/osm",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to TomTom XML format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var getToolsSyndicateTomtom = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/tomtom",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert add it to Yassaaaabeeee!!
   *
   *  @param entity_id - The entity_id to fetch
   *  @param destructive - Add the entity or simulate adding the entity
   *  @return - the data from the api
  */
  var getToolsSyndicateYasabe = function (entity_id, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.destructive = destructive;
    
    doCurl("/tools/syndicate/yasabe",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Test to see whether this supplied data would already match an entity
   *
   *  @param name
   *  @param building_number
   *  @param branch_name
   *  @param address1
   *  @param address2
   *  @param address3
   *  @param district
   *  @param town
   *  @param county
   *  @param province
   *  @param postcode
   *  @param country
   *  @param latitude
   *  @param longitude
   *  @param timezone
   *  @param telephone_number
   *  @param additional_telephone_number
   *  @param email
   *  @param website
   *  @param category_id
   *  @param category_type
   *  @param do_not_display
   *  @param referrer_url
   *  @param referrer_name
   *  @return - the data from the api
  */
  var getToolsTestmatch = function (name, building_number, branch_name, address1, address2, address3, district, town, county, province, postcode, country, latitude, longitude, timezone, telephone_number, additional_telephone_number, email, website, category_id, category_type, do_not_display, referrer_url, referrer_name, callback) {

    params = {};
    params.name = name;
    params.building_number = building_number;
    params.branch_name = branch_name;
    params.address1 = address1;
    params.address2 = address2;
    params.address3 = address3;
    params.district = district;
    params.town = town;
    params.county = county;
    params.province = province;
    params.postcode = postcode;
    params.country = country;
    params.latitude = latitude;
    params.longitude = longitude;
    params.timezone = timezone;
    params.telephone_number = telephone_number;
    params.additional_telephone_number = additional_telephone_number;
    params.email = email;
    params.website = website;
    params.category_id = category_id;
    params.category_type = category_type;
    params.do_not_display = do_not_display;
    params.referrer_url = referrer_url;
    params.referrer_name = referrer_name;
    
    doCurl("/tools/testmatch",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find a canonical URL from a supplied URL
   *
   *  @param url - The url to process
   *  @param max_redirects - The maximum number of reirects
   *  @return - the data from the api
  */
  var getToolsUrl_details = function (url, max_redirects, callback) {

    params = {};
    params.url = url;
    params.max_redirects = max_redirects;
    
    doCurl("/tools/url_details",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Check to see if a supplied email address is valid
   *
   *  @param email_address - The email address to validate
   *  @return - the data from the api
  */
  var getToolsValidate_email = function (email_address, callback) {

    params = {};
    params.email_address = email_address;
    
    doCurl("/tools/validate_email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Calls a number to make sure it is active
   *
   *  @param phone_number - The phone number to validate
   *  @param country - The country code of the phone number to be validated
   *  @return - the data from the api
  */
  var getToolsValidate_phone = function (phone_number, country, callback) {

    params = {};
    params.phone_number = phone_number;
    params.country = country;
    
    doCurl("/tools/validate_phone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Deleting a traction
   *
   *  @param traction_id
   *  @return - the data from the api
  */
  var deleteTraction = function (traction_id, callback) {

    params = {};
    params.traction_id = traction_id;
    
    doCurl("/traction",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetching a traction
   *
   *  @param traction_id
   *  @return - the data from the api
  */
  var getTraction = function (traction_id, callback) {

    params = {};
    params.traction_id = traction_id;
    
    doCurl("/traction",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a traction
   *
   *  @param traction_id
   *  @param trigger_type
   *  @param action_type
   *  @param country
   *  @param email_addresses
   *  @param title
   *  @param body
   *  @param api_method
   *  @param api_url
   *  @param api_params
   *  @param active
   *  @param reseller_masheryid
   *  @param publisher_masheryid
   *  @param description
   *  @return - the data from the api
  */
  var postTraction = function (traction_id, trigger_type, action_type, country, email_addresses, title, body, api_method, api_url, api_params, active, reseller_masheryid, publisher_masheryid, description, callback) {

    params = {};
    params.traction_id = traction_id;
    params.trigger_type = trigger_type;
    params.action_type = action_type;
    params.country = country;
    params.email_addresses = email_addresses;
    params.title = title;
    params.body = body;
    params.api_method = api_method;
    params.api_url = api_url;
    params.api_params = api_params;
    params.active = active;
    params.reseller_masheryid = reseller_masheryid;
    params.publisher_masheryid = publisher_masheryid;
    params.description = description;
    
    doCurl("/traction",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetching active tractions
   *
   *  @return - the data from the api
  */
  var getTractionActive = function (callback) {

    params = {};
    
    doCurl("/traction/active",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Given a transaction_id retrieve information on it
   *
   *  @param transaction_id
   *  @return - the data from the api
  */
  var getTransaction = function (transaction_id, callback) {

    params = {};
    params.transaction_id = transaction_id;
    
    doCurl("/transaction",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create a new transaction
   *
   *  @param entity_id
   *  @param user_id
   *  @param basket_total
   *  @param basket
   *  @param currency
   *  @param notes
   *  @return - the data from the api
  */
  var putTransaction = function (entity_id, user_id, basket_total, basket, currency, notes, callback) {

    params = {};
    params.entity_id = entity_id;
    params.user_id = user_id;
    params.basket_total = basket_total;
    params.basket = basket;
    params.currency = currency;
    params.notes = notes;
    
    doCurl("/transaction",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Set a transactions status to authorised
   *
   *  @param transaction_id
   *  @param paypal_getexpresscheckoutdetails
   *  @return - the data from the api
  */
  var postTransactionAuthorised = function (transaction_id, paypal_getexpresscheckoutdetails, callback) {

    params = {};
    params.transaction_id = transaction_id;
    params.paypal_getexpresscheckoutdetails = paypal_getexpresscheckoutdetails;
    
    doCurl("/transaction/authorised",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Given a transaction_id retrieve information on it
   *
   *  @param paypal_transaction_id
   *  @return - the data from the api
  */
  var getTransactionBy_paypal_transaction_id = function (paypal_transaction_id, callback) {

    params = {};
    params.paypal_transaction_id = paypal_transaction_id;
    
    doCurl("/transaction/by_paypal_transaction_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Set a transactions status to cancelled
   *
   *  @param transaction_id
   *  @return - the data from the api
  */
  var postTransactionCancelled = function (transaction_id, callback) {

    params = {};
    params.transaction_id = transaction_id;
    
    doCurl("/transaction/cancelled",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Set a transactions status to complete
   *
   *  @param transaction_id
   *  @param paypal_doexpresscheckoutpayment
   *  @param user_id
   *  @param entity_id
   *  @return - the data from the api
  */
  var postTransactionComplete = function (transaction_id, paypal_doexpresscheckoutpayment, user_id, entity_id, callback) {

    params = {};
    params.transaction_id = transaction_id;
    params.paypal_doexpresscheckoutpayment = paypal_doexpresscheckoutpayment;
    params.user_id = user_id;
    params.entity_id = entity_id;
    
    doCurl("/transaction/complete",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Set a transactions status to inprogess
   *
   *  @param transaction_id
   *  @param paypal_setexpresscheckout
   *  @return - the data from the api
  */
  var postTransactionInprogress = function (transaction_id, paypal_setexpresscheckout, callback) {

    params = {};
    params.transaction_id = transaction_id;
    params.paypal_setexpresscheckout = paypal_setexpresscheckout;
    
    doCurl("/transaction/inprogress",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update user based on email address or social_network/social_network_id
   *
   *  @param email
   *  @param user_id
   *  @param first_name
   *  @param last_name
   *  @param active
   *  @param trust
   *  @param creation_date
   *  @param user_type
   *  @param social_network
   *  @param social_network_id
   *  @param reseller_admin_masheryid
   *  @param group_id
   *  @param admin_upgrader
   *  @return - the data from the api
  */
  var postUser = function (email, user_id, first_name, last_name, active, trust, creation_date, user_type, social_network, social_network_id, reseller_admin_masheryid, group_id, admin_upgrader, callback) {

    params = {};
    params.email = email;
    params.user_id = user_id;
    params.first_name = first_name;
    params.last_name = last_name;
    params.active = active;
    params.trust = trust;
    params.creation_date = creation_date;
    params.user_type = user_type;
    params.social_network = social_network;
    params.social_network_id = social_network_id;
    params.reseller_admin_masheryid = reseller_admin_masheryid;
    params.group_id = group_id;
    params.admin_upgrader = admin_upgrader;
    
    doCurl("/user",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a unique ID address an user can be retrieved
   *
   *  @param user_id
   *  @return - the data from the api
  */
  var getUser = function (user_id, callback) {

    params = {};
    params.user_id = user_id;
    
    doCurl("/user",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a unique email address an user can be retrieved
   *
   *  @param email
   *  @return - the data from the api
  */
  var getUserBy_email = function (email, callback) {

    params = {};
    params.email = email;
    
    doCurl("/user/by_email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns all the users that match the supplied group_id
   *
   *  @param group_id
   *  @return - the data from the api
  */
  var getUserBy_groupid = function (group_id, callback) {

    params = {};
    params.group_id = group_id;
    
    doCurl("/user/by_groupid",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns all the users that match the supplied reseller_admin_masheryid
   *
   *  @param reseller_admin_masheryid
   *  @return - the data from the api
  */
  var getUserBy_reseller_admin_masheryid = function (reseller_admin_masheryid, callback) {

    params = {};
    params.reseller_admin_masheryid = reseller_admin_masheryid;
    
    doCurl("/user/by_reseller_admin_masheryid",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a unique ID address an user can be retrieved
   *
   *  @param name
   *  @param id
   *  @return - the data from the api
  */
  var getUserBy_social_media = function (name, id, callback) {

    params = {};
    params.name = name;
    params.id = id;
    
    doCurl("/user/by_social_media",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Removes group_admin privileges from a specified user
   *
   *  @param user_id
   *  @return - the data from the api
  */
  var postUserGroup_admin_remove = function (user_id, callback) {

    params = {};
    params.user_id = user_id;
    
    doCurl("/user/group_admin_remove",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Removes reseller privileges from a specified user
   *
   *  @param user_id
   *  @return - the data from the api
  */
  var postUserReseller_remove = function (user_id, callback) {

    params = {};
    params.user_id = user_id;
    
    doCurl("/user/reseller_remove",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Deletes a specific social network from a user
   *
   *  @param user_id
   *  @param social_network
   *  @return - the data from the api
  */
  var deleteUserSocial_network = function (user_id, social_network, callback) {

    params = {};
    params.user_id = user_id;
    params.social_network = social_network;
    
    doCurl("/user/social_network",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Shows what would be emitted by a view, given a document
   *
   *  @param database - the database being worked on e.g. entities
   *  @param designdoc - the design document containing the view e.g. _design/report
   *  @param view - the name of the view to be tested e.g. bydate
   *  @param doc - the JSON document to be analysed e.g. {}
   *  @return - the data from the api
  */
  var getViewhelper = function (database, designdoc, view, doc, callback) {

    params = {};
    params.database = database;
    params.designdoc = designdoc;
    params.view = view;
    params.doc = doc;
    
    doCurl("/viewhelper",params,function(error,body){
      callback(error,body);
    })
  }


  module.exports = {
    setApiKey: setApiKey,
    getActivity_stream: getActivity_stream,
    postActivity_stream: postActivity_stream,
    getAdvertiserUpdated: getAdvertiserUpdated,
    getAdvertiserUpdatedBy_publisher: getAdvertiserUpdatedBy_publisher,
    getAutocompleteCategory: getAutocompleteCategory,
    getAutocompleteKeyword: getAutocompleteKeyword,
    getAutocompleteLocation: getAutocompleteLocation,
    getAutocompleteLocationBy_resolution: getAutocompleteLocationBy_resolution,
    putBusiness: putBusiness,
    deleteBusiness_tool: deleteBusiness_tool,
    postBusiness_tool: postBusiness_tool,
    getBusiness_tool: getBusiness_tool,
    getBusiness_toolBy_masheryid: getBusiness_toolBy_masheryid,
    postBusiness_toolImage: postBusiness_toolImage,
    putCategory: putCategory,
    getCategory: getCategory,
    getCategoryAll: getCategoryAll,
    postCategoryMappings: postCategoryMappings,
    deleteCategoryMappings: deleteCategoryMappings,
    postCategoryMerge: postCategoryMerge,
    deleteCategorySynonym: deleteCategorySynonym,
    postCategorySynonym: postCategorySynonym,
    getContract: getContract,
    getContractBy_payment_provider_id: getContractBy_payment_provider_id,
    getContractBy_user_id: getContractBy_user_id,
    postContractCancel: postContractCancel,
    postContractCreate: postContractCreate,
    postContractPaymentFailure: postContractPaymentFailure,
    postContractPaymentSetup: postContractPaymentSetup,
    postContractPaymentSuccess: postContractPaymentSuccess,
    postContractProvision: postContractProvision,
    getContract_log: getContract_log,
    postContract_log: postContract_log,
    getContract_logBy_contract_id: getContract_logBy_contract_id,
    getContract_logBy_payment_provider: getContract_logBy_payment_provider,
    getContract_logSuccess_by_date: getContract_logSuccess_by_date,
    getCountry: getCountry,
    postCountry: postCountry,
    postCountryBackgroundImage: postCountryBackgroundImage,
    postCountrySocialLoginImage: postCountrySocialLoginImage,
    postEmail: postEmail,
    putEntity: putEntity,
    getEntity: getEntity,
    postEntityAdd: postEntityAdd,
    deleteEntityAdvertiser: deleteEntityAdvertiser,
    postEntityAdvertiserCancel: postEntityAdvertiserCancel,
    postEntityAdvertiserCreate: postEntityAdvertiserCreate,
    postEntityAdvertiserLocation: postEntityAdvertiserLocation,
    postEntityAdvertiserRenew: postEntityAdvertiserRenew,
    postEntityAdvertiserTag: postEntityAdvertiserTag,
    postEntityAdvertiserUpsell: postEntityAdvertiserUpsell,
    getEntityAdvertisers: getEntityAdvertisers,
    postEntityAffiliate_link: postEntityAffiliate_link,
    deleteEntityAffiliate_link: deleteEntityAffiliate_link,
    postEntityBackground: postEntityBackground,
    postEntityBulkCsv: postEntityBulkCsv,
    getEntityBulkCsvStatus: getEntityBulkCsvStatus,
    postEntityBulkJson: postEntityBulkJson,
    getEntityBulkJsonStatus: getEntityBulkJsonStatus,
    getEntityBy_groupid: getEntityBy_groupid,
    deleteEntityBy_supplier: deleteEntityBy_supplier,
    getEntityBy_supplier_id: getEntityBy_supplier_id,
    getEntityBy_user_id: getEntityBy_user_id,
    deleteEntityCategory: deleteEntityCategory,
    postEntityCategory: postEntityCategory,
    getEntityChangelog: getEntityChangelog,
    postEntityClaim: postEntityClaim,
    postEntityDescription: postEntityDescription,
    deleteEntityDescription: deleteEntityDescription,
    postEntityDocument: postEntityDocument,
    deleteEntityDocument: deleteEntityDocument,
    postEntityEmail: postEntityEmail,
    deleteEntityEmail: deleteEntityEmail,
    postEntityEmployee: postEntityEmployee,
    deleteEntityEmployee: deleteEntityEmployee,
    postEntityFax: postEntityFax,
    deleteEntityFax: deleteEntityFax,
    postEntityGeopoint: postEntityGeopoint,
    postEntityGroup: postEntityGroup,
    deleteEntityGroup: deleteEntityGroup,
    deleteEntityImage: deleteEntityImage,
    postEntityImage: postEntityImage,
    deleteEntityInvoice_address: deleteEntityInvoice_address,
    postEntityInvoice_address: postEntityInvoice_address,
    deleteEntityList: deleteEntityList,
    postEntityList: postEntityList,
    getEntityList_by_group_id: getEntityList_by_group_id,
    postEntityLogo: postEntityLogo,
    deleteEntityLogo: deleteEntityLogo,
    postEntityMerge: postEntityMerge,
    postEntityMigrate_category: postEntityMigrate_category,
    postEntityName: postEntityName,
    deleteEntityOpening_times: deleteEntityOpening_times,
    postEntityOpening_times: postEntityOpening_times,
    deleteEntityPhone: deleteEntityPhone,
    postEntityPhone: postEntityPhone,
    postEntityPostal_address: postEntityPostal_address,
    getEntityProvisionalBy_supplier_id: getEntityProvisionalBy_supplier_id,
    getEntityRevisions: getEntityRevisions,
    getEntityRevisionsByRevisionID: getEntityRevisionsByRevisionID,
    getEntitySearchByboundingbox: getEntitySearchByboundingbox,
    getEntitySearchBylocation: getEntitySearchBylocation,
    getEntitySearchWhat: getEntitySearchWhat,
    getEntitySearchWhatByboundingbox: getEntitySearchWhatByboundingbox,
    getEntitySearchWhatBylocation: getEntitySearchWhatBylocation,
    getEntitySearchWhatBynearest: getEntitySearchWhatBynearest,
    getEntitySearchWho: getEntitySearchWho,
    getEntitySearchWhoByboundingbox: getEntitySearchWhoByboundingbox,
    getEntitySearchWhoBylocation: getEntitySearchWhoBylocation,
    getEntitySearchWhoBynearest: getEntitySearchWhoBynearest,
    postEntitySend_email: postEntitySend_email,
    postEntitySocialmedia: postEntitySocialmedia,
    deleteEntitySocialmedia: deleteEntitySocialmedia,
    postEntitySpecial_offer: postEntitySpecial_offer,
    deleteEntitySpecial_offer: deleteEntitySpecial_offer,
    postEntityStatus: postEntityStatus,
    postEntityTag: postEntityTag,
    deleteEntityTag: deleteEntityTag,
    postEntityTestimonial: postEntityTestimonial,
    deleteEntityTestimonial: deleteEntityTestimonial,
    getEntityUncontribute: getEntityUncontribute,
    postEntityUnmerge: postEntityUnmerge,
    deleteEntityVideo: deleteEntityVideo,
    postEntityVideoYoutube: postEntityVideoYoutube,
    postEntityWebsite: postEntityWebsite,
    deleteEntityWebsite: deleteEntityWebsite,
    putEntityserve: putEntityserve,
    getFlatpack: getFlatpack,
    postFlatpack: postFlatpack,
    deleteFlatpack: deleteFlatpack,
    postFlatpackAdminCSS: postFlatpackAdminCSS,
    postFlatpackAdminLargeLogo: postFlatpackAdminLargeLogo,
    postFlatpackAdminSmallLogo: postFlatpackAdminSmallLogo,
    getFlatpackBy_domain_name: getFlatpackBy_domain_name,
    getFlatpackBy_masheryid: getFlatpackBy_masheryid,
    getFlatpackClone: getFlatpackClone,
    postFlatpackIcon: postFlatpackIcon,
    deleteFlatpackLink: deleteFlatpackLink,
    postFlatpackLink: postFlatpackLink,
    postFlatpackLogo: postFlatpackLogo,
    postFlatpackSitemap: postFlatpackSitemap,
    postFlatpackUpload: postFlatpackUpload,
    getGroup: getGroup,
    deleteGroup: deleteGroup,
    postGroup: postGroup,
    getGroupAll: getGroupAll,
    postGroupBulk_delete: postGroupBulk_delete,
    postGroupBulk_ingest: postGroupBulk_ingest,
    postGroupBulk_update: postGroupBulk_update,
    getHeartbeatBy_date: getHeartbeatBy_date,
    getHeartbeatTodayClaims: getHeartbeatTodayClaims,
    postIngest_file: postIngest_file,
    getIngest_job: getIngest_job,
    postIngest_job: postIngest_job,
    getIngest_logBy_job_id: getIngest_logBy_job_id,
    getIngest_queue: getIngest_queue,
    getLocation: getLocation,
    postLocation: postLocation,
    getLocationContext: getLocationContext,
    getLocationMultiple: getLocationMultiple,
    putLogo: putLogo,
    getLogo: getLogo,
    getLookupCategory: getLookupCategory,
    getLookupLegacyCategory: getLookupLegacyCategory,
    getLookupLocation: getLookupLocation,
    getMatchByphone: getMatchByphone,
    getMatchByphone2: getMatchByphone2,
    getMatchOftheday: getMatchOftheday,
    putMatching_log: putMatching_log,
    postMessage: postMessage,
    getMessage: getMessage,
    getMessageBy_ses_id: getMessageBy_ses_id,
    putPrivate_object: putPrivate_object,
    deletePrivate_object: deletePrivate_object,
    getPrivate_objectAll: getPrivate_objectAll,
    postProduct: postProduct,
    getProduct: getProduct,
    deleteProductProvisioning: deleteProductProvisioning,
    postProductProvisioningAdvert: postProductProvisioningAdvert,
    postProductProvisioningClaim: postProductProvisioningClaim,
    postProductProvisioningSyndication: postProductProvisioningSyndication,
    getPtbAll: getPtbAll,
    getPtbLog: getPtbLog,
    getPtbModule: getPtbModule,
    getPtbRunrate: getPtbRunrate,
    getPtbValueadded: getPtbValueadded,
    postPublisher: postPublisher,
    getPublisher: getPublisher,
    deletePublisher: deletePublisher,
    getPublisherByCountry: getPublisherByCountry,
    getPublisherByEntityId: getPublisherByEntityId,
    deleteQueue: deleteQueue,
    getQueue: getQueue,
    putQueue: putQueue,
    postQueueError: postQueueError,
    getQueueSearch: getQueueSearch,
    postQueueUnlock: postQueueUnlock,
    postReseller: postReseller,
    getReseller: getReseller,
    getSales_log: getSales_log,
    getSales_logBy_countryBy_date: getSales_logBy_countryBy_date,
    getSales_logBy_date: getSales_logBy_date,
    postSales_logEntity: postSales_logEntity,
    postSales_logSyndication: postSales_logSyndication,
    postSignal: postSignal,
    getStatsEntityBy_date: getStatsEntityBy_date,
    getStatsEntityBy_year: getStatsEntityBy_year,
    getStatus: getStatus,
    getSyndication: getSyndication,
    postSyndicationCreate: postSyndicationCreate,
    postSyndicationRenew: postSyndicationRenew,
    postSyndication_log: postSyndication_log,
    getSyndication_logBy_entity_id: getSyndication_logBy_entity_id,
    getSyndication_logLast_syndicated_id: getSyndication_logLast_syndicated_id,
    getTokenAdd: getTokenAdd,
    getTokenClaim: getTokenClaim,
    getTokenDecode: getTokenDecode,
    getTokenEdit: getTokenEdit,
    getTokenLogin: getTokenLogin,
    getTokenMessage: getTokenMessage,
    getTokenProduct: getTokenProduct,
    getTokenReport: getTokenReport,
    getToolsAddressdiff: getToolsAddressdiff,
    postToolsCurl: postToolsCurl,
    getToolsDocs: getToolsDocs,
    getToolsFormatAddress: getToolsFormatAddress,
    getToolsFormatPhone: getToolsFormatPhone,
    getToolsGeocode: getToolsGeocode,
    postToolsGooglesheetAdd_row: postToolsGooglesheetAdd_row,
    postToolsImage: postToolsImage,
    getToolsIodocs: getToolsIodocs,
    getToolsLess: getToolsLess,
    getToolsPhonecallVerify: getToolsPhonecallVerify,
    getToolsPhonetic: getToolsPhonetic,
    getToolsProcess_phone: getToolsProcess_phone,
    getToolsProcess_string: getToolsProcess_string,
    getToolsReindex: getToolsReindex,
    getToolsReplace: getToolsReplace,
    getToolsSendsms: getToolsSendsms,
    getToolsSpider: getToolsSpider,
    getToolsStem: getToolsStem,
    getToolsStopwords: getToolsStopwords,
    getToolsSyndicateBingads: getToolsSyndicateBingads,
    getToolsSyndicateBingplaces: getToolsSyndicateBingplaces,
    getToolsSyndicateDnb: getToolsSyndicateDnb,
    getToolsSyndicateEnablemedia: getToolsSyndicateEnablemedia,
    getToolsSyndicateFactual: getToolsSyndicateFactual,
    getToolsSyndicateFoursquare: getToolsSyndicateFoursquare,
    getToolsSyndicateGoogle: getToolsSyndicateGoogle,
    getToolsSyndicateKml: getToolsSyndicateKml,
    getToolsSyndicateNokia: getToolsSyndicateNokia,
    getToolsSyndicateOsm: getToolsSyndicateOsm,
    getToolsSyndicateTomtom: getToolsSyndicateTomtom,
    getToolsSyndicateYasabe: getToolsSyndicateYasabe,
    getToolsTestmatch: getToolsTestmatch,
    getToolsUrl_details: getToolsUrl_details,
    getToolsValidate_email: getToolsValidate_email,
    getToolsValidate_phone: getToolsValidate_phone,
    deleteTraction: deleteTraction,
    getTraction: getTraction,
    postTraction: postTraction,
    getTractionActive: getTractionActive,
    getTransaction: getTransaction,
    putTransaction: putTransaction,
    postTransactionAuthorised: postTransactionAuthorised,
    getTransactionBy_paypal_transaction_id: getTransactionBy_paypal_transaction_id,
    postTransactionCancelled: postTransactionCancelled,
    postTransactionComplete: postTransactionComplete,
    postTransactionInprogress: postTransactionInprogress,
    postUser: postUser,
    getUser: getUser,
    getUserBy_email: getUserBy_email,
    getUserBy_groupid: getUserBy_groupid,
    getUserBy_reseller_admin_masheryid: getUserBy_reseller_admin_masheryid,
    getUserBy_social_media: getUserBy_social_media,
    postUserGroup_admin_remove: postUserGroup_admin_remove,
    postUserReseller_remove: postUserReseller_remove,
    deleteUserSocial_network: deleteUserSocial_network,
    getViewhelper: getViewhelper
  }
