[![Build Status](https://travis-ci.org/kelvintaywl/dentist.js.svg?branch=master)](https://travis-ci.org/kelvintaywl/dentist.js)

# Dentist JS

##TL;DR

Working with URLs or jQuery's serialize() method? Call on Dentist JS to extract those parameters!
Dentist JS extracts anything as long as they are strings!

EXAMPLE:

```javascript
// document.URL == "http://helloworld.com/quotes?id=1337&author=kelvin&message=hello"
var currentURL = document.URL;
var params = currentURL.extract();
console.log(params.id); // 1337
console.log(params.author) // "kelvin"
console.log(params.message) // "hello"
```
Dentist JS is smart enough to know when to return a string or integer instead too!

## WHY
Often, we have systems that require the user to enter url addresses. These scenarios include (inexhaustive):

- reporting current page's URL address to error-reporting functions or systems
- entering current URL of Google spreadsheet to system (for system to parse data in these spreadsheets)

Usually, these URLs include parameters that can be valuable or essential for the developer. Sadly, Javascript does not come with a method that allows us to pull out these parameters. 

Also, instead of using jQuery's seralizeArray() (when dealing with AJAX and forms), we can now use Dentist JS to get to those parameters more efficiently ( O(1), rather than O(n))

### HOW

Example, a form (id: form) contains two inputs : {name: 'username', value; "nyancat"} and {name: 'password', value: "nyannyan"}

```javascript
$('#form').submit(function(e){
	e.preventDefault();
	var s = $(this).serialize(); // "username=nyancat&password=nyannyan"
	$(this).serializeArray(); // [{name: 'username', value; "nyancat"}, {name: 'password', value: "nyannyan"}]
	var formParams = s.extract() // {username: 'nyancat', password: 'nyannyan'}
	formParams.username; // 'nyancat'
	formParams.password; // 'nyannyan'
});
```


## API Usage

Dentist JS allows the following options when extracting.

| name | description | default |
| ---- | ---- | ---- |
| delimiter | char or string which separates each parameter | '&' |
| keyValueSeparator | char or string which connects the key and value in each parameter | '=' |
| startAfter | tells Dentist JS to only consider extract after the first occurance of this char or string | '?' |
| limit | an integer N, where Dentist JS only returns the first N parameters it can find | Infinity |

Examples:

```javascript
var str = "helloworld>a-1|b-2|c-3";
var params = str.extract({startAfter: ">", delimiter: '|', keyValueSeparator: '-', limit: 2});
params.a; // 1
params.b; // 2
params.c; // undefined since limit at 2
```

More usage examples can be found under ```tests/test.coffee```

### Dentist JS uses:

- node
- grunt
- mocha js
- grunt-contrib-uglify









