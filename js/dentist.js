!(function(window, document, undefined){
	var DEFAULTS = {
		delimiter: '&',
		key_value_separator: '=',
		params_prefix: '?',
	};

	String.prototype.extract = function(opts){
		var opts = opts || {},
			keyValuePairs = [],
			params = {};

		opts.delimiter = opts.delimiter || DEFAULTS.delimiter;
		opts.key_value_separator = opts.key_value_separator || DEFAULTS.key_value_separator;
		opts.params_prefix = opts.params_prefix || DEFAULTS.params_prefix;

		var indexParamsPrefix = this.indexOf(opts.params_prefix)

		// scope of finding params only applicable to str
		var str = indexParamsPrefix < 0? this : this.substring(indexParamsPrefix+1); 
		
		keyValuePairs = str.split(opts.delimiter);
		var kv_pair;
		for(var i=0, s=keyValuePairs.length; i<s; i++){
			kv_pair = keyValuePairs[i].split(opts.key_value_separator);
			// ignore any items after first value found, where key = kv_pair[0], value = kv_pair[1]
			params[kv_pair[0]] = kv_pair[1];
		};
		return params;
	};
})(window, document);