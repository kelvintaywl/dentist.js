!(function(){
	var undefined;

	var DEFAULTS = {
		delimiter: '&',
		keyValueSeparator: '=',
		startAfter: '?',
	};

	String.prototype.extract = function(opts){

		function filterInt(value) {
  			if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value)){
    			return Number(value);
    		};
  			return NaN;
		}

		if(this.length <= 1) return;

		var delimiter, keyValueSeparator, startAfter, limit;
		var opts = opts || {},
			keyValuePairs = [],
			params = {};

		delimiter = opts.delimiter || DEFAULTS.delimiter;
		keyValueSeparator = opts.keyValueSeparator || DEFAULTS.keyValueSeparator;
		startAfter = opts.startAfter || DEFAULTS.startAfter;
		limit = filterInt(opts.limit)? opts.limit : undefined;

		var startAfterindex = this.indexOf(startAfter);
		var keyValueSeparatorFirstIndex = this.indexOf(keyValueSeparator); 

		if(keyValueSeparatorFirstIndex < 0) return;

		// scope of finding params only applicable to str
		var str = startAfterindex < 0? this : this.substring(startAfterindex + 1); 
		
		keyValuePairs = str.split(delimiter, limit);
		var kvPair;
		for(var i=0, s=keyValuePairs.length; i<s; i++){
			kvPair = keyValuePairs[i].split(keyValueSeparator, 2);
			// ignore any items after first value found, where key = kvPair[0], value = kvPair[1]
			var value = kvPair[1];
			params[kvPair[0]] = filterInt(value)? filterInt(value) : value; // return int if value is parsable
		};
		return params;
	};
})();