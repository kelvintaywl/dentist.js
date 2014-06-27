!(function(window, document, undefined){
	window.extract = function extract(str_to_split, opts){
		var opts = opts || {};
		var STR = str_to_split || document.URL;
		var SETTINGS = {
			start: opts.start && typeof opts.start === 'number'? opts.start : opts.start && typeof opts.start === 'string'? STR.indexOf(opts.start) : STR.indexOf('?') + 1,
			stop: opts.stop && typeof opts.stop === 'number'? opts.stop : opts.stop && typeof opts.stop === 'string'? STR.indexOf(opts.stop) : STR.length,
			param_delim : opts.param_delim || '&',
			kv_delim : opts.kv_delim || '=',
			keys : (opts.keys && Object.prototype.toString.call(opts.keys) === '[object Array]')? opts.keys : opts.keys? opts.keys : null,
		};

		console.log('keys', SETTINGS.keys);

		try {
			var results = {};
			var requested_results = {};
			var substr = STR.substring(SETTINGS.start, SETTINGS.stop);
			if(substr.length<1){ return null; };
			var params = substr.split(SETTINGS.param_delim);
		
			for(var i=0; i<params.length; i++){
				var kv_pair = params[i].split(SETTINGS.kv_delim);
				results[kv_pair[0]] = kv_pair[1];
			};
			if(!SETTINGS.keys){
				console.log(Object.keys(results).length);
				return Object.keys(results).length > 1? results : results[Object.keys(results)[0]];
			};
			console.log(requested_results);
			for(var i=0; i< SETTINGS.keys.length; i++){
				requested_results[SETTINGS.keys[i]] = results[SETTINGS.keys[i]] || null;
			};
			console.log(requested_results);
			return Object.keys(requested_results).length > 1? requested_results : requested_results[keys[0]];
		}
		catch (e) {
	  	  	return;
		};	
	};
})(window, document);