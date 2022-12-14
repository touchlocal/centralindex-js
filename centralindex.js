2022/12/14 12:14:29 STARTUP Redis server: tcp://127.0.0.1:6379
2022/12/14 12:14:29 STARTUP ElasticSearch server: http://172.22.12.49:9200
2022/12/14 12:14:29 STARTUP ES view server: http://172.22.114.129:63300/view/view
2022/12/14 12:14:29 STARTUP CouchDB server: http://wolf_staging:******@172.22.10.201:5984
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
   * With a 192 id get remote entity data
   *
   *  @param oneninetwo_id
   *  @return - the data from the api
  */
  var GET192Get = function (oneninetwo_id, callback) {

    params = {};
    params.oneninetwo_id = oneninetwo_id;
    
    doCurl("/192/get",params,function(error,body){
      callback(error,body);
    })
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
  var GETActivity_stream = function (type, country, latitude_1, longitude_1, latitude_2, longitude_2, number_results, unique_action, callback) {

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
  var POSTActivity_stream = function (entity_id, entity_name, type, country, longitude, latitude, callback) {

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
   * Get all entities in which live ads have the matched reseller_masheryid.
   *
   *  @param country
   *  @param reseller_masheryid
   *  @param name_only - If true the query result contains entity name only; otherwise, the entity object.
   *  @param name_match - Filter the result in which the name contains the given text.
   *  @param skip
   *  @param take - Set 0 to get all result. However, if name_only=false, only 100 objects at most will be returned to prevent oversized response body.
   *  @return - the data from the api
  */
  var GETAdvertiserBy_reseller_masheryid = function (country, reseller_masheryid, name_only, name_match, skip, take, callback) {

    params = {};
    params.country = country;
    params.reseller_masheryid = reseller_masheryid;
    params.name_only = name_only;
    params.name_match = name_match;
    params.skip = skip;
    params.take = take;
    
    doCurl("/advertiser/by_reseller_masheryid",params,function(error,body){
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
  var GETAdvertiserUpdated = function (from_date, country, callback) {

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
  var GETAdvertiserUpdatedBy_publisher = function (publisher_id, from_date, country, callback) {

    params = {};
    params.publisher_id = publisher_id;
    params.from_date = from_date;
    params.country = country;
    
    doCurl("/advertiser/updated/by_publisher",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Check that the advertiser has a premium inventory
   *
   *  @param type
   *  @param category_id - The category of the advertiser
   *  @param location_id - The location of the advertiser
   *  @param publisher_id - The publisher of the advertiser
   *  @return - the data from the api
  */
  var GETAdvertisersPremiumInventorycheck = function (type, category_id, location_id, publisher_id, callback) {

    params = {};
    params.type = type;
    params.category_id = category_id;
    params.location_id = location_id;
    params.publisher_id = publisher_id;
    
    doCurl("/advertisers/premium/inventorycheck",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Delete an association
   *
   *  @param association_id
   *  @return - the data from the api
  */
  var DELETEAssociation = function (association_id, callback) {

    params = {};
    params.association_id = association_id;
    
    doCurl("/association",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch an association
   *
   *  @param association_id
   *  @return - the data from the api
  */
  var GETAssociation = function (association_id, callback) {

    params = {};
    params.association_id = association_id;
    
    doCurl("/association",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Will create a new association or update an existing one
   *
   *  @param association_id
   *  @param association_name
   *  @param association_url
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTAssociation = function (association_id, association_name, association_url, filedata, callback) {

    params = {};
    params.association_id = association_id;
    params.association_name = association_name;
    params.association_url = association_url;
    params.filedata = filedata;
    
    doCurl("/association",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * The search matches a category name on a given string and language.
   *
   *  @param str - A string to search against, E.g. Plumbers e.g. but
   *  @param language - An ISO compatible language code, E.g. en e.g. en
   *  @param mapped_to_partner - Only return CI categories that have a partner mapping
   *  @return - the data from the api
  */
  var GETAutocompleteCategory = function (str, language, mapped_to_partner, callback) {

    params = {};
    params.str = str;
    params.language = language;
    params.mapped_to_partner = mapped_to_partner;
    
    doCurl("/autocomplete/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * The search matches a category name and ID on a given string and language.
   *
   *  @param str - A string to search against, E.g. Plumbers e.g. but
   *  @param language - An ISO compatible language code, E.g. en e.g. en
   *  @param mapped_to_partner - Only return CI categories that have a partner mapping
   *  @return - the data from the api
  */
  var GETAutocompleteCategoryId = function (str, language, mapped_to_partner, callback) {

    params = {};
    params.str = str;
    params.language = language;
    params.mapped_to_partner = mapped_to_partner;
    
    doCurl("/autocomplete/category/id",params,function(error,body){
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
  var GETAutocompleteKeyword = function (str, language, callback) {

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
  var GETAutocompleteLocation = function (str, country, language, callback) {

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
  var GETAutocompleteLocationBy_resolution = function (str, country, resolution, callback) {

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
   *  @param status
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
   *  @param allow_no_address
   *  @param allow_no_phone
   *  @param additional_telephone_number
   *  @param email
   *  @param website
   *  @param payment_types - Payment types separated by comma
   *  @param tags - Tags separated by comma
   *  @param category_id
   *  @param category_type
   *  @param featured_message_text - Featured message content
   *  @param featured_message_url - Featured message URL
   *  @param do_not_display
   *  @param orderonline
   *  @param delivers
   *  @param referrer_url
   *  @param referrer_name
   *  @param destructive
   *  @param delete_mode - The type of object contribution deletion
   *  @param master_entity_id - The entity you want this data to go to
   *  @param no_merge_on_error - If true, data duplication error will be returned when a matched entity is found. If false, such error is suppressed and data is merged into the matched entity.
   *  @return - the data from the api
  */
  var PUTBusiness = function (name, status, building_number, branch_name, address1, address2, address3, district, town, county, province, postcode, country, latitude, longitude, timezone, telephone_number, allow_no_address, allow_no_phone, additional_telephone_number, email, website, payment_types, tags, category_id, category_type, featured_message_text, featured_message_url, do_not_display, orderonline, delivers, referrer_url, referrer_name, destructive, delete_mode, master_entity_id, no_merge_on_error, callback) {

    params = {};
    params.name = name;
    params.status = status;
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
    params.allow_no_address = allow_no_address;
    params.allow_no_phone = allow_no_phone;
    params.additional_telephone_number = additional_telephone_number;
    params.email = email;
    params.website = website;
    params.payment_types = payment_types;
    params.tags = tags;
    params.category_id = category_id;
    params.category_type = category_type;
    params.featured_message_text = featured_message_text;
    params.featured_message_url = featured_message_url;
    params.do_not_display = do_not_display;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.referrer_url = referrer_url;
    params.referrer_name = referrer_name;
    params.destructive = destructive;
    params.delete_mode = delete_mode;
    params.master_entity_id = master_entity_id;
    params.no_merge_on_error = no_merge_on_error;
    
    doCurl("/business",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create entity via JSON
   *
   *  @param json - Business JSON
   *  @param country - The country to fetch results for e.g. gb
   *  @param timezone
   *  @param master_entity_id - The entity you want this data to go to
   *  @param allow_no_address
   *  @param allow_no_phone
   *  @param queue_priority
   *  @param skip_dedup_check - If true, skip checking on existing supplier ID, phone numbers, etc.
   *  @return - the data from the api
  */
  var PUTBusinessJson = function (json, country, timezone, master_entity_id, allow_no_address, allow_no_phone, queue_priority, skip_dedup_check, callback) {

    params = {};
    params.json = json;
    params.country = country;
    params.timezone = timezone;
    params.master_entity_id = master_entity_id;
    params.allow_no_address = allow_no_address;
    params.allow_no_phone = allow_no_phone;
    params.queue_priority = queue_priority;
    params.skip_dedup_check = skip_dedup_check;
    
    doCurl("/business/json",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create entity via JSON
   *
   *  @param entity_id - The entity to add rich data too
   *  @param json - The rich data to add to the entity
   *  @return - the data from the api
  */
  var POSTBusinessJsonProcess = function (entity_id, json, callback) {

    params = {};
    params.entity_id = entity_id;
    params.json = json;
    
    doCurl("/business/json/process",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Delete a business tool with a specified tool_id
   *
   *  @param tool_id
   *  @return - the data from the api
  */
  var DELETEBusiness_tool = function (tool_id, callback) {

    params = {};
    params.tool_id = tool_id;
    
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
  var GETBusiness_tool = function (tool_id, callback) {

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
  var POSTBusiness_tool = function (tool_id, country, headline, description, link_url, active, callback) {

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
   * Returns active business tools for a specific masheryid in a given country
   *
   *  @param country
   *  @param activeonly
   *  @return - the data from the api
  */
  var GETBusiness_toolBy_masheryid = function (country, activeonly, callback) {

    params = {};
    params.country = country;
    params.activeonly = activeonly;
    
    doCurl("/business_tool/by_masheryid",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Assigns a Call To Action to a Business Tool
   *
   *  @param tool_id
   *  @param enablecta
   *  @param cta_id
   *  @param slug
   *  @param nomodal
   *  @param type
   *  @param headline
   *  @param textshort
   *  @param link
   *  @param linklabel
   *  @param textlong
   *  @param textoutro
   *  @param bullets
   *  @param masheryids
   *  @param imgurl
   *  @param custombranding
   *  @param customcol
   *  @param custombkg
   *  @param customctacol
   *  @param customctabkg
   *  @param custominfocol
   *  @param custominfobkg
   *  @return - the data from the api
  */
  var POSTBusiness_toolCta = function (tool_id, enablecta, cta_id, slug, nomodal, type, headline, textshort, link, linklabel, textlong, textoutro, bullets, masheryids, imgurl, custombranding, customcol, custombkg, customctacol, customctabkg, custominfocol, custominfobkg, callback) {

    params = {};
    params.tool_id = tool_id;
    params.enablecta = enablecta;
    params.cta_id = cta_id;
    params.slug = slug;
    params.nomodal = nomodal;
    params.type = type;
    params.headline = headline;
    params.textshort = textshort;
    params.link = link;
    params.linklabel = linklabel;
    params.textlong = textlong;
    params.textoutro = textoutro;
    params.bullets = bullets;
    params.masheryids = masheryids;
    params.imgurl = imgurl;
    params.custombranding = custombranding;
    params.customcol = customcol;
    params.custombkg = custombkg;
    params.customctacol = customctacol;
    params.customctabkg = customctabkg;
    params.custominfocol = custominfocol;
    params.custominfobkg = custominfobkg;
    
    doCurl("/business_tool/cta",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Assigns a Business Tool image
   *
   *  @param tool_id
   *  @param assignimage
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTBusiness_toolImage = function (tool_id, assignimage, filedata, callback) {

    params = {};
    params.tool_id = tool_id;
    params.assignimage = assignimage;
    params.filedata = filedata;
    
    doCurl("/business_tool/image",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Assigns a Business Tool image
   *
   *  @param tool_id
   *  @param image_url
   *  @return - the data from the api
  */
  var POSTBusiness_toolImageBy_url = function (tool_id, image_url, callback) {

    params = {};
    params.tool_id = tool_id;
    params.image_url = image_url;
    
    doCurl("/business_tool/image/by_url",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known cache key get the data from cache
   *
   *  @param cache_key
   *  @param use_compression
   *  @return - the data from the api
  */
  var GETCache = function (cache_key, use_compression, callback) {

    params = {};
    params.cache_key = cache_key;
    params.use_compression = use_compression;
    
    doCurl("/cache",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add some data to the cache with a given expiry
   *
   *  @param cache_key
   *  @param expiry - The cache expiry in seconds
   *  @param data - The data to cache
   *  @param use_compression
   *  @return - the data from the api
  */
  var POSTCache = function (cache_key, expiry, data, use_compression, callback) {

    params = {};
    params.cache_key = cache_key;
    params.expiry = expiry;
    params.data = data;
    params.use_compression = use_compression;
    
    doCurl("/cache",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns the supplied wolf category object by fetching the supplied category_id from our categories object.
   *
   *  @param category_id
   *  @return - the data from the api
  */
  var GETCategory = function (category_id, callback) {

    params = {};
    params.category_id = category_id;
    
    doCurl("/category",params,function(error,body){
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
  var PUTCategory = function (category_id, language, name, callback) {

    params = {};
    params.category_id = category_id;
    params.language = language;
    params.name = name;
    
    doCurl("/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns all Central Index categories and associated data
   *
   *  @param partner
   *  @return - the data from the api
  */
  var GETCategoryAll = function (partner, callback) {

    params = {};
    params.partner = partner;
    
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
  var POSTCategoryMappings = function (category_id, type, id, name, callback) {

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
  var DELETECategoryMappings = function (category_id, category_type, mapped_id, callback) {

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
  var POSTCategoryMerge = function (from, to, callback) {

    params = {};
    params.from = from;
    params.to = to;
    
    doCurl("/category/merge",params,function(error,body){
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
  var POSTCategorySynonym = function (category_id, synonym, language, callback) {

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
  var DELETECategorySynonym = function (category_id, synonym, language, callback) {

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
  var GETContract = function (contract_id, callback) {

    params = {};
    params.contract_id = contract_id;
    
    doCurl("/contract",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the active contracts from the ID supplied
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var GETContractBy_entity_id = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/contract/by_entity_id",params,function(error,body){
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
  var GETContractBy_payment_provider_id = function (payment_provider, payment_provider_id, callback) {

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
  var GETContractBy_user_id = function (user_id, callback) {

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
  var POSTContractCancel = function (contract_id, callback) {

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
   *  @param taxrate
   *  @param billing_period
   *  @param source
   *  @param channel
   *  @param campaign
   *  @param referrer_domain
   *  @param referrer_name
   *  @param flatpack_id
   *  @return - the data from the api
  */
  var POSTContractCreate = function (entity_id, user_id, payment_provider, basket, taxrate, billing_period, source, channel, campaign, referrer_domain, referrer_name, flatpack_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.user_id = user_id;
    params.payment_provider = payment_provider;
    params.basket = basket;
    params.taxrate = taxrate;
    params.billing_period = billing_period;
    params.source = source;
    params.channel = channel;
    params.campaign = campaign;
    params.referrer_domain = referrer_domain;
    params.referrer_name = referrer_name;
    params.flatpack_id = flatpack_id;
    
    doCurl("/contract/create",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Activate a contract that is free
   *
   *  @param contract_id
   *  @param user_name
   *  @param user_surname
   *  @param user_email_address
   *  @return - the data from the api
  */
  var POSTContractFreeactivate = function (contract_id, user_name, user_surname, user_email_address, callback) {

    params = {};
    params.contract_id = contract_id;
    params.user_name = user_name;
    params.user_surname = user_surname;
    params.user_email_address = user_email_address;
    
    doCurl("/contract/freeactivate",params,function(error,body){
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
  var POSTContractPaymentFailure = function (contract_id, failure_reason, payment_date, amount, currency, response, callback) {

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
  var POSTContractPaymentSetup = function (contract_id, payment_provider_id, payment_provider_profile, user_name, user_surname, user_billing_address, user_email_address, callback) {

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
  var POSTContractPaymentSuccess = function (contract_id, payment_date, amount, currency, response, callback) {

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
  var POSTContractProvision = function (contract_id, callback) {

    params = {};
    params.contract_id = contract_id;
    
    doCurl("/contract/provision",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Ensures contract has been cancelled for a given id, expected to be called from stripe on deletion of subscription
   *
   *  @param contract_id
   *  @return - the data from the api
  */
  var POSTContractSubscriptionended = function (contract_id, callback) {

    params = {};
    params.contract_id = contract_id;
    
    doCurl("/contract/subscriptionended",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the contract log from the ID supplied
   *
   *  @param contract_log_id
   *  @return - the data from the api
  */
  var GETContract_log = function (contract_log_id, callback) {

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
  var POSTContract_log = function (contract_id, date, payment_provider, response, success, amount, currency, callback) {

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
  var GETContract_logBy_contract_id = function (contract_id, page, per_page, callback) {

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
  var GETContract_logBy_payment_provider = function (payment_provider, page, per_page, callback) {

    params = {};
    params.payment_provider = payment_provider;
    params.page = page;
    params.per_page = per_page;
    
    doCurl("/contract_log/by_payment_provider",params,function(error,body){
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
   *  @param claimProductId
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
  var POSTCountry = function (country_id, name, synonyms, continentName, continent, geonameId, dbpediaURL, freebaseURL, population, currencyCode, languages, areaInSqKm, capital, east, west, north, south, claimProductId, claimMethods, twilio_sms, twilio_phone, twilio_voice, currency_symbol, currency_symbol_html, postcodeLookupActive, addressFields, addressMatching, dateFormat, iso_3166_alpha_3, iso_3166_numeric, callback) {

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
    params.claimProductId = claimProductId;
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
   * Fetching a country
   *
   *  @param country_id
   *  @return - the data from the api
  */
  var GETCountry = function (country_id, callback) {

    params = {};
    params.country_id = country_id;
    
    doCurl("/country",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * An API call to fetch a crash report by its ID
   *
   *  @param crash_report_id - The crash report to pull
   *  @return - the data from the api
  */
  var GETCrash_report = function (crash_report_id, callback) {

    params = {};
    params.crash_report_id = crash_report_id;
    
    doCurl("/crash_report",params,function(error,body){
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
  var POSTEmail = function (to_email_address, reply_email_address, source_account, subject, body, html_body, callback) {

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
   *  @param timezone
   *  @param trust
   *  @param our_data
   *  @return - the data from the api
  */
  var PUTEntity = function (type, scope, country, timezone, trust, our_data, callback) {

    params = {};
    params.type = type;
    params.scope = scope;
    params.country = country;
    params.timezone = timezone;
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
   *  @param domain
   *  @param path
   *  @param data_filter
   *  @param filter_by_confidence
   *  @return - the data from the api
  */
  var GETEntity = function (entity_id, domain, path, data_filter, filter_by_confidence, callback) {

    params = {};
    params.entity_id = entity_id;
    params.domain = domain;
    params.path = path;
    params.data_filter = data_filter;
    params.filter_by_confidence = filter_by_confidence;
    
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
  var POSTEntityAdd = function (entity_id, add_referrer_url, add_referrer_name, callback) {

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
  var DELETEEntityAdvertiser = function (entity_id, gen_id, callback) {

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
  var POSTEntityAdvertiserCancel = function (entity_id, publisher_id, reseller_ref, reseller_agent_id, callback) {

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
   *  @param loc_tags
   *  @param region_tags
   *  @param max_tags
   *  @param max_locations
   *  @param expiry_date
   *  @param is_national
   *  @param is_regional
   *  @param language
   *  @param reseller_ref
   *  @param reseller_agent_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var POSTEntityAdvertiserCreate = function (entity_id, tags, locations, loc_tags, region_tags, max_tags, max_locations, expiry_date, is_national, is_regional, language, reseller_ref, reseller_agent_id, publisher_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.tags = tags;
    params.locations = locations;
    params.loc_tags = loc_tags;
    params.region_tags = region_tags;
    params.max_tags = max_tags;
    params.max_locations = max_locations;
    params.expiry_date = expiry_date;
    params.is_national = is_national;
    params.is_regional = is_regional;
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
  var POSTEntityAdvertiserLocation = function (entity_id, gen_id, locations_to_add, locations_to_remove, callback) {

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
   * With a known entity id, a premium advertiser is cancelled
   *
   *  @param entity_id
   *  @param publisher_id
   *  @param type
   *  @param category_id - The category of the advertiser
   *  @param location_id - The location of the advertiser
   *  @return - the data from the api
  */
  var POSTEntityAdvertiserPremiumCancel = function (entity_id, publisher_id, type, category_id, location_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.publisher_id = publisher_id;
    params.type = type;
    params.category_id = category_id;
    params.location_id = location_id;
    
    doCurl("/entity/advertiser/premium/cancel",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a premium advertiser is added
   *
   *  @param entity_id
   *  @param type
   *  @param category_id - The category of the advertiser
   *  @param location_id - The location of the advertiser
   *  @param expiry_date
   *  @param reseller_ref
   *  @param reseller_agent_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var POSTEntityAdvertiserPremiumCreate = function (entity_id, type, category_id, location_id, expiry_date, reseller_ref, reseller_agent_id, publisher_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.type = type;
    params.category_id = category_id;
    params.location_id = location_id;
    params.expiry_date = expiry_date;
    params.reseller_ref = reseller_ref;
    params.reseller_agent_id = reseller_agent_id;
    params.publisher_id = publisher_id;
    
    doCurl("/entity/advertiser/premium/create",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Renews an existing premium advertiser in an entity
   *
   *  @param entity_id
   *  @param type
   *  @param category_id - The category of the advertiser
   *  @param location_id - The location of the advertiser
   *  @param expiry_date
   *  @param reseller_ref
   *  @param reseller_agent_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var POSTEntityAdvertiserPremiumRenew = function (entity_id, type, category_id, location_id, expiry_date, reseller_ref, reseller_agent_id, publisher_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.type = type;
    params.category_id = category_id;
    params.location_id = location_id;
    params.expiry_date = expiry_date;
    params.reseller_ref = reseller_ref;
    params.reseller_agent_id = reseller_agent_id;
    params.publisher_id = publisher_id;
    
    doCurl("/entity/advertiser/premium/renew",params,function(error,body){
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
  var POSTEntityAdvertiserRenew = function (entity_id, expiry_date, publisher_id, reseller_ref, reseller_agent_id, callback) {

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
  var POSTEntityAdvertiserTag = function (gen_id, entity_id, language, tags_to_add, tags_to_remove, callback) {

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
   *  @param loc_tags
   *  @param is_regional
   *  @param region_tags
   *  @param extra_tags
   *  @param extra_locations
   *  @param is_national
   *  @param language
   *  @param reseller_ref
   *  @param reseller_agent_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var POSTEntityAdvertiserUpsell = function (entity_id, tags, locations, loc_tags, is_regional, region_tags, extra_tags, extra_locations, is_national, language, reseller_ref, reseller_agent_id, publisher_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.tags = tags;
    params.locations = locations;
    params.loc_tags = loc_tags;
    params.is_regional = is_regional;
    params.region_tags = region_tags;
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
   *  @param orderonline - Favours online ordering where set to true
   *  @param delivers - Favours delivery where set to true
   *  @param isClaimed - 1: claimed; 0: not claimed or claim expired; -1: ignore this filter.
   *  @param is_national
   *  @param limit - The number of advertisers that are to be returned
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @param benchmark
   *  @return - the data from the api
  */
  var GETEntityAdvertisers = function (tag, where, orderonline, delivers, isClaimed, is_national, limit, country, language, benchmark, callback) {

    params = {};
    params.tag = tag;
    params.where = where;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.isClaimed = isClaimed;
    params.is_national = is_national;
    params.limit = limit;
    params.country = country;
    params.language = language;
    params.benchmark = benchmark;
    
    doCurl("/entity/advertisers",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities in a specified location that are advertisers and return a random selection upto the limit requested
   *
   *  @param location - The location to get results for. E.g. Dublin
   *  @param is_national
   *  @param limit - The number of advertisers that are to be returned
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @return - the data from the api
  */
  var GETEntityAdvertisersBy_location = function (location, is_national, limit, country, language, callback) {

    params = {};
    params.location = location;
    params.is_national = is_national;
    params.limit = limit;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/advertisers/by_location",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Check if an entity has an advert from a specified publisher
   *
   *  @param entity_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var GETEntityAdvertisersInventorycheck = function (entity_id, publisher_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.publisher_id = publisher_id;
    
    doCurl("/entity/advertisers/inventorycheck",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get advertisers premium
   *
   *  @param what
   *  @param where
   *  @param type
   *  @param country
   *  @param language
   *  @return - the data from the api
  */
  var GETEntityAdvertisersPremium = function (what, where, type, country, language, callback) {

    params = {};
    params.what = what;
    params.where = where;
    params.type = type;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/advertisers/premium",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Deleteing an affiliate adblock from a known entity
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var DELETEEntityAffiliate_adblock = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/affiliate_adblock",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Adding an affiliate adblock to a known entity
   *
   *  @param entity_id
   *  @param adblock - Number of results returned per page
   *  @return - the data from the api
  */
  var POSTEntityAffiliate_adblock = function (entity_id, adblock, callback) {

    params = {};
    params.entity_id = entity_id;
    params.adblock = adblock;
    
    doCurl("/entity/affiliate_adblock",params,function(error,body){
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
   *  @param affiliate_action
   *  @return - the data from the api
  */
  var POSTEntityAffiliate_link = function (entity_id, affiliate_name, affiliate_link, affiliate_message, affiliate_logo, affiliate_action, callback) {

    params = {};
    params.entity_id = entity_id;
    params.affiliate_name = affiliate_name;
    params.affiliate_link = affiliate_link;
    params.affiliate_message = affiliate_message;
    params.affiliate_logo = affiliate_logo;
    params.affiliate_action = affiliate_action;
    
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
  var DELETEEntityAffiliate_link = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/affiliate_link",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add/edit an annoucement object to an existing entity.
   *
   *  @param entity_id
   *  @param announcement_id
   *  @param headline
   *  @param body
   *  @param link_label
   *  @param link
   *  @param terms_link
   *  @param publish_date
   *  @param expiry_date
   *  @param media_type
   *  @param image_url
   *  @param video_url
   *  @param type - Type of announcement, which affects how it is displayed.
   *  @return - the data from the api
  */
  var POSTEntityAnnouncement = function (entity_id, announcement_id, headline, body, link_label, link, terms_link, publish_date, expiry_date, media_type, image_url, video_url, type, callback) {

    params = {};
    params.entity_id = entity_id;
    params.announcement_id = announcement_id;
    params.headline = headline;
    params.body = body;
    params.link_label = link_label;
    params.link = link;
    params.terms_link = terms_link;
    params.publish_date = publish_date;
    params.expiry_date = expiry_date;
    params.media_type = media_type;
    params.image_url = image_url;
    params.video_url = video_url;
    params.type = type;
    
    doCurl("/entity/announcement",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch an announcement object from an existing entity.
   *
   *  @param entity_id
   *  @param announcement_id
   *  @return - the data from the api
  */
  var GETEntityAnnouncement = function (entity_id, announcement_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.announcement_id = announcement_id;
    
    doCurl("/entity/announcement",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Remove an announcement object to an existing entity.
   *
   *  @param entity_id
   *  @param announcement_id
   *  @return - the data from the api
  */
  var DELETEEntityAnnouncement = function (entity_id, announcement_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.announcement_id = announcement_id;
    
    doCurl("/entity/announcement",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Will create a new association_membership or update an existing one
   *
   *  @param entity_id
   *  @param association_id
   *  @param association_member_url
   *  @param association_member_id
   *  @return - the data from the api
  */
  var POSTEntityAssociation_membership = function (entity_id, association_id, association_member_url, association_member_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.association_id = association_id;
    params.association_member_url = association_member_url;
    params.association_member_id = association_member_id;
    
    doCurl("/entity/association_membership",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a association_membership object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var DELETEEntityAssociation_membership = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/association_membership",params,function(error,body){
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
  var POSTEntityBackground = function (entity_id, number_of_employees, turnover, net_profit, vat_number, duns_number, registered_company_number, callback) {

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
   * With a known entity id, a brand object can be added.
   *
   *  @param entity_id
   *  @param value
   *  @return - the data from the api
  */
  var POSTEntityBrand = function (entity_id, value, callback) {

    params = {};
    params.entity_id = entity_id;
    params.value = value;
    
    doCurl("/entity/brand",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a brand object can be deleted.
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var DELETEEntityBrand = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/brand",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Uploads a CSV file of known format and bulk inserts into DB
   *
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTEntityBulkCsv = function (filedata, callback) {

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
  var GETEntityBulkCsvStatus = function (upload_id, callback) {

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
   *  @param new_entities
   *  @return - the data from the api
  */
  var POSTEntityBulkJson = function (data, new_entities, callback) {

    params = {};
    params.data = data;
    params.new_entities = new_entities;
    
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
  var GETEntityBulkJsonStatus = function (upload_id, callback) {

    params = {};
    params.upload_id = upload_id;
    
    doCurl("/entity/bulk/json/status",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetches the document that matches the given data_source_type and external_id.
   *
   *  @param data_source_type - The data source type of the entity
   *  @param external_id - The external ID of the entity
   *  @return - the data from the api
  */
  var GETEntityBy_external_id = function (data_source_type, external_id, callback) {

    params = {};
    params.data_source_type = data_source_type;
    params.external_id = external_id;
    
    doCurl("/entity/by_external_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get all entities within a specified group
   *
   *  @param group_id
   *  @return - the data from the api
  */
  var GETEntityBy_groupid = function (group_id, callback) {

    params = {};
    params.group_id = group_id;
    
    doCurl("/entity/by_groupid",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetches the document that matches the given legacy_url
   *
   *  @param legacy_url - The URL of the entity in the directory it was imported from.
   *  @return - the data from the api
  */
  var GETEntityBy_legacy_url = function (legacy_url, callback) {

    params = {};
    params.legacy_url = legacy_url;
    
    doCurl("/entity/by_legacy_url",params,function(error,body){
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
  var DELETEEntityBy_supplier = function (entity_id, supplier_masheryid, supplier_id, supplier_user_id, callback) {

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
   *  @param supplier_id - The Supplier ID, or a list of supplier IDs separated by comma
   *  @return - the data from the api
  */
  var GETEntityBy_supplier_id = function (supplier_id, callback) {

    params = {};
    params.supplier_id = supplier_id;
    
    doCurl("/entity/by_supplier_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get all entities added or claimed by a specific user
   *
   *  @param user_id - The unique user ID of the user with claimed entities e.g. 379236608286720
   *  @param filter
   *  @param skip
   *  @param limit
   *  @return - the data from the api
  */
  var GETEntityBy_user_id = function (user_id, filter, skip, limit, callback) {

    params = {};
    params.user_id = user_id;
    params.filter = filter;
    params.skip = skip;
    params.limit = limit;
    
    doCurl("/entity/by_user_id",params,function(error,body){
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
  var POSTEntityCategory = function (entity_id, category_id, category_type, callback) {

    params = {};
    params.entity_id = entity_id;
    params.category_id = category_id;
    params.category_type = category_type;
    
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
  var DELETEEntityCategory = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
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
  var GETEntityChangelog = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/changelog",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Unlike cancel, this operation remove the claim data from the entity
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var DELETEEntityClaim = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/claim",params,function(error,body){
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
   *  @param verified_status - If set to a value, this field will promote the claim to pro mode (expiry aligned with claim expiry)
   *  @param claim_method
   *  @param phone_number
   *  @param referrer_url
   *  @param referrer_name
   *  @param reseller_ref
   *  @param reseller_description
   *  @return - the data from the api
  */
  var POSTEntityClaim = function (entity_id, claimed_user_id, claimed_reseller_id, expiry_date, claimed_date, verified_status, claim_method, phone_number, referrer_url, referrer_name, reseller_ref, reseller_description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.claimed_user_id = claimed_user_id;
    params.claimed_reseller_id = claimed_reseller_id;
    params.expiry_date = expiry_date;
    params.claimed_date = claimed_date;
    params.verified_status = verified_status;
    params.claim_method = claim_method;
    params.phone_number = phone_number;
    params.referrer_url = referrer_url;
    params.referrer_name = referrer_name;
    params.reseller_ref = reseller_ref;
    params.reseller_description = reseller_description;
    
    doCurl("/entity/claim",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Cancel a claim that is on the entity
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var POSTEntityClaimCancel = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/claim/cancel",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allow an entity to be claimed by a valid user
   *
   *  @param entity_id
   *  @param claimed_user_id
   *  @param reseller_ref
   *  @param reseller_description
   *  @param expiry_date
   *  @param renew_verify - Update the verified_status (where present) as well. Paid claims should do this -- free claims generally will not.
   *  @return - the data from the api
  */
  var POSTEntityClaimRenew = function (entity_id, claimed_user_id, reseller_ref, reseller_description, expiry_date, renew_verify, callback) {

    params = {};
    params.entity_id = entity_id;
    params.claimed_user_id = claimed_user_id;
    params.reseller_ref = reseller_ref;
    params.reseller_description = reseller_description;
    params.expiry_date = expiry_date;
    params.renew_verify = renew_verify;
    
    doCurl("/entity/claim/renew",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allow an entity to be claimed by a valid reseller
   *
   *  @param entity_id
   *  @param reseller_ref
   *  @param reseller_description
   *  @return - the data from the api
  */
  var POSTEntityClaimReseller = function (entity_id, reseller_ref, reseller_description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.reseller_ref = reseller_ref;
    params.reseller_description = reseller_description;
    
    doCurl("/entity/claim/reseller",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * If an entity is currently claimed then set or remove the verified_entity block (Expiry will match the claim expiry)
   *
   *  @param entity_id
   *  @param verified_status - If set to a value, this field will promote the claim to pro mode. If blank, verified status will be wiped
   *  @return - the data from the api
  */
  var POSTEntityClaimVerfied_status = function (entity_id, verified_status, callback) {

    params = {};
    params.entity_id = entity_id;
    params.verified_status = verified_status;
    
    doCurl("/entity/claim/verfied_status",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add/change delivers flag for an existing entity - to indicate whether business offers delivery
   *
   *  @param entity_id
   *  @param delivers
   *  @return - the data from the api
  */
  var POSTEntityDelivers = function (entity_id, delivers, callback) {

    params = {};
    params.entity_id = entity_id;
    params.delivers = delivers;
    
    doCurl("/entity/delivers",params,function(error,body){
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
  var DELETEEntityDescription = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/description",params,function(error,body){
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
  var POSTEntityDescription = function (entity_id, headline, body, gen_id, callback) {

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
   * With a known entity id, an document object can be added.
   *
   *  @param entity_id
   *  @param name
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTEntityDocument = function (entity_id, name, filedata, callback) {

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
  var DELETEEntityDocument = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/document",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Upload a document to an entity
   *
   *  @param entity_id
   *  @param document
   *  @return - the data from the api
  */
  var POSTEntityDocumentBy_url = function (entity_id, document, callback) {

    params = {};
    params.entity_id = entity_id;
    params.document = document;
    
    doCurl("/entity/document/by_url",params,function(error,body){
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
  var DELETEEntityEmail = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/email",params,function(error,body){
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
  var POSTEntityEmail = function (entity_id, email_address, email_description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.email_address = email_address;
    params.email_description = email_description;
    
    doCurl("/entity/email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch an emergency statement object from an existing entity.
   *
   *  @param entity_id
   *  @param emergencystatement_id
   *  @return - the data from the api
  */
  var GETEntityEmergencystatement = function (entity_id, emergencystatement_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.emergencystatement_id = emergencystatement_id;
    
    doCurl("/entity/emergencystatement",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add or update an emergency statement object to an existing entity.
   *
   *  @param entity_id
   *  @param id
   *  @param headline
   *  @param body
   *  @param link_label
   *  @param link
   *  @param publish_date
   *  @return - the data from the api
  */
  var POSTEntityEmergencystatement = function (entity_id, id, headline, body, link_label, link, publish_date, callback) {

    params = {};
    params.entity_id = entity_id;
    params.id = id;
    params.headline = headline;
    params.body = body;
    params.link_label = link_label;
    params.link = link;
    params.publish_date = publish_date;
    
    doCurl("/entity/emergencystatement",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Remove an emergencystatement object to an existing entity.
   *
   *  @param entity_id
   *  @param emergencystatement_id
   *  @return - the data from the api
  */
  var DELETEEntityEmergencystatement = function (entity_id, emergencystatement_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.emergencystatement_id = emergencystatement_id;
    
    doCurl("/entity/emergencystatement",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch emergency statement objects from an existing entity.
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var GETEntityEmergencystatements = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/emergencystatements",params,function(error,body){
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
  var POSTEntityEmployee = function (entity_id, title, forename, surname, job_title, description, email, phone_number, callback) {

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
  var DELETEEntityEmployee = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/employee",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an FAQ question and answer can be added.
   *
   *  @param entity_id
   *  @param question
   *  @param answer
   *  @param gen_id
   *  @return - the data from the api
  */
  var POSTEntityFaq = function (entity_id, question, answer, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.question = question;
    params.answer = answer;
    params.gen_id = gen_id;
    
    doCurl("/entity/faq",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an FAQ question and answer can be removed.
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var DELETEEntityFaq = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/faq",params,function(error,body){
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
  var DELETEEntityFax = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/fax",params,function(error,body){
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
  var POSTEntityFax = function (entity_id, number, description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.number = number;
    params.description = description;
    
    doCurl("/entity/fax",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a featured message can be added
   *
   *  @param entity_id
   *  @param featured_text
   *  @param featured_url
   *  @return - the data from the api
  */
  var POSTEntityFeatured_message = function (entity_id, featured_text, featured_url, callback) {

    params = {};
    params.entity_id = entity_id;
    params.featured_text = featured_text;
    params.featured_url = featured_url;
    
    doCurl("/entity/featured_message",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a featured message object to be removed
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var DELETEEntityFeatured_message = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/featured_message",params,function(error,body){
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
  var POSTEntityGeopoint = function (entity_id, longitude, latitude, accuracy, callback) {

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
  var POSTEntityGroup = function (entity_id, group_id, callback) {

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
  var DELETEEntityGroup = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/group",params,function(error,body){
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
  var POSTEntityImage = function (entity_id, filedata, image_name, callback) {

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
  var DELETEEntityImage = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/image",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a image can be retrieved from a url and added.
   *
   *  @param entity_id
   *  @param image_url
   *  @param image_name
   *  @return - the data from the api
  */
  var POSTEntityImageBy_url = function (entity_id, image_url, image_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.image_url = image_url;
    params.image_name = image_name;
    
    doCurl("/entity/image/by_url",params,function(error,body){
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
  var POSTEntityInvoice_address = function (entity_id, building_number, address1, address2, address3, district, town, county, province, postcode, address_type, callback) {

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
   * With a known entity id and a known invoice_address ID, we can delete a specific invoice_address object from an enitity.
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var DELETEEntityInvoice_address = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/invoice_address",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a language object can be deleted.
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var DELETEEntityLanguage = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/language",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a language object can be added.
   *
   *  @param entity_id
   *  @param value
   *  @return - the data from the api
  */
  var POSTEntityLanguage = function (entity_id, value, callback) {

    params = {};
    params.entity_id = entity_id;
    params.value = value;
    
    doCurl("/entity/language",params,function(error,body){
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
  var DELETEEntityList = function (gen_id, entity_id, callback) {

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
  var POSTEntityList = function (entity_id, headline, body, callback) {

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
  var GETEntityList_by_group_id = function (group_id, per_page, page, callback) {

    params = {};
    params.group_id = group_id;
    params.per_page = per_page;
    params.page = page;
    
    doCurl("/entity/list_by_group_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Adds/removes loc_tags
   *
   *  @param entity_id
   *  @param gen_id
   *  @param loc_tags_to_add
   *  @param loc_tags_to_remove
   *  @return - the data from the api
  */
  var POSTEntityLoc_tag = function (entity_id, gen_id, loc_tags_to_add, loc_tags_to_remove, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    params.loc_tags_to_add = loc_tags_to_add;
    params.loc_tags_to_remove = loc_tags_to_remove;
    
    doCurl("/entity/loc_tag",params,function(error,body){
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
  var DELETEEntityLogo = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/logo",params,function(error,body){
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
  var POSTEntityLogo = function (entity_id, filedata, logo_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.filedata = filedata;
    params.logo_name = logo_name;
    
    doCurl("/entity/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a logo can be retrieved from a url and added.
   *
   *  @param entity_id
   *  @param logo_url
   *  @param logo_name
   *  @return - the data from the api
  */
  var POSTEntityLogoBy_url = function (entity_id, logo_url, logo_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.logo_url = logo_url;
    params.logo_name = logo_name;
    
    doCurl("/entity/logo/by_url",params,function(error,body){
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
   *  @param delete_mode - The type of object contribution deletion
   *  @return - the data from the api
  */
  var POSTEntityMerge = function (from, to, override_trust, uncontribute_masheryid, uncontribute_userid, uncontribute_supplierid, delete_mode, callback) {

    params = {};
    params.from = from;
    params.to = to;
    params.override_trust = override_trust;
    params.uncontribute_masheryid = uncontribute_masheryid;
    params.uncontribute_userid = uncontribute_userid;
    params.uncontribute_supplierid = uncontribute_supplierid;
    params.delete_mode = delete_mode;
    
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
  var POSTEntityMigrate_category = function (from, to, limit, callback) {

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
  var POSTEntityName = function (entity_id, name, formal_name, branch_name, callback) {

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
   * With a known entity id, a opening times object can be added. Each day can be either 'closed' to indicate that the entity is closed that day, '24hour' to indicate that the entity is open all day or single/split time ranges can be supplied in 4-digit 24-hour format, such as '09001730' or '09001200,13001700' to indicate hours of opening.
   *
   *  @param entity_id - The id of the entity to edit
   *  @param statement - Statement describing reasons for special opening/closing times
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
  var POSTEntityOpening_times = function (entity_id, statement, monday, tuesday, wednesday, thursday, friday, saturday, sunday, closed, closed_public_holidays, callback) {

    params = {};
    params.entity_id = entity_id;
    params.statement = statement;
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
   * With a known entity id, a opening times object can be removed.
   *
   *  @param entity_id - The id of the entity to edit
   *  @return - the data from the api
  */
  var DELETEEntityOpening_times = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/opening_times",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add an order online to an existing entity - to indicate e-commerce capability.
   *
   *  @param entity_id
   *  @param orderonline
   *  @return - the data from the api
  */
  var POSTEntityOrderonline = function (entity_id, orderonline, callback) {

    params = {};
    params.entity_id = entity_id;
    params.orderonline = orderonline;
    
    doCurl("/entity/orderonline",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a payment_type object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var DELETEEntityPayment_type = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/payment_type",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a payment_type object can be added.
   *
   *  @param entity_id - the id of the entity to add the payment type to
   *  @param payment_type - the payment type to add to the entity
   *  @return - the data from the api
  */
  var POSTEntityPayment_type = function (entity_id, payment_type, callback) {

    params = {};
    params.entity_id = entity_id;
    params.payment_type = payment_type;
    
    doCurl("/entity/payment_type",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a new phone object to be added to a specified entity. A new object id will be calculated and returned to you if successful.
   *
   *  @param entity_id
   *  @param number
   *  @param description
   *  @param trackable
   *  @return - the data from the api
  */
  var POSTEntityPhone = function (entity_id, number, description, trackable, callback) {

    params = {};
    params.entity_id = entity_id;
    params.number = number;
    params.description = description;
    params.trackable = trackable;
    
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
  var DELETEEntityPhone = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
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
  var POSTEntityPostal_address = function (entity_id, building_number, address1, address2, address3, district, town, county, province, postcode, address_type, do_not_display, callback) {

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
  var GETEntityProvisionalBy_supplier_id = function (supplier_id, callback) {

    params = {};
    params.supplier_id = supplier_id;
    
    doCurl("/entity/provisional/by_supplier_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * removes a given entities supplier/masheryid/user_id content and makes the entity inactive if the entity is un-usable
   *
   *  @param entity_id - The entity to pull
   *  @param purge_masheryid - The purge masheryid to match
   *  @param purge_supplier_id - The purge supplier id to match
   *  @param purge_user_id - The purge user id to match
   *  @param exclude - List of entity fields that are excluded from the purge
   *  @param destructive
   *  @return - the data from the api
  */
  var POSTEntityPurge = function (entity_id, purge_masheryid, purge_supplier_id, purge_user_id, exclude, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.purge_masheryid = purge_masheryid;
    params.purge_supplier_id = purge_supplier_id;
    params.purge_user_id = purge_user_id;
    params.exclude = exclude;
    params.destructive = destructive;
    
    doCurl("/entity/purge",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * removes a portion of a given entity and makes the entity inactive if the resulting leftover entity is un-usable
   *
   *  @param entity_id - The entity to pull
   *  @param object
   *  @param gen_id - The gen_id of any multi-object being purged
   *  @param purge_masheryid - The purge masheryid to match
   *  @param purge_supplier_id - The purge supplier id to match
   *  @param purge_user_id - The purge user id to match
   *  @param destructive
   *  @return - the data from the api
  */
  var POSTEntityPurgeBy_object = function (entity_id, object, gen_id, purge_masheryid, purge_supplier_id, purge_user_id, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.object = object;
    params.gen_id = gen_id;
    params.purge_masheryid = purge_masheryid;
    params.purge_supplier_id = purge_supplier_id;
    params.purge_user_id = purge_user_id;
    params.destructive = destructive;
    
    doCurl("/entity/purge/by_object",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Deletes a specific review for an entity via Review API
   *
   *  @param entity_id - The entity with the review
   *  @param review_id - The review id
   *  @return - the data from the api
  */
  var DELETEEntityReview = function (entity_id, review_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.review_id = review_id;
    
    doCurl("/entity/review",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Gets a specific review  for an entity
   *
   *  @param entity_id - The entity with the review
   *  @param review_id - The review id
   *  @return - the data from the api
  */
  var GETEntityReview = function (entity_id, review_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.review_id = review_id;
    
    doCurl("/entity/review",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Appends a review to an entity
   *
   *  @param entity_id - the entity to append the review to
   *  @param reviewer_user_id - The user id
   *  @param review_id - The review id. If this is supplied will attempt to update an existing review
   *  @param title - The title of the review
   *  @param content - The full text content of the review
   *  @param star_rating - The rating of the review
   *  @param domain - The domain the review originates from
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTEntityReview = function (entity_id, reviewer_user_id, review_id, title, content, star_rating, domain, filedata, callback) {

    params = {};
    params.entity_id = entity_id;
    params.reviewer_user_id = reviewer_user_id;
    params.review_id = review_id;
    params.title = title;
    params.content = content;
    params.star_rating = star_rating;
    params.domain = domain;
    params.filedata = filedata;
    
    doCurl("/entity/review",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Gets all reviews for an entity
   *
   *  @param entity_id - The entity with the review
   *  @param limit - Limit the number of results returned
   *  @param skip - Number of results skipped
   *  @return - the data from the api
  */
  var GETEntityReviewList = function (entity_id, limit, skip, callback) {

    params = {};
    params.entity_id = entity_id;
    params.limit = limit;
    params.skip = skip;
    
    doCurl("/entity/review/list",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a list of available revisions to be returned by its entity id
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var GETEntityRevisions = function (entity_id, callback) {

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
  var GETEntityRevisionsByRevisionID = function (entity_id, revision_id, callback) {

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
   *  @param orderonline - Favours online ordering where set to true
   *  @param delivers - Favours delivery where set to true
   *  @param isClaimed - 1: claimed; 0: not claimed or claim expired; -1: ignore this filter.
   *  @param per_page
   *  @param page
   *  @param country
   *  @param language
   *  @param domain
   *  @param path
   *  @param restrict_category_ids - Pipe delimited optional IDs to restrict matches to (optional)
   *  @return - the data from the api
  */
  var GETEntitySearchByboundingbox = function (latitude_1, longitude_1, latitude_2, longitude_2, orderonline, delivers, isClaimed, per_page, page, country, language, domain, path, restrict_category_ids, callback) {

    params = {};
    params.latitude_1 = latitude_1;
    params.longitude_1 = longitude_1;
    params.latitude_2 = latitude_2;
    params.longitude_2 = longitude_2;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.isClaimed = isClaimed;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    params.domain = domain;
    params.path = path;
    params.restrict_category_ids = restrict_category_ids;
    
    doCurl("/entity/search/byboundingbox",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param where - Location to search for results. E.g. Dublin e.g. Dublin
   *  @param orderonline - Favours online ordering where set to true
   *  @param delivers - Favours delivery where set to true
   *  @param isClaimed - 1: claimed; 0: not claimed or claim expired; -1: ignore this filter.
   *  @param per_page - How many results per page
   *  @param page - What page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @param latitude - The decimal latitude of the search context (optional)
   *  @param longitude - The decimal longitude of the search context (optional)
   *  @param domain
   *  @param path
   *  @param restrict_category_ids - Pipe delimited optional IDs to restrict matches to (optional)
   *  @param benchmark
   *  @return - the data from the api
  */
  var GETEntitySearchBylocation = function (where, orderonline, delivers, isClaimed, per_page, page, country, language, latitude, longitude, domain, path, restrict_category_ids, benchmark, callback) {

    params = {};
    params.where = where;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.isClaimed = isClaimed;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    params.latitude = latitude;
    params.longitude = longitude;
    params.domain = domain;
    params.path = path;
    params.restrict_category_ids = restrict_category_ids;
    params.benchmark = benchmark;
    
    doCurl("/entity/search/bylocation",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for entities matching the supplied group_id, ordered by nearness
   *
   *  @param group_id - the group_id to search for
   *  @param orderonline - Favours online ordering where set to true
   *  @param delivers - Favours delivery where set to true
   *  @param isClaimed - 1: claimed; 0: not claimed or claim expired; -1: ignore this filter.
   *  @param country - The country to fetch results for e.g. gb
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @param language - An ISO compatible language code, E.g. en
   *  @param latitude - The decimal latitude of the centre point of the search
   *  @param longitude - The decimal longitude of the centre point of the search
   *  @param where - The location to search for
   *  @param domain
   *  @param path
   *  @param unitOfDistance
   *  @param restrict_category_ids - Pipe delimited optional IDs to restrict matches to (optional)
   *  @return - the data from the api
  */
  var GETEntitySearchGroupBynearest = function (group_id, orderonline, delivers, isClaimed, country, per_page, page, language, latitude, longitude, where, domain, path, unitOfDistance, restrict_category_ids, callback) {

    params = {};
    params.group_id = group_id;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.isClaimed = isClaimed;
    params.country = country;
    params.per_page = per_page;
    params.page = page;
    params.language = language;
    params.latitude = latitude;
    params.longitude = longitude;
    params.where = where;
    params.domain = domain;
    params.path = path;
    params.unitOfDistance = unitOfDistance;
    params.restrict_category_ids = restrict_category_ids;
    
    doCurl("/entity/search/group/bynearest",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for entities matching the supplied 'who', ordered by nearness. NOTE if you want to see any advertisers then append MASHERYID (even if using API key) and include_ads=true to get your ads matching that keyword and the derived location.
   *
   *  @param keyword - What to get results for. E.g. cafe e.g. cafe
   *  @param orderonline - Favours online ordering where set to true
   *  @param delivers - Favours delivery where set to true
   *  @param isClaimed - 1: claimed; 0: not claimed or claim expired; -1: ignore this filter.
   *  @param country - The country to fetch results for e.g. gb
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @param language - An ISO compatible language code, E.g. en
   *  @param latitude - The decimal latitude of the centre point of the search
   *  @param longitude - The decimal longitude of the centre point of the search
   *  @param domain
   *  @param path
   *  @param restrict_category_ids - Pipe delimited optional IDs to restrict matches to (optional)
   *  @param include_ads - Find nearby advertisers with tags that match the keyword
   *  @return - the data from the api
  */
  var GETEntitySearchKeywordBynearest = function (keyword, orderonline, delivers, isClaimed, country, per_page, page, language, latitude, longitude, domain, path, restrict_category_ids, include_ads, callback) {

    params = {};
    params.keyword = keyword;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.isClaimed = isClaimed;
    params.country = country;
    params.per_page = per_page;
    params.page = page;
    params.language = language;
    params.latitude = latitude;
    params.longitude = longitude;
    params.domain = domain;
    params.path = path;
    params.restrict_category_ids = restrict_category_ids;
    params.include_ads = include_ads;
    
    doCurl("/entity/search/keyword/bynearest",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param what - What to get results for. E.g. Plumber e.g. plumber
   *  @param orderonline - Favours online ordering where set to true
   *  @param delivers - Favours delivery where set to true
   *  @param isClaimed - 1: claimed; 0: not claimed or claim expired; -1: ignore this filter.
   *  @param per_page - Number of results returned per page
   *  @param page - The page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @param domain
   *  @param path
   *  @param restrict_category_ids - Pipe delimited optional IDs to restrict matches to (optional)
   *  @param benchmark
   *  @return - the data from the api
  */
  var GETEntitySearchWhat = function (what, orderonline, delivers, isClaimed, per_page, page, country, language, domain, path, restrict_category_ids, benchmark, callback) {

    params = {};
    params.what = what;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.isClaimed = isClaimed;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    params.domain = domain;
    params.path = path;
    params.restrict_category_ids = restrict_category_ids;
    params.benchmark = benchmark;
    
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
   *  @param orderonline - Favours online ordering where set to true
   *  @param delivers - Favours delivery where set to true
   *  @param isClaimed - 1: claimed; 0: not claimed or claim expired; -1: ignore this filter.
   *  @param per_page
   *  @param page
   *  @param country - A valid ISO 3166 country code e.g. ie
   *  @param language
   *  @param domain
   *  @param path
   *  @param restrict_category_ids - Pipe delimited optional IDs to restrict matches to (optional)
   *  @return - the data from the api
  */
  var GETEntitySearchWhatByboundingbox = function (what, latitude_1, longitude_1, latitude_2, longitude_2, orderonline, delivers, isClaimed, per_page, page, country, language, domain, path, restrict_category_ids, callback) {

    params = {};
    params.what = what;
    params.latitude_1 = latitude_1;
    params.longitude_1 = longitude_1;
    params.latitude_2 = latitude_2;
    params.longitude_2 = longitude_2;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.isClaimed = isClaimed;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    params.domain = domain;
    params.path = path;
    params.restrict_category_ids = restrict_category_ids;
    
    doCurl("/entity/search/what/byboundingbox",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param what - What to get results for. E.g. Plumber e.g. plumber
   *  @param where - The location to get results for. E.g. Dublin e.g. Dublin
   *  @param orderonline - Favours online ordering where set to true
   *  @param delivers - Favours delivery where set to true
   *  @param isClaimed - 1: claimed; 0: not claimed or claim expired; -1: ignore this filter.
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @param latitude - The decimal latitude of the search context (optional)
   *  @param longitude - The decimal longitude of the search context (optional)
   *  @param domain
   *  @param path
   *  @param restrict_category_ids - Pipe delimited optional IDs to restrict matches to (optional)
   *  @param benchmark
   *  @return - the data from the api
  */
  var GETEntitySearchWhatBylocation = function (what, where, orderonline, delivers, isClaimed, per_page, page, country, language, latitude, longitude, domain, path, restrict_category_ids, benchmark, callback) {

    params = {};
    params.what = what;
    params.where = where;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.isClaimed = isClaimed;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    params.latitude = latitude;
    params.longitude = longitude;
    params.domain = domain;
    params.path = path;
    params.restrict_category_ids = restrict_category_ids;
    params.benchmark = benchmark;
    
    doCurl("/entity/search/what/bylocation",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities, ordered by nearness
   *
   *  @param what - What to get results for. E.g. Plumber e.g. plumber
   *  @param orderonline - Favours online ordering where set to true
   *  @param delivers - Favours delivery where set to true
   *  @param isClaimed - 1: claimed; 0: not claimed or claim expired; -1: ignore this filter.
   *  @param country - The country to fetch results for e.g. gb
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @param language - An ISO compatible language code, E.g. en
   *  @param latitude - The decimal latitude of the centre point of the search
   *  @param longitude - The decimal longitude of the centre point of the search
   *  @param domain
   *  @param path
   *  @param restrict_category_ids - Pipe delimited optional IDs to restrict matches to (optional)
   *  @return - the data from the api
  */
  var GETEntitySearchWhatBynearest = function (what, orderonline, delivers, isClaimed, country, per_page, page, language, latitude, longitude, domain, path, restrict_category_ids, callback) {

    params = {};
    params.what = what;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.isClaimed = isClaimed;
    params.country = country;
    params.per_page = per_page;
    params.page = page;
    params.language = language;
    params.latitude = latitude;
    params.longitude = longitude;
    params.domain = domain;
    params.path = path;
    params.restrict_category_ids = restrict_category_ids;
    
    doCurl("/entity/search/what/bynearest",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param who - Company name e.g. Starbucks
   *  @param orderonline - Favours online ordering where set to true
   *  @param delivers - Favours delivery where set to true
   *  @param isClaimed - 1: claimed; 0: not claimed or claim expired; -1: ignore this filter.
   *  @param per_page - How many results per page
   *  @param page - What page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @param domain
   *  @param path
   *  @param restrict_category_ids - Pipe delimited optional IDs to restrict matches to (optional)
   *  @param benchmark
   *  @return - the data from the api
  */
  var GETEntitySearchWho = function (who, orderonline, delivers, isClaimed, per_page, page, country, language, domain, path, restrict_category_ids, benchmark, callback) {

    params = {};
    params.who = who;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.isClaimed = isClaimed;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    params.domain = domain;
    params.path = path;
    params.restrict_category_ids = restrict_category_ids;
    params.benchmark = benchmark;
    
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
   *  @param orderonline - Favours online ordering where set to true
   *  @param delivers - Favours delivery where set to true
   *  @param isClaimed - 1: claimed; 0: not claimed or claim expired; -1: ignore this filter.
   *  @param per_page
   *  @param page
   *  @param country
   *  @param language - An ISO compatible language code, E.g. en
   *  @param domain
   *  @param path
   *  @param restrict_category_ids - Pipe delimited optional IDs to restrict matches to (optional)
   *  @return - the data from the api
  */
  var GETEntitySearchWhoByboundingbox = function (who, latitude_1, longitude_1, latitude_2, longitude_2, orderonline, delivers, isClaimed, per_page, page, country, language, domain, path, restrict_category_ids, callback) {

    params = {};
    params.who = who;
    params.latitude_1 = latitude_1;
    params.longitude_1 = longitude_1;
    params.latitude_2 = latitude_2;
    params.longitude_2 = longitude_2;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.isClaimed = isClaimed;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    params.domain = domain;
    params.path = path;
    params.restrict_category_ids = restrict_category_ids;
    
    doCurl("/entity/search/who/byboundingbox",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param who - Company Name e.g. Starbucks
   *  @param where - The location to get results for. E.g. Dublin e.g. Dublin
   *  @param orderonline - Favours online ordering where set to true
   *  @param delivers - Favours delivery where set to true
   *  @param isClaimed - 1: claimed; 0: not claimed or claim expired; -1: ignore this filter.
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param latitude - The decimal latitude of the search context (optional)
   *  @param longitude - The decimal longitude of the search context (optional)
   *  @param language - An ISO compatible language code, E.g. en
   *  @param domain
   *  @param path
   *  @param restrict_category_ids - Pipe delimited optional IDs to restrict matches to (optional)
   *  @param benchmark
   *  @return - the data from the api
  */
  var GETEntitySearchWhoBylocation = function (who, where, orderonline, delivers, isClaimed, per_page, page, country, latitude, longitude, language, domain, path, restrict_category_ids, benchmark, callback) {

    params = {};
    params.who = who;
    params.where = where;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.isClaimed = isClaimed;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.latitude = latitude;
    params.longitude = longitude;
    params.language = language;
    params.domain = domain;
    params.path = path;
    params.restrict_category_ids = restrict_category_ids;
    params.benchmark = benchmark;
    
    doCurl("/entity/search/who/bylocation",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for entities matching the supplied 'who', ordered by nearness
   *
   *  @param who - What to get results for. E.g. Plumber e.g. plumber
   *  @param orderonline - Favours online ordering where set to true
   *  @param delivers - Favours delivery where set to true
   *  @param isClaimed - 1: claimed; 0: not claimed or claim expired; -1: ignore this filter.
   *  @param country - The country to fetch results for e.g. gb
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @param language - An ISO compatible language code, E.g. en
   *  @param latitude - The decimal latitude of the centre point of the search
   *  @param longitude - The decimal longitude of the centre point of the search
   *  @param domain
   *  @param path
   *  @param restrict_category_ids - Pipe delimited optional IDs to restrict matches to (optional)
   *  @return - the data from the api
  */
  var GETEntitySearchWhoBynearest = function (who, orderonline, delivers, isClaimed, country, per_page, page, language, latitude, longitude, domain, path, restrict_category_ids, callback) {

    params = {};
    params.who = who;
    params.orderonline = orderonline;
    params.delivers = delivers;
    params.isClaimed = isClaimed;
    params.country = country;
    params.per_page = per_page;
    params.page = page;
    params.language = language;
    params.latitude = latitude;
    params.longitude = longitude;
    params.domain = domain;
    params.path = path;
    params.restrict_category_ids = restrict_category_ids;
    
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
  var POSTEntitySend_email = function (entity_id, gen_id, from_email, subject, content, callback) {

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
   * With a known entity id, a service object can be added.
   *
   *  @param entity_id
   *  @param value
   *  @return - the data from the api
  */
  var POSTEntityService = function (entity_id, value, callback) {

    params = {};
    params.entity_id = entity_id;
    params.value = value;
    
    doCurl("/entity/service",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a service object can be deleted.
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var DELETEEntityService = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/service",params,function(error,body){
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
  var POSTEntitySocialmedia = function (entity_id, type, website_url, callback) {

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
  var DELETEEntitySocialmedia = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/socialmedia",params,function(error,body){
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
  var DELETEEntitySpecial_offer = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/special_offer",params,function(error,body){
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
   *  @return - the data from the api
  */
  var POSTEntitySpecial_offer = function (entity_id, title, description, terms, start_date, expiry_date, url, callback) {

    params = {};
    params.entity_id = entity_id;
    params.title = title;
    params.description = description;
    params.terms = terms;
    params.start_date = start_date;
    params.expiry_date = expiry_date;
    params.url = url;
    
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
  var POSTEntityStatus = function (entity_id, status, inactive_reason, inactive_description, callback) {

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
   * Suspend all entiies added or claimed by a specific user
   *
   *  @param user_id - The unique user ID of the user with claimed entities e.g. 379236608286720
   *  @return - the data from the api
  */
  var POSTEntityStatusSuspend_by_user_id = function (user_id, callback) {

    params = {};
    params.user_id = user_id;
    
    doCurl("/entity/status/suspend_by_user_id",params,function(error,body){
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
  var DELETEEntityTag = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/tag",params,function(error,body){
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
  var POSTEntityTag = function (entity_id, tag, language, callback) {

    params = {};
    params.entity_id = entity_id;
    params.tag = tag;
    params.language = language;
    
    doCurl("/entity/tag",params,function(error,body){
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
  var DELETEEntityTestimonial = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/testimonial",params,function(error,body){
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
  var POSTEntityTestimonial = function (entity_id, title, text, date, testifier_name, callback) {

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
   * Get the updates a uncontribute would perform
   *
   *  @param entity_id - The entity to pull
   *  @param object_name - The entity object to update
   *  @param supplier_id - The supplier_id to remove
   *  @param user_id - The user_id to remove
   *  @return - the data from the api
  */
  var GETEntityUncontribute = function (entity_id, object_name, supplier_id, user_id, callback) {

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
   *  @param unmerge_masheryid
   *  @param unmerge_supplier_id
   *  @param unmerge_user_id
   *  @param destructive
   *  @return - the data from the api
  */
  var POSTEntityUnmerge = function (entity_id, unmerge_masheryid, unmerge_supplier_id, unmerge_user_id, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.unmerge_masheryid = unmerge_masheryid;
    params.unmerge_supplier_id = unmerge_supplier_id;
    params.unmerge_user_id = unmerge_user_id;
    params.destructive = destructive;
    
    doCurl("/entity/unmerge",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find the provided user in all the sub objects and update the trust
   *
   *  @param entity_id - the entity_id to update
   *  @param user_id - the user to search for
   *  @param trust - The new trust for the user
   *  @return - the data from the api
  */
  var POSTEntityUser_trust = function (entity_id, user_id, trust, callback) {

    params = {};
    params.entity_id = entity_id;
    params.user_id = user_id;
    params.trust = trust;
    
    doCurl("/entity/user_trust",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a verified source object to an existing entity.
   *
   *  @param entity_id
   *  @param public_source - Corresponds to entity_obj.attribution.name
   *  @param source_name - Corresponds to entity_obj.data_sources.type
   *  @param source_id - Corresponds to entity_obj.data_sources.external_id
   *  @param source_url - Corresponds to entity_obj.attribution.url
   *  @param source_logo - Corresponds to entity_obj.attribution.logo
   *  @param verified_date - Corresponds to entity_obj.data_sources.created_at
   *  @return - the data from the api
  */
  var POSTEntityVerified = function (entity_id, public_source, source_name, source_id, source_url, source_logo, verified_date, callback) {

    params = {};
    params.entity_id = entity_id;
    params.public_source = public_source;
    params.source_name = source_name;
    params.source_id = source_id;
    params.source_url = source_url;
    params.source_logo = source_logo;
    params.verified_date = verified_date;
    
    doCurl("/entity/verified",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Remove a verified source object to an existing entity.
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var DELETEEntityVerified = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/verified",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a video object can be added.
   *
   *  @param entity_id
   *  @param type
   *  @param link
   *  @return - the data from the api
  */
  var POSTEntityVideo = function (entity_id, type, link, callback) {

    params = {};
    params.entity_id = entity_id;
    params.type = type;
    params.link = link;
    
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
  var DELETEEntityVideo = function (entity_id, gen_id, callback) {

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
  var POSTEntityVideoYoutube = function (entity_id, embed_code, callback) {

    params = {};
    params.entity_id = entity_id;
    params.embed_code = embed_code;
    
    doCurl("/entity/video/youtube",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a website object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @param force
   *  @return - the data from the api
  */
  var DELETEEntityWebsite = function (entity_id, gen_id, force, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    params.force = force;
    
    doCurl("/entity/website",params,function(error,body){
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
  var POSTEntityWebsite = function (entity_id, website_url, display_url, website_description, gen_id, callback) {

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
   * With a known entity id, a yext list can be added
   *
   *  @param entity_id
   *  @param yext_list_id
   *  @param description
   *  @param name
   *  @param type
   *  @return - the data from the api
  */
  var POSTEntityYext_list = function (entity_id, yext_list_id, description, name, type, callback) {

    params = {};
    params.entity_id = entity_id;
    params.yext_list_id = yext_list_id;
    params.description = description;
    params.name = name;
    params.type = type;
    
    doCurl("/entity/yext_list",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a yext list object to be removed
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var DELETEEntityYext_list = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/yext_list",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add an entityserve document
   *
   *  @param entity_id - The ids of the entity/entities to create the entityserve event(s) for
   *  @param country - the ISO code of the country
   *  @param event_type - The event type being recorded
   *  @param domain
   *  @param path
   *  @return - the data from the api
  */
  var PUTEntityserve = function (entity_id, country, event_type, domain, path, callback) {

    params = {};
    params.entity_id = entity_id;
    params.country = country;
    params.event_type = event_type;
    params.domain = domain;
    params.path = path;
    
    doCurl("/entityserve",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a flatpack
   *
   *  @param flatpack_id - this record's unique, auto-generated id - if supplied, then this is an edit, otherwise it's an add
   *  @param status - The status of the flatpack, it is required on creation. Syndication link logic depends on this.
   *  @param nodefaults - create an flatpack that's empty apart from provided values (used for child flatpacks), IMPORTANT: if set, any parameters with default values will be ignored even if overridden. Edit the created flatpack to set those parameters on a nodefaults flatpack.
   *  @param domainName - the domain name to serve this flatpack site on (no leading http:// or anything please)
   *  @param inherits - inherit from domain
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
   *  @param serpAdsBottom - The block of HTML/JS that renders Ads on Serps at the bottom
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
   *  @param linkToRoot - The root domain name to serve this flatpack site on (no leading http:// or anything please)
   *  @param termsLink - A URL for t's and c's specific to this partner
   *  @param serpNumberEmbedAdverts - The number of embed adverts per search
   *  @param serpEmbedTitle - Custom page title for emdedded searches
   *  @param adminLess - the LESS configuration to use to overrides the Bootstrap CSS for the admin on themed domains
   *  @param adminConfNoLocz - operate without recourse to verified location data (locz)
   *  @param adminConfNoSocialLogin - suppress social media login interface
   *  @param adminConfEasyClaim - captcha only for claim
   *  @param adminConfPaymentMode - payment gateway
   *  @param adminConfEnableProducts - show upgrade on claim
   *  @param adminConfSimpleadmin - render a template for the reduced functionality
   *  @return - the data from the api
  */
  var POSTFlatpack = function (flatpack_id, status, nodefaults, domainName, inherits, stub, flatpackName, less, language, country, mapsType, mapKey, searchFormShowOn, searchFormShowKeywordsBox, searchFormShowLocationBox, searchFormKeywordsAutoComplete, searchFormLocationsAutoComplete, searchFormDefaultLocation, searchFormPlaceholderKeywords, searchFormPlaceholderLocation, searchFormKeywordsLabel, searchFormLocationLabel, cannedLinksHeader, homepageTitle, homepageDescription, homepageIntroTitle, homepageIntroText, head, adblock, bodyTop, bodyBottom, header_menu, header_menu_bottom, footer_menu, bdpTitle, bdpDescription, bdpAds, serpTitle, serpDescription, serpNumberResults, serpNumberAdverts, serpAds, serpAdsBottom, serpTitleNoWhat, serpDescriptionNoWhat, cookiePolicyUrl, cookiePolicyNotice, addBusinessButtonText, twitterUrl, facebookUrl, copyright, phoneReveal, loginLinkText, contextLocationId, addBusinessButtonPosition, denyIndexing, contextRadius, activityStream, activityStreamSize, products, linkToRoot, termsLink, serpNumberEmbedAdverts, serpEmbedTitle, adminLess, adminConfNoLocz, adminConfNoSocialLogin, adminConfEasyClaim, adminConfPaymentMode, adminConfEnableProducts, adminConfSimpleadmin, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.status = status;
    params.nodefaults = nodefaults;
    params.domainName = domainName;
    params.inherits = inherits;
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
    params.serpAdsBottom = serpAdsBottom;
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
    params.linkToRoot = linkToRoot;
    params.termsLink = termsLink;
    params.serpNumberEmbedAdverts = serpNumberEmbedAdverts;
    params.serpEmbedTitle = serpEmbedTitle;
    params.adminLess = adminLess;
    params.adminConfNoLocz = adminConfNoLocz;
    params.adminConfNoSocialLogin = adminConfNoSocialLogin;
    params.adminConfEasyClaim = adminConfEasyClaim;
    params.adminConfPaymentMode = adminConfPaymentMode;
    params.adminConfEnableProducts = adminConfEnableProducts;
    params.adminConfSimpleadmin = adminConfSimpleadmin;
    
    doCurl("/flatpack",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a flatpack
   *
   *  @param flatpack_id - the unique id to search for
   *  @return - the data from the api
  */
  var GETFlatpack = function (flatpack_id, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    
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
  var DELETEFlatpack = function (flatpack_id, callback) {

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
  var POSTFlatpackAdminCSS = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/adminCSS",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a HD Admin logo to a flatpack domain
   *
   *  @param flatpack_id - the unique id to search for
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTFlatpackAdminHDLogo = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/adminHDLogo",params,function(error,body){
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
  var POSTFlatpackAdminLargeLogo = function (flatpack_id, filedata, callback) {

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
  var POSTFlatpackAdminSmallLogo = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/adminSmallLogo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Remove a flatpack using a supplied flatpack_id
   *
   *  @param flatpack_id - the unique id to search for
   *  @param adblock
   *  @param serpAds
   *  @param serpAdsBottom
   *  @param bdpAds
   *  @return - the data from the api
  */
  var DELETEFlatpackAds = function (flatpack_id, adblock, serpAds, serpAdsBottom, bdpAds, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.adblock = adblock;
    params.serpAds = serpAds;
    params.serpAdsBottom = serpAdsBottom;
    params.bdpAds = bdpAds;
    
    doCurl("/flatpack/ads",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Generate flatpacks based on the files passed in
   *
   *  @param json - The flatpack JSON to make replacements on
   *  @param filedata - a file that contains the replacements in the JSON
   *  @param slack_user
   *  @return - the data from the api
  */
  var POSTFlatpackBulkJson = function (json, filedata, slack_user, callback) {

    params = {};
    params.json = json;
    params.filedata = filedata;
    params.slack_user = slack_user;
    
    doCurl("/flatpack/bulk/json",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get flatpacks by country and location
   *
   *  @param country
   *  @param latitude
   *  @param longitude
   *  @return - the data from the api
  */
  var GETFlatpackBy_country = function (country, latitude, longitude, callback) {

    params = {};
    params.country = country;
    params.latitude = latitude;
    params.longitude = longitude;
    
    doCurl("/flatpack/by_country",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get flatpacks by country in KML format
   *
   *  @param country
   *  @return - the data from the api
  */
  var GETFlatpackBy_countryKml = function (country, callback) {

    params = {};
    params.country = country;
    
    doCurl("/flatpack/by_country/kml",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a flatpack using a domain name
   *
   *  @param domainName - the domain name to search for
   *  @param matchAlias - Whether to match alias as well
   *  @return - the data from the api
  */
  var GETFlatpackBy_domain_name = function (domainName, matchAlias, callback) {

    params = {};
    params.domainName = domainName;
    params.matchAlias = matchAlias;
    
    doCurl("/flatpack/by_domain_name",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get flatpacks that match the supplied masheryid
   *
   *  @return - the data from the api
  */
  var GETFlatpackBy_masheryid = function (callback) {

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
  var GETFlatpackClone = function (flatpack_id, domainName, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.domainName = domainName;
    
    doCurl("/flatpack/clone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * undefined
   *
   *  @param flatpack_id - the unique id to search for
   *  @param domainName
   *  @return - the data from the api
  */
  var POSTFlatpackDomain_alias = function (flatpack_id, domainName, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.domainName = domainName;
    
    doCurl("/flatpack/domain_alias",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * undefined
   *
   *  @param flatpack_id - the unique id to search for
   *  @param domainName
   *  @return - the data from the api
  */
  var DELETEFlatpackDomain_alias = function (flatpack_id, domainName, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.domainName = domainName;
    
    doCurl("/flatpack/domain_alias",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns a list of domain names in which direct/inherited flatpack country match the specified one and status equals production.
   *
   *  @param country
   *  @return - the data from the api
  */
  var GETFlatpackDomain_nameBy_country = function (country, callback) {

    params = {};
    params.country = country;
    
    doCurl("/flatpack/domain_name/by_country",params,function(error,body){
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
  var POSTFlatpackIcon = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/icon",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a flatpack using a domain name
   *
   *  @param flatpack_id - the id to search for
   *  @return - the data from the api
  */
  var GETFlatpackInherit = function (flatpack_id, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    
    doCurl("/flatpack/inherit",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * returns the LESS theme from a flatpack
   *
   *  @param flatpack_id - the unique id to search for
   *  @return - the data from the api
  */
  var GETFlatpackLess = function (flatpack_id, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    
    doCurl("/flatpack/less",params,function(error,body){
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
  var DELETEFlatpackLink = function (flatpack_id, gen_id, callback) {

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
  var POSTFlatpackLink = function (flatpack_id, keywords, location, linkText, callback) {

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
   * Remove all canned links from an existing flatpack.
   *
   *  @param flatpack_id - the id of the flatpack to remove links from
   *  @return - the data from the api
  */
  var DELETEFlatpackLinkAll = function (flatpack_id, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    
    doCurl("/flatpack/link/all",params,function(error,body){
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
  var POSTFlatpackLogo = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a hd logo to a flatpack domain
   *
   *  @param flatpack_id - the unique id to search for
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTFlatpackLogoHd = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/logo/hd",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Delete a Redirect link from a flatpack
   *
   *  @param flatpack_id - the unique id to search for
   *  @return - the data from the api
  */
  var DELETEFlatpackRedirect = function (flatpack_id, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    
    doCurl("/flatpack/redirect",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a Redirect link to a flatpack
   *
   *  @param flatpack_id - the unique id to search for
   *  @param redirectTo
   *  @return - the data from the api
  */
  var POSTFlatpackRedirect = function (flatpack_id, redirectTo, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.redirectTo = redirectTo;
    
    doCurl("/flatpack/redirect",params,function(error,body){
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
  var POSTFlatpackSitemap = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/sitemap",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Delete a group with a specified group_id
   *
   *  @param group_id
   *  @return - the data from the api
  */
  var DELETEGroup = function (group_id, callback) {

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
   *  @param stamp_user_id
   *  @param stamp_sql
   *  @return - the data from the api
  */
  var POSTGroup = function (group_id, name, description, url, stamp_user_id, stamp_sql, callback) {

    params = {};
    params.group_id = group_id;
    params.name = name;
    params.description = description;
    params.url = url;
    params.stamp_user_id = stamp_user_id;
    params.stamp_sql = stamp_sql;
    
    doCurl("/group",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns group that matches a given group id
   *
   *  @param group_id
   *  @return - the data from the api
  */
  var GETGroup = function (group_id, callback) {

    params = {};
    params.group_id = group_id;
    
    doCurl("/group",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns all groups
   *
   *  @return - the data from the api
  */
  var GETGroupAll = function (callback) {

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
  var POSTGroupBulk_delete = function (group_id, filedata, callback) {

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
  var POSTGroupBulk_ingest = function (group_id, filedata, category_type, callback) {

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
  var POSTGroupBulk_update = function (group_id, data, callback) {

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
  var GETHeartbeatBy_date = function (from_date, to_date, country_id, callback) {

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
  var GETHeartbeatTodayClaims = function (country, claim_type, callback) {

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
  var POSTIngest_file = function (job_id, filedata, callback) {

    params = {};
    params.job_id = job_id;
    params.filedata = filedata;
    
    doCurl("/ingest_file",params,function(error,body){
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
  var POSTIngest_job = function (description, category_type, callback) {

    params = {};
    params.description = description;
    params.category_type = category_type;
    
    doCurl("/ingest_job",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get an ingest job from the collection
   *
   *  @param job_id
   *  @return - the data from the api
  */
  var GETIngest_job = function (job_id, callback) {

    params = {};
    params.job_id = job_id;
    
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
  var GETIngest_logBy_job_id = function (job_id, success, errors, limit, skip, callback) {

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
  var GETIngest_queue = function (flush, callback) {

    params = {};
    params.flush = flush;
    
    doCurl("/ingest_queue",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns entities that do not have claim or advertisers data
   *
   *  @param country_id - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param from_date
   *  @param to_date
   *  @param limit
   *  @param offset
   *  @param reduce - Set true to return the count value only.
   *  @return - the data from the api
  */
  var GETLeadsAdded = function (country_id, from_date, to_date, limit, offset, reduce, callback) {

    params = {};
    params.country_id = country_id;
    params.from_date = from_date;
    params.to_date = to_date;
    params.limit = limit;
    params.offset = offset;
    params.reduce = reduce;
    
    doCurl("/leads/added",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns entities that have advertisers data
   *
   *  @param country_id - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param from_date
   *  @param to_date
   *  @param limit
   *  @param offset
   *  @param reduce - Set true to return the count value only.
   *  @return - the data from the api
  */
  var GETLeadsAdvertisers = function (country_id, from_date, to_date, limit, offset, reduce, callback) {

    params = {};
    params.country_id = country_id;
    params.from_date = from_date;
    params.to_date = to_date;
    params.limit = limit;
    params.offset = offset;
    params.reduce = reduce;
    
    doCurl("/leads/advertisers",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns entities that have claim data
   *
   *  @param country_id - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param from_date
   *  @param to_date
   *  @param limit
   *  @param offset
   *  @param reduce - Set true to return the count value only.
   *  @return - the data from the api
  */
  var GETLeadsClaimed = function (country_id, from_date, to_date, limit, offset, reduce, callback) {

    params = {};
    params.country_id = country_id;
    params.from_date = from_date;
    params.to_date = to_date;
    params.limit = limit;
    params.offset = offset;
    params.reduce = reduce;
    
    doCurl("/leads/claimed",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Read a location with the supplied ID in the locations reference database.
   *
   *  @param location_id
   *  @return - the data from the api
  */
  var GETLocation = function (location_id, callback) {

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
  var POSTLocation = function (location_id, type, country, language, name, formal_name, resolution, population, description, timezone, latitude, longitude, parent_town, parent_county, parent_province, parent_region, parent_neighbourhood, parent_district, postalcode, searchable_id, searchable_ids, callback) {

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
   *  @param num_results
   *  @return - the data from the api
  */
  var GETLocationContext = function (location_id, latitude, longitude, radius, resolution, country, num_results, callback) {

    params = {};
    params.location_id = location_id;
    params.latitude = latitude;
    params.longitude = longitude;
    params.radius = radius;
    params.resolution = resolution;
    params.country = country;
    params.num_results = num_results;
    
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
  var GETLocationMultiple = function (location_ids, callback) {

    params = {};
    params.location_ids = location_ids;
    
    doCurl("/location/multiple",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a unique login_id a login can be retrieved
   *
   *  @param login_id
   *  @return - the data from the api
  */
  var GETLogin = function (login_id, callback) {

    params = {};
    params.login_id = login_id;
    
    doCurl("/login",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create/Update login details
   *
   *  @param login_id
   *  @param email
   *  @param password
   *  @return - the data from the api
  */
  var POSTLogin = function (login_id, email, password, callback) {

    params = {};
    params.login_id = login_id;
    params.email = email;
    params.password = password;
    
    doCurl("/login",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a unique login_id a login can be deleted
   *
   *  @param login_id
   *  @return - the data from the api
  */
  var DELETELogin = function (login_id, callback) {

    params = {};
    params.login_id = login_id;
    
    doCurl("/login",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a unique email address a login can be retrieved
   *
   *  @param email
   *  @return - the data from the api
  */
  var GETLoginBy_email = function (email, callback) {

    params = {};
    params.email = email;
    
    doCurl("/login/by_email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Verify that a supplied email and password match a users saved login details
   *
   *  @param email
   *  @param password
   *  @return - the data from the api
  */
  var GETLoginVerify = function (email, password, callback) {

    params = {};
    params.email = email;
    params.password = password;
    
    doCurl("/login/verify",params,function(error,body){
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
  var GETLogo = function (a, b, c, d, callback) {

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
  var PUTLogo = function (a, callback) {

    params = {};
    params.a = a;
    
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
  var GETLookupCategory = function (string, language, callback) {

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
  var GETLookupLegacyCategory = function (id, type, callback) {

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
  var GETLookupLocation = function (string, language, country, latitude, longitude, callback) {

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
   * Returns a list of mashery IDs domain names in which direct/inherited flatpack country match the specified one and status equals production.
   *
   *  @return - the data from the api
  */
  var GETMasheryidAll = function (callback) {

    params = {};
    
    doCurl("/masheryid/all",params,function(error,body){
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
  var GETMatchByphone = function (phone, country, exclude, callback) {

    params = {};
    params.phone = phone;
    params.country = country;
    params.exclude = exclude;
    
    doCurl("/match/byphone",params,function(error,body){
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
  var GETMatchOftheday = function (primary_entity_id, secondary_entity_id, return_entities, callback) {

    params = {};
    params.primary_entity_id = primary_entity_id;
    params.secondary_entity_id = secondary_entity_id;
    params.return_entities = return_entities;
    
    doCurl("/match/oftheday",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Will create a new Matching Instruction or update an existing one
   *
   *  @param entity_id
   *  @param entity_name
   *  @return - the data from the api
  */
  var POSTMatching_instruction = function (entity_id, entity_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.entity_name = entity_name;
    
    doCurl("/matching_instruction",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Delete Matching instruction
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var DELETEMatching_instruction = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/matching_instruction",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch all available Matching instructions
   *
   *  @param limit
   *  @return - the data from the api
  */
  var GETMatching_instructionAll = function (limit, callback) {

    params = {};
    params.limit = limit;
    
    doCurl("/matching_instruction/all",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create a matching log
   *
   *  @param primary_entity_id
   *  @param secondary_entity_id
   *  @param primary_name
   *  @param secondary_name
   *  @param address_score
   *  @param address_match
   *  @param name_score
   *  @param name_match
   *  @param distance
   *  @param phone_match
   *  @param category_match
   *  @param email_match
   *  @param website_match
   *  @param match
   *  @return - the data from the api
  */
  var PUTMatching_log = function (primary_entity_id, secondary_entity_id, primary_name, secondary_name, address_score, address_match, name_score, name_match, distance, phone_match, category_match, email_match, website_match, match, callback) {

    params = {};
    params.primary_entity_id = primary_entity_id;
    params.secondary_entity_id = secondary_entity_id;
    params.primary_name = primary_name;
    params.secondary_name = secondary_name;
    params.address_score = address_score;
    params.address_match = address_match;
    params.name_score = name_score;
    params.name_match = name_match;
    params.distance = distance;
    params.phone_match = phone_match;
    params.category_match = category_match;
    params.email_match = email_match;
    params.website_match = website_match;
    params.match = match;
    
    doCurl("/matching_log",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known user ID add/create the maxclaims blcok
   *
   *  @param user_id
   *  @param contract_id
   *  @param country
   *  @param number
   *  @param expiry_date
   *  @return - the data from the api
  */
  var POSTMaxclaimsActivate = function (user_id, contract_id, country, number, expiry_date, callback) {

    params = {};
    params.user_id = user_id;
    params.contract_id = contract_id;
    params.country = country;
    params.number = number;
    params.expiry_date = expiry_date;
    
    doCurl("/maxclaims/activate",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetching a message
   *
   *  @param message_id - The message id to pull the message for
   *  @return - the data from the api
  */
  var GETMessage = function (message_id, callback) {

    params = {};
    params.message_id = message_id;
    
    doCurl("/message",params,function(error,body){
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
  var POSTMessage = function (message_id, ses_id, from_user_id, from_email, to_entity_id, to_email, subject, body, bounced, callback) {

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
   * Fetching messages by ses_id
   *
   *  @param ses_id - The amazon id to pull the message for
   *  @return - the data from the api
  */
  var GETMessageBy_ses_id = function (ses_id, callback) {

    params = {};
    params.ses_id = ses_id;
    
    doCurl("/message/by_ses_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a multipack
   *
   *  @param multipack_id - this record's unique, auto-generated id - if supplied, then this is an edit, otherwise it's an add
   *  @param group_id - the id of the group that this site serves
   *  @param domainName - the domain name to serve this multipack site on (no leading http:// or anything please)
   *  @param multipackName - the name of the Flat pack instance
   *  @param less - the LESS configuration to use to overrides the Bootstrap CSS
   *  @param country - the country to use for searches etc
   *  @param menuTop - the JSON that describes a navigation at the top of the page
   *  @param menuBottom - the JSON that describes a navigation below the masthead
   *  @param language - An ISO compatible language code, E.g. en e.g. en
   *  @param menuFooter - the JSON that describes a navigation at the bottom of the page
   *  @param searchNumberResults - the number of search results per page
   *  @param searchTitle - Title of serps page
   *  @param searchDescription - Description of serps page
   *  @param searchTitleNoWhere - Title when no where is specified
   *  @param searchDescriptionNoWhere - Description of serps page when no where is specified
   *  @param searchIntroHeader - Introductory header
   *  @param searchIntroText - Introductory text
   *  @param searchShowAll - display all search results on one page
   *  @param searchUnitOfDistance - the unit of distance to use for search
   *  @param cookiePolicyShow - whether to show cookie policy
   *  @param cookiePolicyUrl - url of cookie policy
   *  @param twitterUrl - url of twitter feed
   *  @param facebookUrl - url of facebook feed
   *  @return - the data from the api
  */
  var POSTMultipack = function (multipack_id, group_id, domainName, multipackName, less, country, menuTop, menuBottom, language, menuFooter, searchNumberResults, searchTitle, searchDescription, searchTitleNoWhere, searchDescriptionNoWhere, searchIntroHeader, searchIntroText, searchShowAll, searchUnitOfDistance, cookiePolicyShow, cookiePolicyUrl, twitterUrl, facebookUrl, callback) {

    params = {};
    params.multipack_id = multipack_id;
    params.group_id = group_id;
    params.domainName = domainName;
    params.multipackName = multipackName;
    params.less = less;
    params.country = country;
    params.menuTop = menuTop;
    params.menuBottom = menuBottom;
    params.language = language;
    params.menuFooter = menuFooter;
    params.searchNumberResults = searchNumberResults;
    params.searchTitle = searchTitle;
    params.searchDescription = searchDescription;
    params.searchTitleNoWhere = searchTitleNoWhere;
    params.searchDescriptionNoWhere = searchDescriptionNoWhere;
    params.searchIntroHeader = searchIntroHeader;
    params.searchIntroText = searchIntroText;
    params.searchShowAll = searchShowAll;
    params.searchUnitOfDistance = searchUnitOfDistance;
    params.cookiePolicyShow = cookiePolicyShow;
    params.cookiePolicyUrl = cookiePolicyUrl;
    params.twitterUrl = twitterUrl;
    params.facebookUrl = facebookUrl;
    
    doCurl("/multipack",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a multipack
   *
   *  @param multipack_id - the unique id to search for
   *  @return - the data from the api
  */
  var GETMultipack = function (multipack_id, callback) {

    params = {};
    params.multipack_id = multipack_id;
    
    doCurl("/multipack",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add an admin theme to a multipack
   *
   *  @param multipack_id - the unique id to search for
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTMultipackAdminCSS = function (multipack_id, filedata, callback) {

    params = {};
    params.multipack_id = multipack_id;
    params.filedata = filedata;
    
    doCurl("/multipack/adminCSS",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a Admin logo to a Multipack domain
   *
   *  @param multipack_id - the unique id to search for
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTMultipackAdminLogo = function (multipack_id, filedata, callback) {

    params = {};
    params.multipack_id = multipack_id;
    params.filedata = filedata;
    
    doCurl("/multipack/adminLogo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a multipack using a domain name
   *
   *  @param domainName - the domain name to search for
   *  @return - the data from the api
  */
  var GETMultipackBy_domain_name = function (domainName, callback) {

    params = {};
    params.domainName = domainName;
    
    doCurl("/multipack/by_domain_name",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * duplicates a given multipack
   *
   *  @param multipack_id - the unique id to search for
   *  @param domainName - the domain name to serve this multipack site on (no leading http:// or anything please)
   *  @param group_id - the group to use for search
   *  @return - the data from the api
  */
  var GETMultipackClone = function (multipack_id, domainName, group_id, callback) {

    params = {};
    params.multipack_id = multipack_id;
    params.domainName = domainName;
    params.group_id = group_id;
    
    doCurl("/multipack/clone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * returns the LESS theme from a multipack
   *
   *  @param multipack_id - the unique id to search for
   *  @return - the data from the api
  */
  var GETMultipackLess = function (multipack_id, callback) {

    params = {};
    params.multipack_id = multipack_id;
    
    doCurl("/multipack/less",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a logo to a multipack domain
   *
   *  @param multipack_id - the unique id to search for
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTMultipackLogo = function (multipack_id, filedata, callback) {

    params = {};
    params.multipack_id = multipack_id;
    params.filedata = filedata;
    
    doCurl("/multipack/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a map pin to a multipack domain
   *
   *  @param multipack_id - the unique id to search for
   *  @param filedata
   *  @param mapPinOffsetX
   *  @param mapPinOffsetY
   *  @return - the data from the api
  */
  var POSTMultipackMap_pin = function (multipack_id, filedata, mapPinOffsetX, mapPinOffsetY, callback) {

    params = {};
    params.multipack_id = multipack_id;
    params.filedata = filedata;
    params.mapPinOffsetX = mapPinOffsetX;
    params.mapPinOffsetY = mapPinOffsetY;
    
    doCurl("/multipack/map_pin",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch an ops_log
   *
   *  @param ops_log_id
   *  @return - the data from the api
  */
  var GETOps_log = function (ops_log_id, callback) {

    params = {};
    params.ops_log_id = ops_log_id;
    
    doCurl("/ops_log",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create an ops_log
   *
   *  @param success
   *  @param type
   *  @param action
   *  @param data
   *  @param slack_channel
   *  @return - the data from the api
  */
  var POSTOps_log = function (success, type, action, data, slack_channel, callback) {

    params = {};
    params.success = success;
    params.type = type;
    params.action = action;
    params.data = data;
    params.slack_channel = slack_channel;
    
    doCurl("/ops_log",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Run PTB for a given ingest job ID.
   *
   *  @param ingest_job_id - The ingest job ID
   *  @param email - When all entity IDs are pushed to the PTB queue, an email containing debug info will be sent.
   *  @return - the data from the api
  */
  var POSTPaintBy_ingest_job_id = function (ingest_job_id, email, callback) {

    params = {};
    params.ingest_job_id = ingest_job_id;
    params.email = email;
    
    doCurl("/paint/by_ingest_job_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id syndication of data back to a partner is enabled
   *
   *  @param entity_id
   *  @param publisher_id
   *  @param expiry_date
   *  @return - the data from the api
  */
  var POSTPartnersyndicateActivate = function (entity_id, publisher_id, expiry_date, callback) {

    params = {};
    params.entity_id = entity_id;
    params.publisher_id = publisher_id;
    params.expiry_date = expiry_date;
    
    doCurl("/partnersyndicate/activate",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Call CK syndication instruction and call cancel endpoint for partner/supplier_id
   *
   *  @param supplierid
   *  @param vendor
   *  @return - the data from the api
  */
  var POSTPartnersyndicateCancel = function (supplierid, vendor, callback) {

    params = {};
    params.supplierid = supplierid;
    params.vendor = vendor;
    
    doCurl("/partnersyndicate/cancel",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * This will call into CK in order to create the entity on the third party system.
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var POSTPartnersyndicateCreate = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/partnersyndicate/create",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * If this call fails CK is nudged for a human intervention for the future (so the call is NOT passive)
   *
   *  @param vendor_cat_id
   *  @param vendor_cat_string
   *  @param vendor
   *  @return - the data from the api
  */
  var GETPartnersyndicateRequestcat = function (vendor_cat_id, vendor_cat_string, vendor, callback) {

    params = {};
    params.vendor_cat_id = vendor_cat_id;
    params.vendor_cat_string = vendor_cat_string;
    params.vendor = vendor;
    
    doCurl("/partnersyndicate/requestcat",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * This will do nothing if the entity does not have a current partnersyndicate block. Syndication is invoked automatically when entities are saved, so this endpoint is designed for checking the status of syndication.
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var POSTPartnersyndicateUpdateToCk = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/partnersyndicate/updateToCk",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * When a plugin is added to the system it must be added to the service
   *
   *  @param id
   *  @param slug
   *  @param owner
   *  @param scope
   *  @param status
   *  @param params
   *  @return - the data from the api
  */
  var POSTPlugin = function (id, slug, owner, scope, status, params, callback) {

    params = {};
    params.id = id;
    params.slug = slug;
    params.owner = owner;
    params.scope = scope;
    params.status = status;
    params.params = params;
    
    doCurl("/plugin",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get plugin data
   *
   *  @param id
   *  @return - the data from the api
  */
  var GETPlugin = function (id, callback) {

    params = {};
    params.id = id;
    
    doCurl("/plugin",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a plugin is enabled
   *
   *  @param entity_id
   *  @param plugin
   *  @param inapp_name
   *  @param expiry_date
   *  @return - the data from the api
  */
  var POSTPluginActivate = function (entity_id, plugin, inapp_name, expiry_date, callback) {

    params = {};
    params.entity_id = entity_id;
    params.plugin = plugin;
    params.inapp_name = inapp_name;
    params.expiry_date = expiry_date;
    
    doCurl("/plugin/activate",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a plugin is cancelled
   *
   *  @param entity_id
   *  @param plugin
   *  @param inapp_name
   *  @param expiry_date
   *  @return - the data from the api
  */
  var POSTPluginCancel = function (entity_id, plugin, inapp_name, expiry_date, callback) {

    params = {};
    params.entity_id = entity_id;
    params.plugin = plugin;
    params.inapp_name = inapp_name;
    params.expiry_date = expiry_date;
    
    doCurl("/plugin/cancel",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Arbitrary big data
   *
   *  @param pluginid
   *  @param name
   *  @param filter1
   *  @param filter2
   *  @param order
   *  @param fields - a json string with up to 20 fields indexed 'field1' thru 'field20'
   *  @return - the data from the api
  */
  var GETPluginDatarow = function (pluginid, name, filter1, filter2, order, fields, callback) {

    params = {};
    params.pluginid = pluginid;
    params.name = name;
    params.filter1 = filter1;
    params.filter2 = filter2;
    params.order = order;
    params.fields = fields;
    
    doCurl("/plugin/datarow",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Arbitrary big data
   *
   *  @param rowdataid
   *  @param pluginid
   *  @param name
   *  @param filter1
   *  @param filter2
   *  @param fields - a json string with up to 20 fields indexed 'field1' thru 'field20'
   *  @return - the data from the api
  */
  var POSTPluginDatarow = function (rowdataid, pluginid, name, filter1, filter2, fields, callback) {

    params = {};
    params.rowdataid = rowdataid;
    params.pluginid = pluginid;
    params.name = name;
    params.filter1 = filter1;
    params.filter2 = filter2;
    params.fields = fields;
    
    doCurl("/plugin/datarow",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a plugin is enabled
   *
   *  @param pluginid
   *  @param userid
   *  @param entity_id
   *  @param storekey
   *  @param storeval
   *  @return - the data from the api
  */
  var POSTPluginVar = function (pluginid, userid, entity_id, storekey, storeval, callback) {

    params = {};
    params.pluginid = pluginid;
    params.userid = userid;
    params.entity_id = entity_id;
    params.storekey = storekey;
    params.storeval = storeval;
    
    doCurl("/plugin/var",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get variables related to a particular entity
   *
   *  @param entityid
   *  @return - the data from the api
  */
  var GETPluginVarsByEntityId = function (entityid, callback) {

    params = {};
    params.entityid = entityid;
    
    doCurl("/plugin/vars/byEntityId",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get info on all plugins
   *
   *  @return - the data from the api
  */
  var GETPlugins = function (callback) {

    params = {};
    
    doCurl("/plugins",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a private object to be removed
   *
   *  @param private_object_id - The id of the private object to remove
   *  @return - the data from the api
  */
  var DELETEPrivate_object = function (private_object_id, callback) {

    params = {};
    params.private_object_id = private_object_id;
    
    doCurl("/private_object",params,function(error,body){
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
  var PUTPrivate_object = function (entity_id, data, callback) {

    params = {};
    params.entity_id = entity_id;
    params.data = data;
    
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
  var GETPrivate_objectAll = function (entity_id, callback) {

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
   *  @param shortname - Desc
   *  @param name - The name of the product
   *  @param strapline - The description of the product
   *  @param alternate_title - The alternate title of the product
   *  @param fpzones - Hints for flatpack display (set a single hint 'void' to have this ignored)
   *  @param paygateid - The product id in the payment gateway (required for Stripe)
   *  @param price - The price of the product
   *  @param tax_rate - The tax markup for this product
   *  @param currency - The currency in which the price is in
   *  @param active - is this an active product
   *  @param billing_period
   *  @param title - Title of the product
   *  @param intro_paragraph - introduction paragraph
   *  @param bullets - pipe separated product features
   *  @param outro_paragraph - closing paragraph
   *  @param product_description_html - Overriding product description html blob
   *  @param thankyou_html - overriding thank you paragraph html
   *  @param thanks_paragraph - thank you paragraph
   *  @param video_url - video url
   *  @return - the data from the api
  */
  var POSTProduct = function (product_id, shortname, name, strapline, alternate_title, fpzones, paygateid, price, tax_rate, currency, active, billing_period, title, intro_paragraph, bullets, outro_paragraph, product_description_html, thankyou_html, thanks_paragraph, video_url, callback) {

    params = {};
    params.product_id = product_id;
    params.shortname = shortname;
    params.name = name;
    params.strapline = strapline;
    params.alternate_title = alternate_title;
    params.fpzones = fpzones;
    params.paygateid = paygateid;
    params.price = price;
    params.tax_rate = tax_rate;
    params.currency = currency;
    params.active = active;
    params.billing_period = billing_period;
    params.title = title;
    params.intro_paragraph = intro_paragraph;
    params.bullets = bullets;
    params.outro_paragraph = outro_paragraph;
    params.product_description_html = product_description_html;
    params.thankyou_html = thankyou_html;
    params.thanks_paragraph = thanks_paragraph;
    params.video_url = video_url;
    
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
  var GETProduct = function (product_id, callback) {

    params = {};
    params.product_id = product_id;
    
    doCurl("/product",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Uploads logo image to product
   *
   *  @param product_id
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTProductImageLogo = function (product_id, filedata, callback) {

    params = {};
    params.product_id = product_id;
    params.filedata = filedata;
    
    doCurl("/product/image/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Delete the logo image within a specific product
   *
   *  @param product_id
   *  @return - the data from the api
  */
  var DELETEProductImageLogo = function (product_id, callback) {

    params = {};
    params.product_id = product_id;
    
    doCurl("/product/image/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Delete the main image within a specific product
   *
   *  @param product_id
   *  @return - the data from the api
  */
  var DELETEProductImageMain = function (product_id, callback) {

    params = {};
    params.product_id = product_id;
    
    doCurl("/product/image/main",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Adds partblahnersyndicate provisioning object to a product
   *
   *  @param product_id
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTProductImageMain = function (product_id, filedata, callback) {

    params = {};
    params.product_id = product_id;
    params.filedata = filedata;
    
    doCurl("/product/image/main",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Delete the small image within a specific product
   *
   *  @param product_id
   *  @return - the data from the api
  */
  var DELETEProductImageSmall = function (product_id, callback) {

    params = {};
    params.product_id = product_id;
    
    doCurl("/product/image/small",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Uploads small image to product
   *
   *  @param product_id
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTProductImageSmall = function (product_id, filedata, callback) {

    params = {};
    params.product_id = product_id;
    params.filedata = filedata;
    
    doCurl("/product/image/small",params,function(error,body){
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
  var DELETEProductProvisioning = function (product_id, gen_id, callback) {

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
  var POSTProductProvisioningAdvert = function (product_id, publisher_id, max_tags, max_locations, callback) {

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
   *  @param package
   *  @return - the data from the api
  */
  var POSTProductProvisioningClaim = function (product_id, package, callback) {

    params = {};
    params.product_id = product_id;
    params.package = package;
    
    doCurl("/product/provisioning/claim",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Adds maxclaims provisioning object to a product
   *
   *  @param product_id
   *  @param country
   *  @param number
   *  @return - the data from the api
  */
  var POSTProductProvisioningMaxclaims = function (product_id, country, number, callback) {

    params = {};
    params.product_id = product_id;
    params.country = country;
    params.number = number;
    
    doCurl("/product/provisioning/maxclaims",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Adds partnersyndicate provisioning object to a product
   *
   *  @param product_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var POSTProductProvisioningPartnersyndicate = function (product_id, publisher_id, callback) {

    params = {};
    params.product_id = product_id;
    params.publisher_id = publisher_id;
    
    doCurl("/product/provisioning/partnersyndicate",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Adds plugin provisioning object to a product
   *
   *  @param product_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var POSTProductProvisioningPlugin = function (product_id, publisher_id, callback) {

    params = {};
    params.product_id = product_id;
    params.publisher_id = publisher_id;
    
    doCurl("/product/provisioning/plugin",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Adds SCheduleSMS provisioning object to a product
   *
   *  @param product_id
   *  @param package
   *  @return - the data from the api
  */
  var POSTProductProvisioningSchedulesms = function (product_id, package, callback) {

    params = {};
    params.product_id = product_id;
    params.package = package;
    
    doCurl("/product/provisioning/schedulesms",params,function(error,body){
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
  var POSTProductProvisioningSyndication = function (product_id, publisher_id, callback) {

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
  var GETPtbAll = function (entity_id, destructive, callback) {

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
  var GETPtbLog = function (year, month, entity_id, callback) {

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
  var GETPtbModule = function (entity_id, module, destructive, callback) {

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
  var GETPtbRunrate = function (country, year, month, day, callback) {

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
  var GETPtbValueadded = function (country, year, month, day, callback) {

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
   * Returns publisher that matches a given publisher id
   *
   *  @param publisher_id
   *  @return - the data from the api
  */
  var GETPublisher = function (publisher_id, callback) {

    params = {};
    params.publisher_id = publisher_id;
    
    doCurl("/publisher",params,function(error,body){
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
   *  @param url_patterns
   *  @param premium_adverts_platinum
   *  @param premium_adverts_gold
   *  @return - the data from the api
  */
  var POSTPublisher = function (publisher_id, country, name, description, active, url_patterns, premium_adverts_platinum, premium_adverts_gold, callback) {

    params = {};
    params.publisher_id = publisher_id;
    params.country = country;
    params.name = name;
    params.description = description;
    params.active = active;
    params.url_patterns = url_patterns;
    params.premium_adverts_platinum = premium_adverts_platinum;
    params.premium_adverts_gold = premium_adverts_gold;
    
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
  var DELETEPublisher = function (publisher_id, callback) {

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
  var GETPublisherByCountry = function (country, callback) {

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
  var GETPublisherByEntityId = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/publisher/byEntityId",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns a publisher that has the specified masheryid
   *
   *  @param publisher_masheryid
   *  @return - the data from the api
  */
  var GETPublisherBy_masheryid = function (publisher_masheryid, callback) {

    params = {};
    params.publisher_masheryid = publisher_masheryid;
    
    doCurl("/publisher/by_masheryid",params,function(error,body){
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
  var GETQueue = function (limit, queue_name, callback) {

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
  var PUTQueue = function (queue_name, data, callback) {

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
  var DELETEQueue = function (queue_id, callback) {

    params = {};
    params.queue_id = queue_id;
    
    doCurl("/queue",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find a queue item by its cloudant id
   *
   *  @param queue_id
   *  @return - the data from the api
  */
  var GETQueueBy_id = function (queue_id, callback) {

    params = {};
    params.queue_id = queue_id;
    
    doCurl("/queue/by_id",params,function(error,body){
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
  var POSTQueueError = function (queue_id, error, callback) {

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
  var GETQueueSearch = function (type, id, callback) {

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
  var POSTQueueUnlock = function (queue_name, seconds, callback) {

    params = {};
    params.queue_name = queue_name;
    params.seconds = seconds;
    
    doCurl("/queue/unlock",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create an SQS queue item
   *
   *  @param queue_name
   *  @param data
   *  @return - the data from the api
  */
  var PUTQueue_sqs = function (queue_name, data, callback) {

    params = {};
    params.queue_name = queue_name;
    params.data = data;
    
    doCurl("/queue_sqs",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the attributes of an SQS queue
   *
   *  @param queue_name
   *  @return - the data from the api
  */
  var GETQueue_sqsAttributes = function (queue_name, callback) {

    params = {};
    params.queue_name = queue_name;
    
    doCurl("/queue_sqs/attributes",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns reseller that matches a given reseller id
   *
   *  @param reseller_id
   *  @return - the data from the api
  */
  var GETReseller = function (reseller_id, callback) {

    params = {};
    params.reseller_id = reseller_id;
    
    doCurl("/reseller",params,function(error,body){
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
   *  @param products
   *  @param master_user_id
   *  @param canViewEmployee
   *  @return - the data from the api
  */
  var POSTReseller = function (reseller_id, country, name, description, active, products, master_user_id, canViewEmployee, callback) {

    params = {};
    params.reseller_id = reseller_id;
    params.country = country;
    params.name = name;
    params.description = description;
    params.active = active;
    params.products = products;
    params.master_user_id = master_user_id;
    params.canViewEmployee = canViewEmployee;
    
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
  var GETSales_log = function (sales_log_id, callback) {

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
  var GETSales_logBy_countryBy_date = function (from_date, country, action_type, callback) {

    params = {};
    params.from_date = from_date;
    params.country = country;
    params.action_type = action_type;
    
    doCurl("/sales_log/by_country/by_date",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Return a sales log by date range, filtered by masheryid if it is given
   *
   *  @param from_date
   *  @param to_date
   *  @param group
   *  @param limit - Applicable only when group=false
   *  @param skip - Applicable only when group=false
   *  @return - the data from the api
  */
  var GETSales_logBy_date = function (from_date, to_date, group, limit, skip, callback) {

    params = {};
    params.from_date = from_date;
    params.to_date = to_date;
    params.group = group;
    params.limit = limit;
    params.skip = skip;
    
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
   *  @param ad_type - The type of advertisements
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
  var POSTSales_logEntity = function (entity_id, country, action_type, ad_type, publisher_id, mashery_id, reseller_ref, reseller_agent_id, max_tags, max_locations, extra_tags, extra_locations, expiry_date, callback) {

    params = {};
    params.entity_id = entity_id;
    params.country = country;
    params.action_type = action_type;
    params.ad_type = ad_type;
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
  var POSTSales_logSyndication = function (action_type, syndication_type, publisher_id, expiry_date, entity_id, group_id, seed_masheryid, supplier_masheryid, country, reseller_masheryid, callback) {

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
   * Converts an Entity into a submission at the Scoot Partner API
   *
   *  @param entity_id - The entity to parse
   *  @param reseller - The reseller Mashery ID, it also determines which Scoot API key to use
   *  @param scoot_id - If specified, the related Scoot listing will be updated.
   *  @param autofill_scoot_id - If scoot_id is not given, look for past successful syndication logs to fill in the Scoot ID
   *  @return - the data from the api
  */
  var POSTScoot_priority = function (entity_id, reseller, scoot_id, autofill_scoot_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.reseller = reseller;
    params.scoot_id = scoot_id;
    params.autofill_scoot_id = autofill_scoot_id;
    
    doCurl("/scoot_priority",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Make a url shorter
   *
   *  @param url - the url to shorten
   *  @param idOnly - Return just the Shortened URL ID
   *  @return - the data from the api
  */
  var PUTShortenurl = function (url, idOnly, callback) {

    params = {};
    params.url = url;
    params.idOnly = idOnly;
    
    doCurl("/shortenurl",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * get the long url from the db
   *
   *  @param id - the id to fetch from the db
   *  @return - the data from the api
  */
  var GETShortenurl = function (id, callback) {

    params = {};
    params.id = id;
    
    doCurl("/shortenurl",params,function(error,body){
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
   *  @param feedback - Some feedback from the person submitting the signal
   *  @return - the data from the api
  */
  var POSTSignal = function (entity_id, country, gen_id, signal_type, data_type, inactive_reason, inactive_description, feedback, callback) {

    params = {};
    params.entity_id = entity_id;
    params.country = country;
    params.gen_id = gen_id;
    params.signal_type = signal_type;
    params.data_type = data_type;
    params.inactive_reason = inactive_reason;
    params.inactive_description = inactive_description;
    params.feedback = feedback;
    
    doCurl("/signal",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a given country and entity id suffix, this endpoint will return a list of entity IDs and their last modified dates for sitemap generation.
   *
   *  @param country - Target country code.
   *  @param id_suffix - Target entity Id suffix (4 digits).
   *  @param skip
   *  @param limit
   *  @return - the data from the api
  */
  var GETSitemapEntity = function (country, id_suffix, skip, limit, callback) {

    params = {};
    params.country = country;
    params.id_suffix = id_suffix;
    params.skip = skip;
    params.limit = limit;
    
    doCurl("/sitemap/entity",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a given country, this endpoint will return a list of entity ID suffixes which have records.
   *
   *  @param country - Target country code.
   *  @return - the data from the api
  */
  var GETSitemapEntitySummary = function (country, callback) {

    params = {};
    params.country = country;
    
    doCurl("/sitemap/entity/summary",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a spider document
   *
   *  @param spider_id
   *  @return - the data from the api
  */
  var GETSpider = function (spider_id, callback) {

    params = {};
    params.spider_id = spider_id;
    
    doCurl("/spider",params,function(error,body){
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
  var GETStatsEntityBy_date = function (entity_id, year, month, callback) {

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
  var GETStatsEntityBy_year = function (entity_id, year, callback) {

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
  var GETStatus = function (callback) {

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
  var GETSyndication = function (syndication_id, callback) {

    params = {};
    params.syndication_id = syndication_id;
    
    doCurl("/syndication",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * get a Syndication by entity_id
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var GETSyndicationBy_entity_id = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/syndication/by_entity_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a Syndication by Reseller (Mashery ID) and optional entity ID
   *
   *  @param reseller_masheryid
   *  @param entity_id
   *  @return - the data from the api
  */
  var GETSyndicationBy_reseller = function (reseller_masheryid, entity_id, callback) {

    params = {};
    params.reseller_masheryid = reseller_masheryid;
    params.entity_id = entity_id;
    
    doCurl("/syndication/by_reseller",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Cancel a syndication
   *
   *  @param syndication_id
   *  @return - the data from the api
  */
  var POSTSyndicationCancel = function (syndication_id, callback) {

    params = {};
    params.syndication_id = syndication_id;
    
    doCurl("/syndication/cancel",params,function(error,body){
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
   *  @param data_filter
   *  @return - the data from the api
  */
  var POSTSyndicationCreate = function (syndication_type, publisher_id, expiry_date, entity_id, group_id, seed_masheryid, supplier_masheryid, country, data_filter, callback) {

    params = {};
    params.syndication_type = syndication_type;
    params.publisher_id = publisher_id;
    params.expiry_date = expiry_date;
    params.entity_id = entity_id;
    params.group_id = group_id;
    params.seed_masheryid = seed_masheryid;
    params.supplier_masheryid = supplier_masheryid;
    params.country = country;
    params.data_filter = data_filter;
    
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
   *  @param expiry_date
   *  @return - the data from the api
  */
  var POSTSyndicationRenew = function (syndication_type, publisher_id, entity_id, group_id, seed_masheryid, supplier_masheryid, country, expiry_date, callback) {

    params = {};
    params.syndication_type = syndication_type;
    params.publisher_id = publisher_id;
    params.entity_id = entity_id;
    params.group_id = group_id;
    params.seed_masheryid = seed_masheryid;
    params.supplier_masheryid = supplier_masheryid;
    params.country = country;
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
   *  @param reseller_id - The optional reseller id used in the syndications
   *  @return - the data from the api
  */
  var POSTSyndication_log = function (entity_id, publisher_id, action, success, message, syndicated_id, reseller_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.publisher_id = publisher_id;
    params.action = action;
    params.success = success;
    params.message = message;
    params.syndicated_id = syndicated_id;
    params.reseller_id = reseller_id;
    
    doCurl("/syndication_log",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get all syndication log entries for a given entity id
   *
   *  @param entity_id
   *  @param page
   *  @param per_page
   *  @return - the data from the api
  */
  var GETSyndication_logBy_entity_id = function (entity_id, page, per_page, callback) {

    params = {};
    params.entity_id = entity_id;
    params.page = page;
    params.per_page = per_page;
    
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
  var GETSyndication_logLast_syndicated_id = function (entity_id, publisher_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.publisher_id = publisher_id;
    
    doCurl("/syndication_log/last_syndicated_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Creates a new Syndication Submission
   *
   *  @param syndication_type
   *  @param entity_id
   *  @param publisher_id
   *  @param submission_id
   *  @return - the data from the api
  */
  var PUTSyndication_submission = function (syndication_type, entity_id, publisher_id, submission_id, callback) {

    params = {};
    params.syndication_type = syndication_type;
    params.entity_id = entity_id;
    params.publisher_id = publisher_id;
    params.submission_id = submission_id;
    
    doCurl("/syndication_submission",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns a Syndication Submission
   *
   *  @param syndication_submission_id
   *  @return - the data from the api
  */
  var GETSyndication_submission = function (syndication_submission_id, callback) {

    params = {};
    params.syndication_submission_id = syndication_submission_id;
    
    doCurl("/syndication_submission",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Set active to false for a Syndication Submission
   *
   *  @param syndication_submission_id
   *  @return - the data from the api
  */
  var POSTSyndication_submissionDeactivate = function (syndication_submission_id, callback) {

    params = {};
    params.syndication_submission_id = syndication_submission_id;
    
    doCurl("/syndication_submission/deactivate",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Set the processed date to now for a Syndication Submission
   *
   *  @param syndication_submission_id
   *  @return - the data from the api
  */
  var POSTSyndication_submissionProcessed = function (syndication_submission_id, callback) {

    params = {};
    params.syndication_submission_id = syndication_submission_id;
    
    doCurl("/syndication_submission/processed",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Provides a tokenised URL to redirect a user so they can add an entity to Central Index
   *
   *  @param language - The language to use to render the add path e.g. en
   *  @param business_name - The name of the business (to be presented as a default) e.g. The Dog and Duck
   *  @param business_phone - The phone number of the business (to be presented as a default) e.g. 20 8480-2777
   *  @param business_postcode - The postcode of the business (to be presented as a default) e.g. EC1 1AA
   *  @param portal_name - The name of the website that data is to be added on e.g. YourLocal
   *  @param supplier_id - The supplier id e.g. 1234xxx889
   *  @param partner - syndication partner (eg 192)
   *  @param country - The country of the entity to be added e.g. gb
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @return - the data from the api
  */
  var GETTokenAdd = function (language, business_name, business_phone, business_postcode, portal_name, supplier_id, partner, country, flatpack_id, callback) {

    params = {};
    params.language = language;
    params.business_name = business_name;
    params.business_phone = business_phone;
    params.business_postcode = business_postcode;
    params.portal_name = portal_name;
    params.supplier_id = supplier_id;
    params.partner = partner;
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
   *  @param supplier_id - Supplier ID to be added (along with masheryid) e.g. 380348266819584
   *  @param language - The language to use to render the claim path e.g. en
   *  @param portal_name - The name of the website that entity is being claimed on e.g. YourLocal
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @param admin_host - The admin host to refer back to - will only be respected if whitelisted in configuration
   *  @return - the data from the api
  */
  var GETTokenClaim = function (entity_id, supplier_id, language, portal_name, flatpack_id, admin_host, callback) {

    params = {};
    params.entity_id = entity_id;
    params.supplier_id = supplier_id;
    params.language = language;
    params.portal_name = portal_name;
    params.flatpack_id = flatpack_id;
    params.admin_host = admin_host;
    
    doCurl("/token/claim",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch token for the contact us method
   *
   *  @param portal_name - The portal name
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @param language - en, es, etc...
   *  @param referring_url - the url where the request came from
   *  @return - the data from the api
  */
  var GETTokenContact_us = function (portal_name, flatpack_id, language, referring_url, callback) {

    params = {};
    params.portal_name = portal_name;
    params.flatpack_id = flatpack_id;
    params.language = language;
    params.referring_url = referring_url;
    
    doCurl("/token/contact_us",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows us to identify the user, entity and element from an encoded endpoint URL's token
   *
   *  @param token
   *  @return - the data from the api
  */
  var GETTokenDecode = function (token, callback) {

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
  var GETTokenEdit = function (entity_id, language, flatpack_id, edit_page, callback) {

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
   * Fetch token for some admin page.
   *
   *  @param portal_name - The name of the application that has initiated the login process, example: 'Your Local'
   *  @param code - Secret string which will be validated by the target page.
   *  @param expireAt - When this token expires in UNIX timestamp. The target page should validate this.
   *  @param language - The language for the app
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @param multipack_id - The id of the multipack site where the request originated
   *  @param data - Optional extra data to be passed to the targeted page.
   *  @return - the data from the api
  */
  var GETTokenEncode = function (portal_name, code, expireAt, language, flatpack_id, multipack_id, data, callback) {

    params = {};
    params.portal_name = portal_name;
    params.code = code;
    params.expireAt = expireAt;
    params.language = language;
    params.flatpack_id = flatpack_id;
    params.multipack_id = multipack_id;
    params.data = data;
    
    doCurl("/token/encode",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch token for login path
   *
   *  @param portal_name - The name of the application that has initiated the login process, example: 'Your Local'
   *  @param language - The language for the app
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @param multipack_id - The id of the multipack site where the request originated
   *  @return - the data from the api
  */
  var GETTokenLogin = function (portal_name, language, flatpack_id, multipack_id, callback) {

    params = {};
    params.portal_name = portal_name;
    params.language = language;
    params.flatpack_id = flatpack_id;
    params.multipack_id = multipack_id;
    
    doCurl("/token/login",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a tokenised url for an password reset
   *
   *  @param login_id - Login id
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @param entity_id
   *  @param action
   *  @return - the data from the api
  */
  var GETTokenLoginReset_password = function (login_id, flatpack_id, entity_id, action, callback) {

    params = {};
    params.login_id = login_id;
    params.flatpack_id = flatpack_id;
    params.entity_id = entity_id;
    params.action = action;
    
    doCurl("/token/login/reset_password",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a tokenised url for an email verification
   *
   *  @param email - Email address
   *  @param first_name - First name of the new user
   *  @param last_name - Last name of the new user
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @param entity_id
   *  @param action
   *  @return - the data from the api
  */
  var GETTokenLoginSet_password = function (email, first_name, last_name, flatpack_id, entity_id, action, callback) {

    params = {};
    params.email = email;
    params.first_name = first_name;
    params.last_name = last_name;
    params.flatpack_id = flatpack_id;
    params.entity_id = entity_id;
    params.action = action;
    
    doCurl("/token/login/set_password",params,function(error,body){
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
  var GETTokenMessage = function (entity_id, portal_name, language, flatpack_id, callback) {

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
   * Fetch token for partnerclaim path
   *
   *  @param language - The language for the app
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @param partner - The partner (eg 192)
   *  @param partnerid - the supplier id from the partner site
   *  @param preclaimed - is this already claimed on the partner site (used for messaging)
   *  @return - the data from the api
  */
  var GETTokenPartnerclaim = function (language, flatpack_id, partner, partnerid, preclaimed, callback) {

    params = {};
    params.language = language;
    params.flatpack_id = flatpack_id;
    params.partner = partner;
    params.partnerid = partnerid;
    params.preclaimed = preclaimed;
    
    doCurl("/token/partnerclaim",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch token for partnerclaim path (ie we start at a CI entity id rather than an external partner id)
   *
   *  @param language - The language for the app
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @param partner - The partner (eg 192)
   *  @param entityid - the CI entity id
   *  @param preclaimed - is this already claimed on the partner site (used for messaging)
   *  @return - the data from the api
  */
  var GETTokenPartnerclaimInternal = function (language, flatpack_id, partner, entityid, preclaimed, callback) {

    params = {};
    params.language = language;
    params.flatpack_id = flatpack_id;
    params.partner = partner;
    params.entityid = entityid;
    params.preclaimed = preclaimed;
    
    doCurl("/token/partnerclaim/internal",params,function(error,body){
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
  var GETTokenProduct = function (entity_id, product_id, language, portal_name, flatpack_id, source, channel, campaign, callback) {

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
   * Fetch token for product path
   *
   *  @param entity_id - The id of the entity to add a product to
   *  @param portal_name - The portal name
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @param language - en, es, etc...
   *  @return - the data from the api
  */
  var GETTokenProduct_selector = function (entity_id, portal_name, flatpack_id, language, callback) {

    params = {};
    params.entity_id = entity_id;
    params.portal_name = portal_name;
    params.flatpack_id = flatpack_id;
    params.language = language;
    
    doCurl("/token/product_selector",params,function(error,body){
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
  var GETTokenReport = function (entity_id, portal_name, language, flatpack_id, callback) {

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
   * Get a tokenised url for the review path
   *
   *  @param portal_name - The portal name
   *  @param entity_id
   *  @param language - en, es, etc...
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @return - the data from the api
  */
  var GETTokenReview = function (portal_name, entity_id, language, flatpack_id, callback) {

    params = {};
    params.portal_name = portal_name;
    params.entity_id = entity_id;
    params.language = language;
    params.flatpack_id = flatpack_id;
    
    doCurl("/token/review",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a tokenised url for the testimonial path
   *
   *  @param portal_name - The portal name
   *  @param flatpack_id - The id of the flatpack site where the request originated
   *  @param language - en, es, etc...
   *  @param entity_id
   *  @param shorten_url
   *  @return - the data from the api
  */
  var GETTokenTestimonial = function (portal_name, flatpack_id, language, entity_id, shorten_url, callback) {

    params = {};
    params.portal_name = portal_name;
    params.flatpack_id = flatpack_id;
    params.language = language;
    params.entity_id = entity_id;
    params.shorten_url = shorten_url;
    
    doCurl("/token/testimonial",params,function(error,body){
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
  var GETToolsAddressdiff = function (first_entity_id, second_entity_id, callback) {

    params = {};
    params.first_entity_id = first_entity_id;
    params.second_entity_id = second_entity_id;
    
    doCurl("/tools/addressdiff",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * An API call to test crashing the server
   *
   *  @return - the data from the api
  */
  var GETToolsCrash = function (callback) {

    params = {};
    
    doCurl("/tools/crash",params,function(error,body){
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
  var POSTToolsCurl = function (method, path, filedata, email, callback) {

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
  var GETToolsDocs = function (object, format, callback) {

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
  var GETToolsFormatAddress = function (address, country, callback) {

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
   *  @param ignoreRegionCheck - If ture, we only check if the phone number is valid, ignoring country context
   *  @return - the data from the api
  */
  var GETToolsFormatPhone = function (number, country, ignoreRegionCheck, callback) {

    params = {};
    params.number = number;
    params.country = country;
    params.ignoreRegionCheck = ignoreRegionCheck;
    
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
  var GETToolsGeocode = function (building_number, address1, address2, address3, district, town, county, province, postcode, country, callback) {

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
   * Given a spreadsheet ID, and a worksheet ID, add a row
   *
   *  @param spreadsheet_key - The key of the spreadsheet to edit
   *  @param worksheet_key - The key of the worksheet to edit - failure to provide this will assume worksheet with the label 'Sheet1'
   *  @param data - A comma separated list to add as cells
   *  @return - the data from the api
  */
  var POSTToolsGooglesheetAdd_row = function (spreadsheet_key, worksheet_key, data, callback) {

    params = {};
    params.spreadsheet_key = spreadsheet_key;
    params.worksheet_key = worksheet_key;
    params.data = data;
    
    doCurl("/tools/googlesheet/add_row",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Given a spreadsheet ID and the name of a worksheet identify the Google ID for the worksheet
   *
   *  @param spreadsheet_key - The key of the spreadsheet
   *  @param worksheet_name - The name/label of the worksheet to identify
   *  @return - the data from the api
  */
  var POSTToolsGooglesheetWorksheet_id = function (spreadsheet_key, worksheet_name, callback) {

    params = {};
    params.spreadsheet_key = spreadsheet_key;
    params.worksheet_name = worksheet_name;
    
    doCurl("/tools/googlesheet/worksheet_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Given some image data we can resize and upload the images
   *
   *  @param filedata - The image data to upload and resize
   *  @param type - The type of image to upload and resize
   *  @param image_dir - Set the destination directory of the generated images on S3. Only available when Image API is enabled.
   *  @return - the data from the api
  */
  var POSTToolsImage = function (filedata, type, image_dir, callback) {

    params = {};
    params.filedata = filedata;
    params.type = type;
    params.image_dir = image_dir;
    
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
  var GETToolsIodocs = function (mode, path, endpoint, doctype, callback) {

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
  var GETToolsLess = function (less, callback) {

    params = {};
    params.less = less;
    
    doCurl("/tools/less",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Parse unstructured address data to fit our structured address objects
   *
   *  @param address
   *  @param postcode
   *  @param country
   *  @param normalise
   *  @return - the data from the api
  */
  var GETToolsParseAddress = function (address, postcode, country, normalise, callback) {

    params = {};
    params.address = address;
    params.postcode = postcode;
    params.country = country;
    params.normalise = normalise;
    
    doCurl("/tools/parse/address",params,function(error,body){
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
   *  @param extension - The pin to verify the phone number with
   *  @return - the data from the api
  */
  var GETToolsPhonecallVerify = function (to, from, pin, twilio_voice, extension, callback) {

    params = {};
    params.to = to;
    params.from = from;
    params.pin = pin;
    params.twilio_voice = twilio_voice;
    params.extension = extension;
    
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
  var GETToolsPhonetic = function (text, callback) {

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
  var GETToolsProcess_phone = function (number, callback) {

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
  var GETToolsProcess_string = function (text, callback) {

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
  var GETToolsReindex = function (callback) {

    params = {};
    
    doCurl("/tools/reindex",params,function(error,body){
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
  var GETToolsSendsms = function (from, to, message, callback) {

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
   *  @param save
   *  @return - the data from the api
  */
  var GETToolsSpider = function (url, pages, country, save, callback) {

    params = {};
    params.url = url;
    params.pages = pages;
    params.country = country;
    params.save = save;
    
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
  var GETToolsStem = function (text, callback) {

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
  var GETToolsStopwords = function (text, callback) {

    params = {};
    params.text = text;
    
    doCurl("/tools/stopwords",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the result of submitted data we sent to InfoGroup
   *
   *  @param syndication_submission_id - The syndication_submission_id to fetch info for
   *  @return - the data from the api
  */
  var GETToolsSubmissionInfogroup = function (syndication_submission_id, callback) {

    params = {};
    params.syndication_submission_id = syndication_submission_id;
    
    doCurl("/tools/submission/infogroup",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to 118 Places CSV format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var GETToolsSyndicate118 = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/118",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to Bing Ads CSV format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var GETToolsSyndicateBingads = function (entity_id, callback) {

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
  var GETToolsSyndicateBingplaces = function (entity_id, callback) {

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
  var GETToolsSyndicateDnb = function (entity_id, callback) {

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
   *  @param data_filter - The level of filtering to apply to the entity
   *  @return - the data from the api
  */
  var GETToolsSyndicateEnablemedia = function (entity_id, reseller_masheryid, destructive, data_filter, callback) {

    params = {};
    params.entity_id = entity_id;
    params.reseller_masheryid = reseller_masheryid;
    params.destructive = destructive;
    params.data_filter = data_filter;
    
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
  var GETToolsSyndicateFactual = function (entity_id, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.destructive = destructive;
    
    doCurl("/tools/syndicate/factual",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to Factual CSV / TSV format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var GETToolsSyndicateFactualcsv = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/factualcsv",params,function(error,body){
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
  var GETToolsSyndicateFoursquare = function (entity_id, destructive, callback) {

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
  var GETToolsSyndicateGoogle = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/google",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to Infobel CSV / TSV format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var GETToolsSyndicateInfobelcsv = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/infobelcsv",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert add it to InfoGroup
   *
   *  @param entity_id - The entity_id to fetch
   *  @param destructive - Add the entity or simulate adding the entity
   *  @return - the data from the api
  */
  var GETToolsSyndicateInfogroup = function (entity_id, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.destructive = destructive;
    
    doCurl("/tools/syndicate/infogroup",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert add it to Judy's Book
   *
   *  @param entity_id - The entity_id to fetch
   *  @param destructive - Add the entity or simulate adding the entity
   *  @return - the data from the api
  */
  var GETToolsSyndicateJudysbook = function (entity_id, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.destructive = destructive;
    
    doCurl("/tools/syndicate/judysbook",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to Google KML format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var GETToolsSyndicateKml = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/kml",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Syndicate database to localdatabase.com
   *
   *  @param entity_id - The entity_id to fetch
   *  @param destructive - Add the entity or simulate adding the entity
   *  @return - the data from the api
  */
  var GETToolsSyndicateLocaldatabase = function (entity_id, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.destructive = destructive;
    
    doCurl("/tools/syndicate/localdatabase",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to Nokia NBS CSV format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var GETToolsSyndicateNokia = function (entity_id, callback) {

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
  var GETToolsSyndicateOsm = function (entity_id, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.destructive = destructive;
    
    doCurl("/tools/syndicate/osm",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Syndicate an entity to ThomsonLocal
   *
   *  @param entity_id - The entity_id to fetch
   *  @param destructive - Add the entity or simulate adding the entity
   *  @return - the data from the api
  */
  var GETToolsSyndicateThomsonlocal = function (entity_id, destructive, callback) {

    params = {};
    params.entity_id = entity_id;
    params.destructive = destructive;
    
    doCurl("/tools/syndicate/thomsonlocal",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to TomTom XML format
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var GETToolsSyndicateTomtom = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/tomtom",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the entity and convert it to YALWA csv
   *
   *  @param entity_id - The entity_id to fetch
   *  @return - the data from the api
  */
  var GETToolsSyndicateYalwa = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/tools/syndicate/yalwa",params,function(error,body){
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
  var GETToolsSyndicateYasabe = function (entity_id, destructive, callback) {

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
  var GETToolsTestmatch = function (name, building_number, branch_name, address1, address2, address3, district, town, county, province, postcode, country, latitude, longitude, timezone, telephone_number, additional_telephone_number, email, website, category_id, category_type, do_not_display, referrer_url, referrer_name, callback) {

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
   * Send a transactional email via Adestra or other email provider
   *
   *  @param email_id - The ID of the email to send
   *  @param destination_email - The email address to send to
   *  @param email_supplier - The email supplier
   *  @return - the data from the api
  */
  var GETToolsTransactional_email = function (email_id, destination_email, email_supplier, callback) {

    params = {};
    params.email_id = email_id;
    params.destination_email = destination_email;
    params.email_supplier = email_supplier;
    
    doCurl("/tools/transactional_email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Upload a file to our asset server and return the url
   *
   *  @param filedata
   *  @return - the data from the api
  */
  var POSTToolsUpload = function (filedata, callback) {

    params = {};
    params.filedata = filedata;
    
    doCurl("/tools/upload",params,function(error,body){
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
  var GETToolsUrl_details = function (url, max_redirects, callback) {

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
  var GETToolsValidate_email = function (email_address, callback) {

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
  var GETToolsValidate_phone = function (phone_number, country, callback) {

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
  var DELETETraction = function (traction_id, callback) {

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
  var GETTraction = function (traction_id, callback) {

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
  var POSTTraction = function (traction_id, trigger_type, action_type, country, email_addresses, title, body, api_method, api_url, api_params, active, reseller_masheryid, publisher_masheryid, description, callback) {

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
  var GETTractionActive = function (callback) {

    params = {};
    
    doCurl("/traction/active",params,function(error,body){
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
  var PUTTransaction = function (entity_id, user_id, basket_total, basket, currency, notes, callback) {

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
   * Given a transaction_id retrieve information on it
   *
   *  @param transaction_id
   *  @return - the data from the api
  */
  var GETTransaction = function (transaction_id, callback) {

    params = {};
    params.transaction_id = transaction_id;
    
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
  var POSTTransactionAuthorised = function (transaction_id, paypal_getexpresscheckoutdetails, callback) {

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
  var GETTransactionBy_paypal_transaction_id = function (paypal_transaction_id, callback) {

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
  var POSTTransactionCancelled = function (transaction_id, callback) {

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
  var POSTTransactionComplete = function (transaction_id, paypal_doexpresscheckoutpayment, user_id, entity_id, callback) {

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
  var POSTTransactionInprogress = function (transaction_id, paypal_setexpresscheckout, callback) {

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
   *  @param last_flatpack - Last visited flatpack (used for admin deep linking)
   *  @param trust
   *  @param creation_date
   *  @param user_type
   *  @param social_network
   *  @param social_network_id
   *  @param reseller_admin_masheryid
   *  @param group_id
   *  @param admin_upgrader
   *  @param opt_in_marketing
   *  @return - the data from the api
  */
  var POSTUser = function (email, user_id, first_name, last_name, active, last_flatpack, trust, creation_date, user_type, social_network, social_network_id, reseller_admin_masheryid, group_id, admin_upgrader, opt_in_marketing, callback) {

    params = {};
    params.email = email;
    params.user_id = user_id;
    params.first_name = first_name;
    params.last_name = last_name;
    params.active = active;
    params.last_flatpack = last_flatpack;
    params.trust = trust;
    params.creation_date = creation_date;
    params.user_type = user_type;
    params.social_network = social_network;
    params.social_network_id = social_network_id;
    params.reseller_admin_masheryid = reseller_admin_masheryid;
    params.group_id = group_id;
    params.admin_upgrader = admin_upgrader;
    params.opt_in_marketing = opt_in_marketing;
    
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
  var GETUser = function (user_id, callback) {

    params = {};
    params.user_id = user_id;
    
    doCurl("/user",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Is this user allowed to edit this entity
   *
   *  @param entity_id
   *  @param user_id
   *  @return - the data from the api
  */
  var GETUserAllowed_to_edit = function (entity_id, user_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.user_id = user_id;
    
    doCurl("/user/allowed_to_edit",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a unique email address an user can be retrieved
   *
   *  @param email
   *  @return - the data from the api
  */
  var GETUserBy_email = function (email, callback) {

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
  var GETUserBy_groupid = function (group_id, callback) {

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
  var GETUserBy_reseller_admin_masheryid = function (reseller_admin_masheryid, callback) {

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
  var GETUserBy_social_media = function (name, id, callback) {

    params = {};
    params.name = name;
    params.id = id;
    
    doCurl("/user/by_social_media",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Downgrade an existing user
   *
   *  @param user_id
   *  @param user_type
   *  @return - the data from the api
  */
  var POSTUserDowngrade = function (user_id, user_type, callback) {

    params = {};
    params.user_id = user_id;
    params.user_type = user_type;
    
    doCurl("/user/downgrade",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Removes group_admin privileges from a specified user
   *
   *  @param user_id
   *  @return - the data from the api
  */
  var POSTUserGroup_admin_remove = function (user_id, callback) {

    params = {};
    params.user_id = user_id;
    
    doCurl("/user/group_admin_remove",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Log user activities into MariaDB
   *
   *  @param user_id
   *  @param action_type
   *  @param domain
   *  @param time
   *  @return - the data from the api
  */
  var POSTUserLog_activity = function (user_id, action_type, domain, time, callback) {

    params = {};
    params.user_id = user_id;
    params.action_type = action_type;
    params.domain = domain;
    params.time = time;
    
    doCurl("/user/log_activity",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * List user activity times within given date range (between inclusive from and exclusive to)
   *
   *  @param user_id
   *  @param action_type
   *  @param from
   *  @param to
   *  @return - the data from the api
  */
  var GETUserLog_activityList_time = function (user_id, action_type, from, to, callback) {

    params = {};
    params.user_id = user_id;
    params.action_type = action_type;
    params.from = from;
    params.to = to;
    
    doCurl("/user/log_activity/list_time",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Retrieve list of entities that the user manages
   *
   *  @param user_id
   *  @return - the data from the api
  */
  var GETUserManaged_entities = function (user_id, callback) {

    params = {};
    params.user_id = user_id;
    
    doCurl("/user/managed_entities",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Removes reseller privileges from a specified user
   *
   *  @param user_id
   *  @return - the data from the api
  */
  var POSTUserReseller_remove = function (user_id, callback) {

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
  var DELETEUserSocial_network = function (user_id, social_network, callback) {

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
  var GETViewhelper = function (database, designdoc, view, doc, callback) {

    params = {};
    params.database = database;
    params.designdoc = designdoc;
    params.view = view;
    params.doc = doc;
    
    doCurl("/viewhelper",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Converts an Entity into webcard JSON and then doing a PUT /webcard/json
   *
   *  @param entity_id - The entity to create on webcard
   *  @return - the data from the api
  */
  var POSTWebcard = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/webcard",params,function(error,body){
      callback(error,body);
    })
  }


  module.exports = {
    setApiKey: setApiKey,
    GET192Get: GET192Get,
    GETActivity_stream: GETActivity_stream,
    POSTActivity_stream: POSTActivity_stream,
    GETAdvertiserBy_reseller_masheryid: GETAdvertiserBy_reseller_masheryid,
    GETAdvertiserUpdated: GETAdvertiserUpdated,
    GETAdvertiserUpdatedBy_publisher: GETAdvertiserUpdatedBy_publisher,
    GETAdvertisersPremiumInventorycheck: GETAdvertisersPremiumInventorycheck,
    DELETEAssociation: DELETEAssociation,
    GETAssociation: GETAssociation,
    POSTAssociation: POSTAssociation,
    GETAutocompleteCategory: GETAutocompleteCategory,
    GETAutocompleteCategoryId: GETAutocompleteCategoryId,
    GETAutocompleteKeyword: GETAutocompleteKeyword,
    GETAutocompleteLocation: GETAutocompleteLocation,
    GETAutocompleteLocationBy_resolution: GETAutocompleteLocationBy_resolution,
    PUTBusiness: PUTBusiness,
    PUTBusinessJson: PUTBusinessJson,
    POSTBusinessJsonProcess: POSTBusinessJsonProcess,
    DELETEBusiness_tool: DELETEBusiness_tool,
    GETBusiness_tool: GETBusiness_tool,
    POSTBusiness_tool: POSTBusiness_tool,
    GETBusiness_toolBy_masheryid: GETBusiness_toolBy_masheryid,
    POSTBusiness_toolCta: POSTBusiness_toolCta,
    POSTBusiness_toolImage: POSTBusiness_toolImage,
    POSTBusiness_toolImageBy_url: POSTBusiness_toolImageBy_url,
    GETCache: GETCache,
    POSTCache: POSTCache,
    GETCategory: GETCategory,
    PUTCategory: PUTCategory,
    GETCategoryAll: GETCategoryAll,
    POSTCategoryMappings: POSTCategoryMappings,
    DELETECategoryMappings: DELETECategoryMappings,
    POSTCategoryMerge: POSTCategoryMerge,
    POSTCategorySynonym: POSTCategorySynonym,
    DELETECategorySynonym: DELETECategorySynonym,
    GETContract: GETContract,
    GETContractBy_entity_id: GETContractBy_entity_id,
    GETContractBy_payment_provider_id: GETContractBy_payment_provider_id,
    GETContractBy_user_id: GETContractBy_user_id,
    POSTContractCancel: POSTContractCancel,
    POSTContractCreate: POSTContractCreate,
    POSTContractFreeactivate: POSTContractFreeactivate,
    POSTContractPaymentFailure: POSTContractPaymentFailure,
    POSTContractPaymentSetup: POSTContractPaymentSetup,
    POSTContractPaymentSuccess: POSTContractPaymentSuccess,
    POSTContractProvision: POSTContractProvision,
    POSTContractSubscriptionended: POSTContractSubscriptionended,
    GETContract_log: GETContract_log,
    POSTContract_log: POSTContract_log,
    GETContract_logBy_contract_id: GETContract_logBy_contract_id,
    GETContract_logBy_payment_provider: GETContract_logBy_payment_provider,
    POSTCountry: POSTCountry,
    GETCountry: GETCountry,
    GETCrash_report: GETCrash_report,
    POSTEmail: POSTEmail,
    PUTEntity: PUTEntity,
    GETEntity: GETEntity,
    POSTEntityAdd: POSTEntityAdd,
    DELETEEntityAdvertiser: DELETEEntityAdvertiser,
    POSTEntityAdvertiserCancel: POSTEntityAdvertiserCancel,
    POSTEntityAdvertiserCreate: POSTEntityAdvertiserCreate,
    POSTEntityAdvertiserLocation: POSTEntityAdvertiserLocation,
    POSTEntityAdvertiserPremiumCancel: POSTEntityAdvertiserPremiumCancel,
    POSTEntityAdvertiserPremiumCreate: POSTEntityAdvertiserPremiumCreate,
    POSTEntityAdvertiserPremiumRenew: POSTEntityAdvertiserPremiumRenew,
    POSTEntityAdvertiserRenew: POSTEntityAdvertiserRenew,
    POSTEntityAdvertiserTag: POSTEntityAdvertiserTag,
    POSTEntityAdvertiserUpsell: POSTEntityAdvertiserUpsell,
    GETEntityAdvertisers: GETEntityAdvertisers,
    GETEntityAdvertisersBy_location: GETEntityAdvertisersBy_location,
    GETEntityAdvertisersInventorycheck: GETEntityAdvertisersInventorycheck,
    GETEntityAdvertisersPremium: GETEntityAdvertisersPremium,
    DELETEEntityAffiliate_adblock: DELETEEntityAffiliate_adblock,
    POSTEntityAffiliate_adblock: POSTEntityAffiliate_adblock,
    POSTEntityAffiliate_link: POSTEntityAffiliate_link,
    DELETEEntityAffiliate_link: DELETEEntityAffiliate_link,
    POSTEntityAnnouncement: POSTEntityAnnouncement,
    GETEntityAnnouncement: GETEntityAnnouncement,
    DELETEEntityAnnouncement: DELETEEntityAnnouncement,
    POSTEntityAssociation_membership: POSTEntityAssociation_membership,
    DELETEEntityAssociation_membership: DELETEEntityAssociation_membership,
    POSTEntityBackground: POSTEntityBackground,
    POSTEntityBrand: POSTEntityBrand,
    DELETEEntityBrand: DELETEEntityBrand,
    POSTEntityBulkCsv: POSTEntityBulkCsv,
    GETEntityBulkCsvStatus: GETEntityBulkCsvStatus,
    POSTEntityBulkJson: POSTEntityBulkJson,
    GETEntityBulkJsonStatus: GETEntityBulkJsonStatus,
    GETEntityBy_external_id: GETEntityBy_external_id,
    GETEntityBy_groupid: GETEntityBy_groupid,
    GETEntityBy_legacy_url: GETEntityBy_legacy_url,
    DELETEEntityBy_supplier: DELETEEntityBy_supplier,
    GETEntityBy_supplier_id: GETEntityBy_supplier_id,
    GETEntityBy_user_id: GETEntityBy_user_id,
    POSTEntityCategory: POSTEntityCategory,
    DELETEEntityCategory: DELETEEntityCategory,
    GETEntityChangelog: GETEntityChangelog,
    DELETEEntityClaim: DELETEEntityClaim,
    POSTEntityClaim: POSTEntityClaim,
    POSTEntityClaimCancel: POSTEntityClaimCancel,
    POSTEntityClaimRenew: POSTEntityClaimRenew,
    POSTEntityClaimReseller: POSTEntityClaimReseller,
    POSTEntityClaimVerfied_status: POSTEntityClaimVerfied_status,
    POSTEntityDelivers: POSTEntityDelivers,
    DELETEEntityDescription: DELETEEntityDescription,
    POSTEntityDescription: POSTEntityDescription,
    POSTEntityDocument: POSTEntityDocument,
    DELETEEntityDocument: DELETEEntityDocument,
    POSTEntityDocumentBy_url: POSTEntityDocumentBy_url,
    DELETEEntityEmail: DELETEEntityEmail,
    POSTEntityEmail: POSTEntityEmail,
    GETEntityEmergencystatement: GETEntityEmergencystatement,
    POSTEntityEmergencystatement: POSTEntityEmergencystatement,
    DELETEEntityEmergencystatement: DELETEEntityEmergencystatement,
    GETEntityEmergencystatements: GETEntityEmergencystatements,
    POSTEntityEmployee: POSTEntityEmployee,
    DELETEEntityEmployee: DELETEEntityEmployee,
    POSTEntityFaq: POSTEntityFaq,
    DELETEEntityFaq: DELETEEntityFaq,
    DELETEEntityFax: DELETEEntityFax,
    POSTEntityFax: POSTEntityFax,
    POSTEntityFeatured_message: POSTEntityFeatured_message,
    DELETEEntityFeatured_message: DELETEEntityFeatured_message,
    POSTEntityGeopoint: POSTEntityGeopoint,
    POSTEntityGroup: POSTEntityGroup,
    DELETEEntityGroup: DELETEEntityGroup,
    POSTEntityImage: POSTEntityImage,
    DELETEEntityImage: DELETEEntityImage,
    POSTEntityImageBy_url: POSTEntityImageBy_url,
    POSTEntityInvoice_address: POSTEntityInvoice_address,
    DELETEEntityInvoice_address: DELETEEntityInvoice_address,
    DELETEEntityLanguage: DELETEEntityLanguage,
    POSTEntityLanguage: POSTEntityLanguage,
    DELETEEntityList: DELETEEntityList,
    POSTEntityList: POSTEntityList,
    GETEntityList_by_group_id: GETEntityList_by_group_id,
    POSTEntityLoc_tag: POSTEntityLoc_tag,
    DELETEEntityLogo: DELETEEntityLogo,
    POSTEntityLogo: POSTEntityLogo,
    POSTEntityLogoBy_url: POSTEntityLogoBy_url,
    POSTEntityMerge: POSTEntityMerge,
    POSTEntityMigrate_category: POSTEntityMigrate_category,
    POSTEntityName: POSTEntityName,
    POSTEntityOpening_times: POSTEntityOpening_times,
    DELETEEntityOpening_times: DELETEEntityOpening_times,
    POSTEntityOrderonline: POSTEntityOrderonline,
    DELETEEntityPayment_type: DELETEEntityPayment_type,
    POSTEntityPayment_type: POSTEntityPayment_type,
    POSTEntityPhone: POSTEntityPhone,
    DELETEEntityPhone: DELETEEntityPhone,
    POSTEntityPostal_address: POSTEntityPostal_address,
    GETEntityProvisionalBy_supplier_id: GETEntityProvisionalBy_supplier_id,
    POSTEntityPurge: POSTEntityPurge,
    POSTEntityPurgeBy_object: POSTEntityPurgeBy_object,
    DELETEEntityReview: DELETEEntityReview,
    GETEntityReview: GETEntityReview,
    POSTEntityReview: POSTEntityReview,
    GETEntityReviewList: GETEntityReviewList,
    GETEntityRevisions: GETEntityRevisions,
    GETEntityRevisionsByRevisionID: GETEntityRevisionsByRevisionID,
    GETEntitySearchByboundingbox: GETEntitySearchByboundingbox,
    GETEntitySearchBylocation: GETEntitySearchBylocation,
    GETEntitySearchGroupBynearest: GETEntitySearchGroupBynearest,
    GETEntitySearchKeywordBynearest: GETEntitySearchKeywordBynearest,
    GETEntitySearchWhat: GETEntitySearchWhat,
    GETEntitySearchWhatByboundingbox: GETEntitySearchWhatByboundingbox,
    GETEntitySearchWhatBylocation: GETEntitySearchWhatBylocation,
    GETEntitySearchWhatBynearest: GETEntitySearchWhatBynearest,
    GETEntitySearchWho: GETEntitySearchWho,
    GETEntitySearchWhoByboundingbox: GETEntitySearchWhoByboundingbox,
    GETEntitySearchWhoBylocation: GETEntitySearchWhoBylocation,
    GETEntitySearchWhoBynearest: GETEntitySearchWhoBynearest,
    POSTEntitySend_email: POSTEntitySend_email,
    POSTEntityService: POSTEntityService,
    DELETEEntityService: DELETEEntityService,
    POSTEntitySocialmedia: POSTEntitySocialmedia,
    DELETEEntitySocialmedia: DELETEEntitySocialmedia,
    DELETEEntitySpecial_offer: DELETEEntitySpecial_offer,
    POSTEntitySpecial_offer: POSTEntitySpecial_offer,
    POSTEntityStatus: POSTEntityStatus,
    POSTEntityStatusSuspend_by_user_id: POSTEntityStatusSuspend_by_user_id,
    DELETEEntityTag: DELETEEntityTag,
    POSTEntityTag: POSTEntityTag,
    DELETEEntityTestimonial: DELETEEntityTestimonial,
    POSTEntityTestimonial: POSTEntityTestimonial,
    GETEntityUncontribute: GETEntityUncontribute,
    POSTEntityUnmerge: POSTEntityUnmerge,
    POSTEntityUser_trust: POSTEntityUser_trust,
    POSTEntityVerified: POSTEntityVerified,
    DELETEEntityVerified: DELETEEntityVerified,
    POSTEntityVideo: POSTEntityVideo,
    DELETEEntityVideo: DELETEEntityVideo,
    POSTEntityVideoYoutube: POSTEntityVideoYoutube,
    DELETEEntityWebsite: DELETEEntityWebsite,
    POSTEntityWebsite: POSTEntityWebsite,
    POSTEntityYext_list: POSTEntityYext_list,
    DELETEEntityYext_list: DELETEEntityYext_list,
    PUTEntityserve: PUTEntityserve,
    POSTFlatpack: POSTFlatpack,
    GETFlatpack: GETFlatpack,
    DELETEFlatpack: DELETEFlatpack,
    POSTFlatpackAdminCSS: POSTFlatpackAdminCSS,
    POSTFlatpackAdminHDLogo: POSTFlatpackAdminHDLogo,
    POSTFlatpackAdminLargeLogo: POSTFlatpackAdminLargeLogo,
    POSTFlatpackAdminSmallLogo: POSTFlatpackAdminSmallLogo,
    DELETEFlatpackAds: DELETEFlatpackAds,
    POSTFlatpackBulkJson: POSTFlatpackBulkJson,
    GETFlatpackBy_country: GETFlatpackBy_country,
    GETFlatpackBy_countryKml: GETFlatpackBy_countryKml,
    GETFlatpackBy_domain_name: GETFlatpackBy_domain_name,
    GETFlatpackBy_masheryid: GETFlatpackBy_masheryid,
    GETFlatpackClone: GETFlatpackClone,
    POSTFlatpackDomain_alias: POSTFlatpackDomain_alias,
    DELETEFlatpackDomain_alias: DELETEFlatpackDomain_alias,
    GETFlatpackDomain_nameBy_country: GETFlatpackDomain_nameBy_country,
    POSTFlatpackIcon: POSTFlatpackIcon,
    GETFlatpackInherit: GETFlatpackInherit,
    GETFlatpackLess: GETFlatpackLess,
    DELETEFlatpackLink: DELETEFlatpackLink,
    POSTFlatpackLink: POSTFlatpackLink,
    DELETEFlatpackLinkAll: DELETEFlatpackLinkAll,
    POSTFlatpackLogo: POSTFlatpackLogo,
    POSTFlatpackLogoHd: POSTFlatpackLogoHd,
    DELETEFlatpackRedirect: DELETEFlatpackRedirect,
    POSTFlatpackRedirect: POSTFlatpackRedirect,
    POSTFlatpackSitemap: POSTFlatpackSitemap,
    DELETEGroup: DELETEGroup,
    POSTGroup: POSTGroup,
    GETGroup: GETGroup,
    GETGroupAll: GETGroupAll,
    POSTGroupBulk_delete: POSTGroupBulk_delete,
    POSTGroupBulk_ingest: POSTGroupBulk_ingest,
    POSTGroupBulk_update: POSTGroupBulk_update,
    GETHeartbeatBy_date: GETHeartbeatBy_date,
    GETHeartbeatTodayClaims: GETHeartbeatTodayClaims,
    POSTIngest_file: POSTIngest_file,
    POSTIngest_job: POSTIngest_job,
    GETIngest_job: GETIngest_job,
    GETIngest_logBy_job_id: GETIngest_logBy_job_id,
    GETIngest_queue: GETIngest_queue,
    GETLeadsAdded: GETLeadsAdded,
    GETLeadsAdvertisers: GETLeadsAdvertisers,
    GETLeadsClaimed: GETLeadsClaimed,
    GETLocation: GETLocation,
    POSTLocation: POSTLocation,
    GETLocationContext: GETLocationContext,
    GETLocationMultiple: GETLocationMultiple,
    GETLogin: GETLogin,
    POSTLogin: POSTLogin,
    DELETELogin: DELETELogin,
    GETLoginBy_email: GETLoginBy_email,
    GETLoginVerify: GETLoginVerify,
    GETLogo: GETLogo,
    PUTLogo: PUTLogo,
    GETLookupCategory: GETLookupCategory,
    GETLookupLegacyCategory: GETLookupLegacyCategory,
    GETLookupLocation: GETLookupLocation,
    GETMasheryidAll: GETMasheryidAll,
    GETMatchByphone: GETMatchByphone,
    GETMatchOftheday: GETMatchOftheday,
    POSTMatching_instruction: POSTMatching_instruction,
    DELETEMatching_instruction: DELETEMatching_instruction,
    GETMatching_instructionAll: GETMatching_instructionAll,
    PUTMatching_log: PUTMatching_log,
    POSTMaxclaimsActivate: POSTMaxclaimsActivate,
    GETMessage: GETMessage,
    POSTMessage: POSTMessage,
    GETMessageBy_ses_id: GETMessageBy_ses_id,
    POSTMultipack: POSTMultipack,
    GETMultipack: GETMultipack,
    POSTMultipackAdminCSS: POSTMultipackAdminCSS,
    POSTMultipackAdminLogo: POSTMultipackAdminLogo,
    GETMultipackBy_domain_name: GETMultipackBy_domain_name,
    GETMultipackClone: GETMultipackClone,
    GETMultipackLess: GETMultipackLess,
    POSTMultipackLogo: POSTMultipackLogo,
    POSTMultipackMap_pin: POSTMultipackMap_pin,
    GETOps_log: GETOps_log,
    POSTOps_log: POSTOps_log,
    POSTPaintBy_ingest_job_id: POSTPaintBy_ingest_job_id,
    POSTPartnersyndicateActivate: POSTPartnersyndicateActivate,
    POSTPartnersyndicateCancel: POSTPartnersyndicateCancel,
    POSTPartnersyndicateCreate: POSTPartnersyndicateCreate,
    GETPartnersyndicateRequestcat: GETPartnersyndicateRequestcat,
    POSTPartnersyndicateUpdateToCk: POSTPartnersyndicateUpdateToCk,
    POSTPlugin: POSTPlugin,
    GETPlugin: GETPlugin,
    POSTPluginActivate: POSTPluginActivate,
    POSTPluginCancel: POSTPluginCancel,
    GETPluginDatarow: GETPluginDatarow,
    POSTPluginDatarow: POSTPluginDatarow,
    POSTPluginVar: POSTPluginVar,
    GETPluginVarsByEntityId: GETPluginVarsByEntityId,
    GETPlugins: GETPlugins,
    DELETEPrivate_object: DELETEPrivate_object,
    PUTPrivate_object: PUTPrivate_object,
    GETPrivate_objectAll: GETPrivate_objectAll,
    POSTProduct: POSTProduct,
    GETProduct: GETProduct,
    POSTProductImageLogo: POSTProductImageLogo,
    DELETEProductImageLogo: DELETEProductImageLogo,
    DELETEProductImageMain: DELETEProductImageMain,
    POSTProductImageMain: POSTProductImageMain,
    DELETEProductImageSmall: DELETEProductImageSmall,
    POSTProductImageSmall: POSTProductImageSmall,
    DELETEProductProvisioning: DELETEProductProvisioning,
    POSTProductProvisioningAdvert: POSTProductProvisioningAdvert,
    POSTProductProvisioningClaim: POSTProductProvisioningClaim,
    POSTProductProvisioningMaxclaims: POSTProductProvisioningMaxclaims,
    POSTProductProvisioningPartnersyndicate: POSTProductProvisioningPartnersyndicate,
    POSTProductProvisioningPlugin: POSTProductProvisioningPlugin,
    POSTProductProvisioningSchedulesms: POSTProductProvisioningSchedulesms,
    POSTProductProvisioningSyndication: POSTProductProvisioningSyndication,
    GETPtbAll: GETPtbAll,
    GETPtbLog: GETPtbLog,
    GETPtbModule: GETPtbModule,
    GETPtbRunrate: GETPtbRunrate,
    GETPtbValueadded: GETPtbValueadded,
    GETPublisher: GETPublisher,
    POSTPublisher: POSTPublisher,
    DELETEPublisher: DELETEPublisher,
    GETPublisherByCountry: GETPublisherByCountry,
    GETPublisherByEntityId: GETPublisherByEntityId,
    GETPublisherBy_masheryid: GETPublisherBy_masheryid,
    GETQueue: GETQueue,
    PUTQueue: PUTQueue,
    DELETEQueue: DELETEQueue,
    GETQueueBy_id: GETQueueBy_id,
    POSTQueueError: POSTQueueError,
    GETQueueSearch: GETQueueSearch,
    POSTQueueUnlock: POSTQueueUnlock,
    PUTQueue_sqs: PUTQueue_sqs,
    GETQueue_sqsAttributes: GETQueue_sqsAttributes,
    GETReseller: GETReseller,
    POSTReseller: POSTReseller,
    GETSales_log: GETSales_log,
    GETSales_logBy_countryBy_date: GETSales_logBy_countryBy_date,
    GETSales_logBy_date: GETSales_logBy_date,
    POSTSales_logEntity: POSTSales_logEntity,
    POSTSales_logSyndication: POSTSales_logSyndication,
    POSTScoot_priority: POSTScoot_priority,
    PUTShortenurl: PUTShortenurl,
    GETShortenurl: GETShortenurl,
    POSTSignal: POSTSignal,
    GETSitemapEntity: GETSitemapEntity,
    GETSitemapEntitySummary: GETSitemapEntitySummary,
    GETSpider: GETSpider,
    GETStatsEntityBy_date: GETStatsEntityBy_date,
    GETStatsEntityBy_year: GETStatsEntityBy_year,
    GETStatus: GETStatus,
    GETSyndication: GETSyndication,
    GETSyndicationBy_entity_id: GETSyndicationBy_entity_id,
    GETSyndicationBy_reseller: GETSyndicationBy_reseller,
    POSTSyndicationCancel: POSTSyndicationCancel,
    POSTSyndicationCreate: POSTSyndicationCreate,
    POSTSyndicationRenew: POSTSyndicationRenew,
    POSTSyndication_log: POSTSyndication_log,
    GETSyndication_logBy_entity_id: GETSyndication_logBy_entity_id,
    GETSyndication_logLast_syndicated_id: GETSyndication_logLast_syndicated_id,
    PUTSyndication_submission: PUTSyndication_submission,
    GETSyndication_submission: GETSyndication_submission,
    POSTSyndication_submissionDeactivate: POSTSyndication_submissionDeactivate,
    POSTSyndication_submissionProcessed: POSTSyndication_submissionProcessed,
    GETTokenAdd: GETTokenAdd,
    GETTokenClaim: GETTokenClaim,
    GETTokenContact_us: GETTokenContact_us,
    GETTokenDecode: GETTokenDecode,
    GETTokenEdit: GETTokenEdit,
    GETTokenEncode: GETTokenEncode,
    GETTokenLogin: GETTokenLogin,
    GETTokenLoginReset_password: GETTokenLoginReset_password,
    GETTokenLoginSet_password: GETTokenLoginSet_password,
    GETTokenMessage: GETTokenMessage,
    GETTokenPartnerclaim: GETTokenPartnerclaim,
    GETTokenPartnerclaimInternal: GETTokenPartnerclaimInternal,
    GETTokenProduct: GETTokenProduct,
    GETTokenProduct_selector: GETTokenProduct_selector,
    GETTokenReport: GETTokenReport,
    GETTokenReview: GETTokenReview,
    GETTokenTestimonial: GETTokenTestimonial,
    GETToolsAddressdiff: GETToolsAddressdiff,
    GETToolsCrash: GETToolsCrash,
    POSTToolsCurl: POSTToolsCurl,
    GETToolsDocs: GETToolsDocs,
    GETToolsFormatAddress: GETToolsFormatAddress,
    GETToolsFormatPhone: GETToolsFormatPhone,
    GETToolsGeocode: GETToolsGeocode,
    POSTToolsGooglesheetAdd_row: POSTToolsGooglesheetAdd_row,
    POSTToolsGooglesheetWorksheet_id: POSTToolsGooglesheetWorksheet_id,
    POSTToolsImage: POSTToolsImage,
    GETToolsIodocs: GETToolsIodocs,
    GETToolsLess: GETToolsLess,
    GETToolsParseAddress: GETToolsParseAddress,
    GETToolsPhonecallVerify: GETToolsPhonecallVerify,
    GETToolsPhonetic: GETToolsPhonetic,
    GETToolsProcess_phone: GETToolsProcess_phone,
    GETToolsProcess_string: GETToolsProcess_string,
    GETToolsReindex: GETToolsReindex,
    GETToolsSendsms: GETToolsSendsms,
    GETToolsSpider: GETToolsSpider,
    GETToolsStem: GETToolsStem,
    GETToolsStopwords: GETToolsStopwords,
    GETToolsSubmissionInfogroup: GETToolsSubmissionInfogroup,
    GETToolsSyndicate118: GETToolsSyndicate118,
    GETToolsSyndicateBingads: GETToolsSyndicateBingads,
    GETToolsSyndicateBingplaces: GETToolsSyndicateBingplaces,
    GETToolsSyndicateDnb: GETToolsSyndicateDnb,
    GETToolsSyndicateEnablemedia: GETToolsSyndicateEnablemedia,
    GETToolsSyndicateFactual: GETToolsSyndicateFactual,
    GETToolsSyndicateFactualcsv: GETToolsSyndicateFactualcsv,
    GETToolsSyndicateFoursquare: GETToolsSyndicateFoursquare,
    GETToolsSyndicateGoogle: GETToolsSyndicateGoogle,
    GETToolsSyndicateInfobelcsv: GETToolsSyndicateInfobelcsv,
    GETToolsSyndicateInfogroup: GETToolsSyndicateInfogroup,
    GETToolsSyndicateJudysbook: GETToolsSyndicateJudysbook,
    GETToolsSyndicateKml: GETToolsSyndicateKml,
    GETToolsSyndicateLocaldatabase: GETToolsSyndicateLocaldatabase,
    GETToolsSyndicateNokia: GETToolsSyndicateNokia,
    GETToolsSyndicateOsm: GETToolsSyndicateOsm,
    GETToolsSyndicateThomsonlocal: GETToolsSyndicateThomsonlocal,
    GETToolsSyndicateTomtom: GETToolsSyndicateTomtom,
    GETToolsSyndicateYalwa: GETToolsSyndicateYalwa,
    GETToolsSyndicateYasabe: GETToolsSyndicateYasabe,
    GETToolsTestmatch: GETToolsTestmatch,
    GETToolsTransactional_email: GETToolsTransactional_email,
    POSTToolsUpload: POSTToolsUpload,
    GETToolsUrl_details: GETToolsUrl_details,
    GETToolsValidate_email: GETToolsValidate_email,
    GETToolsValidate_phone: GETToolsValidate_phone,
    DELETETraction: DELETETraction,
    GETTraction: GETTraction,
    POSTTraction: POSTTraction,
    GETTractionActive: GETTractionActive,
    PUTTransaction: PUTTransaction,
    GETTransaction: GETTransaction,
    POSTTransactionAuthorised: POSTTransactionAuthorised,
    GETTransactionBy_paypal_transaction_id: GETTransactionBy_paypal_transaction_id,
    POSTTransactionCancelled: POSTTransactionCancelled,
    POSTTransactionComplete: POSTTransactionComplete,
    POSTTransactionInprogress: POSTTransactionInprogress,
    POSTUser: POSTUser,
    GETUser: GETUser,
    GETUserAllowed_to_edit: GETUserAllowed_to_edit,
    GETUserBy_email: GETUserBy_email,
    GETUserBy_groupid: GETUserBy_groupid,
    GETUserBy_reseller_admin_masheryid: GETUserBy_reseller_admin_masheryid,
    GETUserBy_social_media: GETUserBy_social_media,
    POSTUserDowngrade: POSTUserDowngrade,
    POSTUserGroup_admin_remove: POSTUserGroup_admin_remove,
    POSTUserLog_activity: POSTUserLog_activity,
    GETUserLog_activityList_time: GETUserLog_activityList_time,
    GETUserManaged_entities: GETUserManaged_entities,
    POSTUserReseller_remove: POSTUserReseller_remove,
    DELETEUserSocial_network: DELETEUserSocial_network,
    GETViewhelper: GETViewhelper,
    POSTWebcard: POSTWebcard
  }
