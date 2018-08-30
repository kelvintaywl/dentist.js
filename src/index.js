const DEFAULTS = {
  delimiter: '&',
  keyValueSeparator: '=',
  startAfter: '?',
};

const extract = (str, options) => {
  const filterInt = (value) => {
    if (/^(-|\+)?([0-9]+|Infinity)$/.test(value)) {
      return Number(value);
    }
    return NaN;
  };

  if (str.length <= 1) return {};

  const opts = options || {};
  let keyValuePairs = [];
  const params = {};

  const delimiter = opts.delimiter || DEFAULTS.delimiter;
  const keyValueSeparator = opts.keyValueSeparator || DEFAULTS.keyValueSeparator;
  const startAfter = opts.startAfter || DEFAULTS.startAfter;
  const limit = filterInt(opts.limit) >= 1 ? opts.limit : undefined;

  const querystringStartIndex = str.lastIndexOf(startAfter) + 1;
  const keyValueSeparatorFirstIndex = str.indexOf(keyValueSeparator, querystringStartIndex);

  if (keyValueSeparatorFirstIndex < 0) return {};

  // scope of finding params only applicable to str
  const mystr = querystringStartIndex < 0 ? str : str.substring(querystringStartIndex);

  keyValuePairs = mystr.split(delimiter, limit);
  let kvPair;
  let i = 0;
  for (const s = keyValuePairs.length; i < s; i += 1) {
    kvPair = keyValuePairs[i].split(keyValueSeparator, 2);
    // ignore any items after first value found, where key = kvPair[0], value = kvPair[1]
    const value = kvPair[1];
    // return int if value is parsable
    params[kvPair[0]] = filterInt(value) ? filterInt(value) : value;
  }
  return params;
};

module.exports = extract;
