function extract(str_to_split, opts){

	function isURL(str){
		return str.substring(0,4) === 'http';
	};

	str_to_split = (str_to_split === undefined)? document.URL : str_to_split;
	opts = opts || {};
	var URL_DELIM = '?';
	var PARAM_DELIM = (opts.param_delim === undefined)? '&': opts.param_delim;
	var KV_DELIM = (opts.kv_delim === undefined)? '=' : opts.kv_delim;
	var keys = (opts.keys === undefined)? null : opts.keys;
	if(keys){
		keys = (Object.prototype.toString.call(opts.keys) == "[object Array]")? keys : [keys];
	};
	try {
		var params_string = (isURL(str_to_split))? str_to_split.split(URL_DELIM)[1] : str_to_split;
		if(params_string.length<1){ return undefined; };
		var params = params_string.split(PARAM_DELIM);
		var results = {};
	
		for(var i=0; i<params.length; i++){
			var key_value = params[i].split(KV_DELIM);
			results[key_value[0]] = key_value[1];
		};
		if(keys == null){
			return Object.keys(results).length > 1? results : results[Object.keys(results)[0]];
		};
	
		requested_results = {};
		for(var i=0; i<keys.length; i++){
			requested_results[keys[i]] = results[keys[i]] || null;
		};
		return Object.keys(requested_results).length > 1? requested_results : requested_results[keys[0]];
	}
	catch (e) {
  	  	return undefined;
	};	
};