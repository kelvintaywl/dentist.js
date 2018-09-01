const { extract } = require('./../src/index');


describe('extract', () => {
  it('should return a non-empty object if string does contain parameters', () => {
    const params = extract('http://google.com?a=1&b=2&z=zebra');
    expect(params.a).toEqual(1);
    expect(params.b).toEqual(2);
    expect(params.z).toEqual('zebra');
  });

  it('should return a non-empty object as long as key value separator exists (i.e., key-value pair exists)', () => {
    const params = extract('a=1&b=2&z=zebra');
    expect(params.a).toEqual(1);
    expect(params.b).toEqual(2);
    expect(params.z).toEqual('zebra');
  });

  it('should return a non-empty object with only up to first X keys where X is stated limit size', () => {
    const params = extract('http://google.com?a=1&b=2&z=zebra', { limit: 1 });
    expect(params.a).toEqual(1);
    expect(params.b).toBeUndefined();
    expect(params.z).toBeUndefined();
  });

  it('should return a non-empty object when non-errorneous options are requested', () => {
    const opts = { delimiter: '|', keyValueSeparator: '-' };
    let params = extract('a-1|b-2|z-zebra', opts);
    expect(params.a).toEqual(1);
    expect(params.b).toEqual(2);
    expect(params.z).toEqual('zebra');

    opts.startAfter = '|';
    params = extract('a-1|b-2|z-zebra', opts);
    expect(params.a).toBeUndefined();
    expect(params.b).toBeUndefined();
    expect(params.z).toEqual('zebra');
  });

  it('should return undefined if string does not contain parameters', () => {
    expect(extract('')).toBeUndefined();
    expect(extract('http://google.com')).toBeUndefined();
    expect(extract('http://google.com?')).toBeUndefined();
  });
});
