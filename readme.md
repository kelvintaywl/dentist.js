# Dentist JS

##Short Summary

Dentist JS is a Javascript plugin to help front-end developers extract parameters from given URLs.

**Use Cases**

Many e-commerce stores displays their products with URLs that may specify the item's id in the GET parameters of the URL. Dentist JS can help extract these parameters from the provided URL in one simple call.

Need to pull out that Spreadsheet key from a particular Google Spreadsheet? Dentist JS is here to extract that!

Example:

```javascript
var input_string = document.getElementById('inputURL');
//returns an object of the parameters in key value format
var params_from_string = extract(input_string);
alert(JSON.stringify(params_from_string));
```

```javascript
var example_spreadsheet_url = "https://docs.google.com/spreadsheet/ccc?key=0AmOWBO7jUkaFdEwxdlpmVl9Bcm5faGVFNTVTdUV6Wnc&usp=drive_web#gid=0";
var spreadsheet_key = extract(example_spreadsheet_url, {"keys": "key"})

//prints out 0AmOWBO7jUkaFdEwxdlpmVl9Bcm5faGVFNTVTdUV6Wnc
console.log(spreadsheet_key);
```

View [demo](index.html)

##Usage

1. Simply include dentist.js in your html.

```html
<script src="YOUR_JAVASCRIPT_FOLDER_PATH/dentist.js"></script>
```

2. In your custom javascript, call the extract() on the input url string.

```javascript
var input_string = "http://some_random_url.com/some_path?id=123&type=mytype&name=myname";
var params_from_string = extract(input_string);
```

Returned object:
```javascript
params_from_string = {
	"id": "123",
	"type": "mytype",
	"name": "myname"
}
```

By default, extract() returns all available parameters from the input unless specified. To specify particular keys needed (eg., "id" and "name"), just add in the arguments as an "keys" array (shown below).

```javascript
var input_string = "http://some_random_url.com/some_path?id=123&type=mytype&name=myname";
var params_from_string = extract(input_string, {"keys":["id", "name"]});
```

Returned object:
```javascript
params_from_string = {
	"id": "123",
	"name": "myname"
}
```

3. Because we may only require one parameter from the input string, Dentist JS is smart enough to return you a string instead of one object! Try it!

```javascript
var input_string = "http://some_random_url.com/some_path?id=123&type=mytype&name=myname"
var params_from_string = extract(input_string, {"keys":"id"});
// same as writing -> var params_from_string = extract(input_string, {"keys":["id"]});
```

Returned object:
```javascript
params_from_string = "123"
```

4. Dentist JS can also be customized! Available options include:

+ param_delim : delimeter separating each parameter. Default value is "&"
+ kv_delim : delimeter seperating the parameter and its value. Default value is "="
+ isURL : tells Dentist JS if input string is of URL type or otherwise. Default value is true

```javascript
var my_cat_string = "id=888||type=lucky||name=luckycat||age=88||lives=9"
var about_my_cat_ = extract(my_cat_string, {"keys":["id", "lives", "age"], "param_delim": "||", isURL: false});
```

Returned object:
```javascript
about_my_cat = {
	"id": "888",
	"lives": "9",
	"age": "88"
}
```

