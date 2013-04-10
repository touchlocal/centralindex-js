Starting Wolf using 'dev' configuration
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
   * Search for matching entities
   *
   *  @param what
   *  @param entity_name
   *  @param where
   *  @param per_page
   *  @param page
   *  @param longitude
   *  @param latitude
   *  @param country
   *  @param language
   *  @return - the data from the api
  */
  var getEntitySearch = function (what, entity_name, where, per_page, page, longitude, latitude, country, language, callback) {

    params = {};
    params.what = what;
    params.entity_name = entity_name;
    params.where = where;
    params.per_page = per_page;
    params.page = page;
    params.longitude = longitude;
    params.latitude = latitude;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search",params,function(error,body){
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
   *  @return - the data from the api
  */
  var getEntitySearchWhatBylocation = function (what, where, per_page, page, country, language, callback) {

    params = {};
    params.what = what;
    params.where = where;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search/what/bylocation",params,function(error,body){
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
   *  @param who
   *  @param latitude_1
   *  @param longitude_1
   *  @param latitude_2
   *  @param longitude_2
   *  @param per_page
   *  @param page
   *  @param country
   *  @return - the data from the api
  */
  var getEntitySearchWhoByboundingbox = function (who, latitude_1, longitude_1, latitude_2, longitude_2, per_page, page, country, callback) {

    params = {};
    params.who = who;
    params.latitude_1 = latitude_1;
    params.longitude_1 = longitude_1;
    params.latitude_2 = latitude_2;
    params.longitude_2 = longitude_2;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    
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
   *  @return - the data from the api
  */
  var getEntitySearchWhoBylocation = function (who, where, per_page, page, country, callback) {

    params = {};
    params.who = who;
    params.where = where;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    
    doCurl("/entity/search/who/bylocation",params,function(error,body){
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
   *  @param who - Company name e.g. Starbucks
   *  @param per_page - How many results per page
   *  @param page - What page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @return - the data from the api
  */
  var getEntitySearchWho = function (who, per_page, page, country, callback) {

    params = {};
    params.who = who;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    
    doCurl("/entity/search/who",params,function(error,body){
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
   *  @return - the data from the api
  */
  var getEntitySearchBylocation = function (where, per_page, page, country, language, callback) {

    params = {};
    params.where = where;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search/bylocation",params,function(error,body){
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
   * Merge two entities into one
   *
   *  @param from
   *  @param to
   *  @return - the data from the api
  */
  var postEntityMerge = function (from, to, callback) {

    params = {};
    params.from = from;
    params.to = to;
    
    doCurl("/entity/merge",params,function(error,body){
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
   * Supply an entity and an object within it (e.g. a phone number), and retrieve a URL that allows the user to report an issue with that object
   *
   *  @param entity_id - The unique Entity ID e.g. 379236608286720
   *  @param gen_id - A Unique ID for the object you wish to report, E.g. Phone number e.g. 379236608299008
   *  @param language
   *  @return - the data from the api
  */
  var getEntityReport = function (entity_id, gen_id, language, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    params.language = language;
    
    doCurl("/entity/report",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows us to identify the user, entity and element from an encoded endpoint URL's token
   *
   *  @param token
   *  @return - the data from the api
  */
  var getToolsDecodereport = function (token, callback) {

    params = {};
    params.token = token;
    
    doCurl("/tools/decodereport",params,function(error,body){
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
   * Create a new business entity with all it's objects
   *
   *  @param name
   *  @param address1
   *  @param address2
   *  @param address3
   *  @param district
   *  @param town
   *  @param county
   *  @param postcode
   *  @param country
   *  @param latitude
   *  @param longitude
   *  @param timezone
   *  @param telephone_number
   *  @param email
   *  @param website
   *  @param category_id
   *  @param category_name
   *  @return - the data from the api
  */
  var putBusiness = function (name, address1, address2, address3, district, town, county, postcode, country, latitude, longitude, timezone, telephone_number, email, website, category_id, category_name, callback) {

    params = {};
    params.name = name;
    params.address1 = address1;
    params.address2 = address2;
    params.address3 = address3;
    params.district = district;
    params.town = town;
    params.county = county;
    params.postcode = postcode;
    params.country = country;
    params.latitude = latitude;
    params.longitude = longitude;
    params.timezone = timezone;
    params.telephone_number = telephone_number;
    params.email = email;
    params.website = website;
    params.category_id = category_id;
    params.category_name = category_name;
    
    doCurl("/business",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Provides a personalised URL to redirect a user to add an entity to Central Index
   *
   *  @param language - The language to use to render the add path e.g. en
   *  @param portal_name - The name of the website that data is to be added on e.g. YourLocal
   *  @return - the data from the api
  */
  var getEntityAdd = function (language, portal_name, callback) {

    params = {};
    params.language = language;
    params.portal_name = portal_name;
    
    doCurl("/entity/add",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Provides a personalised URL to redirect a user to claim an entity in the Central Index
   *
   *  @param language - The language to use to render the add path e.g. en
   *  @param portal_name - The name of the website that data is to be added on e.g. YourLocal
   *  @param entity_id - The id of the index card that is being claimed e.g. 379236808425472
   *  @return - the data from the api
  */
  var getEntityClaim = function (language, portal_name, entity_id, callback) {

    params = {};
    params.language = language;
    params.portal_name = portal_name;
    params.entity_id = entity_id;
    
    doCurl("/entity/claim",params,function(error,body){
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
   * Allows the removal or insertion of locations into an advertiser object
   *
   *  @param gen_id - The gen_id of this advertiser
   *  @param entity_id - The entity_id of the advertiser
   *  @param locations_to_add - The locations to add
   *  @param locations_to_remove - The locations to remove
   *  @return - the data from the api
  */
  var postEntityAdvertiserLocation = function (gen_id, entity_id, locations_to_add, locations_to_remove, callback) {

    params = {};
    params.gen_id = gen_id;
    params.entity_id = entity_id;
    params.locations_to_add = locations_to_add;
    params.locations_to_remove = locations_to_remove;
    
    doCurl("/entity/advertiser/location",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find a location from cache or cloudant depending if it is in the cache
   *
   *  @param string
   *  @param country
   *  @return - the data from the api
  */
  var getLookupLocation = function (string, country, callback) {

    params = {};
    params.string = string;
    params.country = country;
    
    doCurl("/lookup/location",params,function(error,body){
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
   * With a known entity id, a name can be updated.
   *
   *  @param entity_id
   *  @param name
   *  @param formal_name
   *  @return - the data from the api
  */
  var postEntityName = function (entity_id, name, formal_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.name = name;
    params.formal_name = formal_name;
    
    doCurl("/entity/name",params,function(error,body){
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
   * Allows a new phone object to be added to a specified entity. A new object id will be calculated and returned to you if successful.
   *
   *  @param entity_id
   *  @param number
   *  @param description
   *  @return - the data from the api
  */
  var postEntityPhone = function (entity_id, number, description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.number = number;
    params.description = description;
    
    doCurl("/entity/phone",params,function(error,body){
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
   * With a known entity id, an category object can be added.
   *
   *  @param entity_id
   *  @param category_id
   *  @param category_name
   *  @return - the data from the api
  */
  var postEntityCategory = function (entity_id, category_id, category_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.category_id = category_id;
    params.category_name = category_name;
    
    doCurl("/entity/category",params,function(error,body){
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
   * Find all matches by phone number and then return all matches that also match company name and location. Default location_strictness is defined in Km and the default is set to 0.2 (200m)
   *
   *  @param phone
   *  @param company_name
   *  @param latitude
   *  @param longitude
   *  @param name_strictness
   *  @param location_strictness
   *  @return - the data from the api
  */
  var getMatchByphone = function (phone, company_name, latitude, longitude, name_strictness, location_strictness, callback) {

    params = {};
    params.phone = phone;
    params.company_name = company_name;
    params.latitude = latitude;
    params.longitude = longitude;
    params.name_strictness = name_strictness;
    params.location_strictness = location_strictness;
    
    doCurl("/match/byphone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find all matches by location and then return all matches that also match company name. Default location_strictness is set to 7, which equates to +/- 20m
   *
   *  @param company_name
   *  @param latitude
   *  @param longitude
   *  @param name_strictness
   *  @param location_strictness
   *  @return - the data from the api
  */
  var getMatchBylocation = function (company_name, latitude, longitude, name_strictness, location_strictness, callback) {

    params = {};
    params.company_name = company_name;
    params.latitude = latitude;
    params.longitude = longitude;
    params.name_strictness = name_strictness;
    params.location_strictness = location_strictness;
    
    doCurl("/match/bylocation",params,function(error,body){
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
   * Spider a single url looking for key facts
   *
   *  @param url
   *  @return - the data from the api
  */
  var getToolsSpider = function (url, callback) {

    params = {};
    params.url = url;
    
    doCurl("/tools/spider",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Supply an address to geocode - returns lat/lon and accuracy
   *
   *  @param address1
   *  @param address2
   *  @param address3
   *  @param district
   *  @param town
   *  @param county
   *  @param postcode
   *  @param country
   *  @return - the data from the api
  */
  var getToolsGeocode = function (address1, address2, address3, district, town, county, postcode, country, callback) {

    params = {};
    params.address1 = address1;
    params.address2 = address2;
    params.address3 = address3;
    params.district = district;
    params.town = town;
    params.county = county;
    params.postcode = postcode;
    params.country = country;
    
    doCurl("/tools/geocode",params,function(error,body){
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
   * With a known entity id, an invoice_address object can be updated.
   *
   *  @param entity_id
   *  @param address1
   *  @param address2
   *  @param address3
   *  @param district
   *  @param town
   *  @param county
   *  @param postcode
   *  @param address_type
   *  @return - the data from the api
  */
  var postEntityInvoice_address = function (entity_id, address1, address2, address3, district, town, county, postcode, address_type, callback) {

    params = {};
    params.entity_id = entity_id;
    params.address1 = address1;
    params.address2 = address2;
    params.address3 = address3;
    params.district = district;
    params.town = town;
    params.county = county;
    params.postcode = postcode;
    params.address_type = address_type;
    
    doCurl("/entity/invoice_address",params,function(error,body){
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
   * Create/Update a postal address
   *
   *  @param entity_id
   *  @param address1
   *  @param address2
   *  @param address3
   *  @param district
   *  @param town
   *  @param county
   *  @param postcode
   *  @param address_type
   *  @return - the data from the api
  */
  var postEntityPostal_address = function (entity_id, address1, address2, address3, district, town, county, postcode, address_type, callback) {

    params = {};
    params.entity_id = entity_id;
    params.address1 = address1;
    params.address2 = address2;
    params.address3 = address3;
    params.district = district;
    params.town = town;
    params.county = county;
    params.postcode = postcode;
    params.address_type = address_type;
    
    doCurl("/entity/postal_address",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a advertiser is added
   *
   *  @param entity_id
   *  @param tags
   *  @param locations
   *  @param expiry
   *  @param is_national
   *  @param language
   *  @param reseller_ref
   *  @param reseller_agent_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var postEntityAdvertiser = function (entity_id, tags, locations, expiry, is_national, language, reseller_ref, reseller_agent_id, publisher_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.tags = tags;
    params.locations = locations;
    params.expiry = expiry;
    params.is_national = is_national;
    params.language = language;
    params.reseller_ref = reseller_ref;
    params.reseller_agent_id = reseller_agent_id;
    params.publisher_id = publisher_id;
    
    doCurl("/entity/advertiser",params,function(error,body){
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
   * With a known entity id, a website object can be added.
   *
   *  @param entity_id
   *  @param website_url
   *  @param display_url
   *  @param website_description
   *  @return - the data from the api
  */
  var postEntityWebsite = function (entity_id, website_url, display_url, website_description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.website_url = website_url;
    params.display_url = display_url;
    params.website_description = website_description;
    
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
   * Create/update a new location entity with the supplied ID in the locations reference database.
   *
   *  @param location_id
   *  @param name
   *  @param formal_name
   *  @param latitude
   *  @param longitude
   *  @param resolution
   *  @param country
   *  @param population
   *  @param description
   *  @param timezone
   *  @param is_duplicate
   *  @param is_default
   *  @return - the data from the api
  */
  var postLocation = function (location_id, name, formal_name, latitude, longitude, resolution, country, population, description, timezone, is_duplicate, is_default, callback) {

    params = {};
    params.location_id = location_id;
    params.name = name;
    params.formal_name = formal_name;
    params.latitude = latitude;
    params.longitude = longitude;
    params.resolution = resolution;
    params.country = country;
    params.population = population;
    params.description = description;
    params.timezone = timezone;
    params.is_duplicate = is_duplicate;
    params.is_default = is_default;
    
    doCurl("/location",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a new synonym to a known location
   *
   *  @param location_id
   *  @param synonym
   *  @param language
   *  @return - the data from the api
  */
  var postLocationSynonym = function (location_id, synonym, language, callback) {

    params = {};
    params.location_id = location_id;
    params.synonym = synonym;
    params.language = language;
    
    doCurl("/location/synonym",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Remove a new synonym from a known location
   *
   *  @param location_id
   *  @param synonym
   *  @param language
   *  @return - the data from the api
  */
  var deleteLocationSynonym = function (location_id, synonym, language, callback) {

    params = {};
    params.location_id = location_id;
    params.synonym = synonym;
    params.language = language;
    
    doCurl("/location/synonym",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a new source to a known location
   *
   *  @param location_id
   *  @param type
   *  @param url
   *  @param ref
   *  @return - the data from the api
  */
  var postLocationSource = function (location_id, type, url, ref, callback) {

    params = {};
    params.location_id = location_id;
    params.type = type;
    params.url = url;
    params.ref = ref;
    
    doCurl("/location/source",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a status object can be updated.
   *
   *  @param entity_id
   *  @param status
   *  @return - the data from the api
  */
  var postEntityStatus = function (entity_id, status, callback) {

    params = {};
    params.entity_id = entity_id;
    params.status = status;
    
    doCurl("/entity/status",params,function(error,body){
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
   * With a known entity id, avideo object can be added.
   *
   *  @param entity_id
   *  @param title
   *  @param description
   *  @param thumbnail
   *  @param embed_code
   *  @return - the data from the api
  */
  var postEntityVideo = function (entity_id, title, description, thumbnail, embed_code, callback) {

    params = {};
    params.entity_id = entity_id;
    params.title = title;
    params.description = description;
    params.thumbnail = thumbnail;
    params.embed_code = embed_code;
    
    doCurl("/entity/video",params,function(error,body){
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
   * With a known entity id, a description object can be added.
   *
   *  @param entity_id
   *  @param headline
   *  @param body
   *  @return - the data from the api
  */
  var postEntityDescription = function (entity_id, headline, body, callback) {

    params = {};
    params.entity_id = entity_id;
    params.headline = headline;
    params.body = body;
    
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
   * Update user based on email address or social_network/social_network_id
   *
   *  @param email
   *  @param first_name
   *  @param last_name
   *  @param active
   *  @param trust
   *  @param creation_date
   *  @param user_type
   *  @param social_network
   *  @param social_network_id
   *  @return - the data from the api
  */
  var postUser = function (email, first_name, last_name, active, trust, creation_date, user_type, social_network, social_network_id, callback) {

    params = {};
    params.email = email;
    params.first_name = first_name;
    params.last_name = last_name;
    params.active = active;
    params.trust = trust;
    params.creation_date = creation_date;
    params.user_type = user_type;
    params.social_network = social_network;
    params.social_network_id = social_network_id;
    
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
   *  @return - the data from the api
  */
  var getAutocompleteLocation = function (str, country, callback) {

    params = {};
    params.str = str;
    params.country = country;
    
    doCurl("/autocomplete/location",params,function(error,body){
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
   * Allow an entity to be claimed by a valid user
   *
   *  @param entity_id
   *  @param claimed_user_id
   *  @param claimed_date
   *  @return - the data from the api
  */
  var postEntityClaim = function (entity_id, claimed_user_id, claimed_date, callback) {

    params = {};
    params.entity_id = entity_id;
    params.claimed_user_id = claimed_user_id;
    params.claimed_date = claimed_date;
    
    doCurl("/entity/claim",params,function(error,body){
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
   *  @return - the data from the api
  */
  var postCountry = function (country_id, name, synonyms, continentName, continent, geonameId, dbpediaURL, freebaseURL, population, currencyCode, languages, areaInSqKm, capital, east, west, north, south, claimPrice, callback) {

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
    
    doCurl("/country",params,function(error,body){
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


  module.exports = {
    setApiKey: setApiKey,
    getStatus: getStatus,
    getLogo: getLogo,
    putLogo: putLogo,
    postEntityBulkCsv: postEntityBulkCsv,
    getEntityBulkCsvStatus: getEntityBulkCsvStatus,
    putEntity: putEntity,
    getEntityBy_supplier_id: getEntityBy_supplier_id,
    getEntitySearch: getEntitySearch,
    getEntitySearchWhatBylocation: getEntitySearchWhatBylocation,
    getEntitySearchWhatByboundingbox: getEntitySearchWhatByboundingbox,
    getEntitySearchWhoByboundingbox: getEntitySearchWhoByboundingbox,
    getEntitySearchWhoBylocation: getEntitySearchWhoBylocation,
    getEntitySearchWhat: getEntitySearchWhat,
    getEntitySearchWho: getEntitySearchWho,
    getEntitySearchBylocation: getEntitySearchBylocation,
    getEntitySearchByboundingbox: getEntitySearchByboundingbox,
    getEntityAdvertisers: getEntityAdvertisers,
    getEntity: getEntity,
    getEntityBy_user_id: getEntityBy_user_id,
    getEntityRevisions: getEntityRevisions,
    getEntityRevisionsByRevisionID: getEntityRevisionsByRevisionID,
    postEntityUnmerge: postEntityUnmerge,
    getEntityChangelog: getEntityChangelog,
    postEntityMerge: postEntityMerge,
    getToolsReindex: getToolsReindex,
    getEntityReport: getEntityReport,
    getToolsDecodereport: getToolsDecodereport,
    postEntityMigrate_category: postEntityMigrate_category,
    putBusiness: putBusiness,
    getEntityAdd: getEntityAdd,
    getEntityClaim: getEntityClaim,
    postEntityAdvertiserTag: postEntityAdvertiserTag,
    postEntityAdvertiserLocation: postEntityAdvertiserLocation,
    getLookupLocation: getLookupLocation,
    getLookupCategory: getLookupCategory,
    getLookupLegacyCategory: getLookupLegacyCategory,
    postEntityName: postEntityName,
    postEntityBackground: postEntityBackground,
    postEntityEmployee: postEntityEmployee,
    deleteEntityEmployee: deleteEntityEmployee,
    postEntityPhone: postEntityPhone,
    deleteEntityPhone: deleteEntityPhone,
    postEntityFax: postEntityFax,
    deleteEntityFax: deleteEntityFax,
    putCategory: putCategory,
    postCategoryMappings: postCategoryMappings,
    postCategorySynonym: postCategorySynonym,
    deleteCategorySynonym: deleteCategorySynonym,
    postCategoryMerge: postCategoryMerge,
    postEntityCategory: postEntityCategory,
    deleteEntityCategory: deleteEntityCategory,
    postEntityGeopoint: postEntityGeopoint,
    getMatchByphone: getMatchByphone,
    getMatchBylocation: getMatchBylocation,
    getToolsStopwords: getToolsStopwords,
    getToolsStem: getToolsStem,
    getToolsPhonetic: getToolsPhonetic,
    getToolsProcess_string: getToolsProcess_string,
    getToolsProcess_phone: getToolsProcess_phone,
    getToolsSpider: getToolsSpider,
    getToolsGeocode: getToolsGeocode,
    getToolsIodocs: getToolsIodocs,
    getToolsDocs: getToolsDocs,
    getToolsFormatPhone: getToolsFormatPhone,
    getToolsFormatAddress: getToolsFormatAddress,
    postEntityInvoice_address: postEntityInvoice_address,
    deleteEntityInvoice_address: deleteEntityInvoice_address,
    postEntityTag: postEntityTag,
    deleteEntityTag: deleteEntityTag,
    postEntityPostal_address: postEntityPostal_address,
    postEntityAdvertiser: postEntityAdvertiser,
    deleteEntityAdvertiser: deleteEntityAdvertiser,
    postEntityEmail: postEntityEmail,
    deleteEntityEmail: deleteEntityEmail,
    postEntityWebsite: postEntityWebsite,
    deleteEntityWebsite: deleteEntityWebsite,
    postEntityImage: postEntityImage,
    deleteEntityImage: deleteEntityImage,
    getLocation: getLocation,
    postLocation: postLocation,
    postLocationSynonym: postLocationSynonym,
    deleteLocationSynonym: deleteLocationSynonym,
    postLocationSource: postLocationSource,
    postEntityStatus: postEntityStatus,
    postEntityLogo: postEntityLogo,
    deleteEntityLogo: deleteEntityLogo,
    postEntityVideo: postEntityVideo,
    deleteEntityVideo: deleteEntityVideo,
    postEntityAffiliate_link: postEntityAffiliate_link,
    deleteEntityAffiliate_link: deleteEntityAffiliate_link,
    postEntityDescription: postEntityDescription,
    deleteEntityDescription: deleteEntityDescription,
    postEntityList: postEntityList,
    deleteEntityList: deleteEntityList,
    postEntityDocument: postEntityDocument,
    deleteEntityDocument: deleteEntityDocument,
    postEntityTestimonial: postEntityTestimonial,
    deleteEntityTestimonial: deleteEntityTestimonial,
    postEntityOpening_times: postEntityOpening_times,
    postEntitySpecial_offer: postEntitySpecial_offer,
    deleteEntitySpecial_offer: deleteEntitySpecial_offer,
    postUser: postUser,
    getUserBy_email: getUserBy_email,
    getUser: getUser,
    getUserBy_social_media: getUserBy_social_media,
    getAutocompleteCategory: getAutocompleteCategory,
    getAutocompleteKeyword: getAutocompleteKeyword,
    getAutocompleteLocation: getAutocompleteLocation,
    putQueue: putQueue,
    deleteQueue: deleteQueue,
    getQueue: getQueue,
    postQueueUnlock: postQueueUnlock,
    postQueueError: postQueueError,
    getQueueSearch: getQueueSearch,
    putTransaction: putTransaction,
    postTransactionInprogress: postTransactionInprogress,
    postTransactionAuthorised: postTransactionAuthorised,
    postTransactionComplete: postTransactionComplete,
    postTransactionCancelled: postTransactionCancelled,
    getTransaction: getTransaction,
    getTransactionBy_paypal_transaction_id: getTransactionBy_paypal_transaction_id,
    postEntityClaim: postEntityClaim,
    postPublisher: postPublisher,
    deletePublisher: deletePublisher,
    getPublisher: getPublisher,
    getPublisherByCountry: getPublisherByCountry,
    getPublisherByEntityId: getPublisherByEntityId,
    postCountry: postCountry,
    getCountry: getCountry
  }
