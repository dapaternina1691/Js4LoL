# Js4LoL

<a href="https://travis-ci.org/dapaternina1691/Js4LoL"><img src="https://travis-ci.org/dapaternina1691/Js4LoL.svg?branch=master"/></a>

##Installation

```

npm install js4lol

```

##How to use

```node
// Import the library
var Js4LoL = require('./js4lol.js');

// Basic config
var config = {
	api_key: 'YOUR-API-KEY', 
	debug: true 
};

// Instantiate
var js4lol = new Js4LoL(config);

// Call a method with the necessary parameters
js4lol.getSummonerByName('lan', 'MicroIce', function(error, body) {
  if (body)
 	  console.log(body);
	else
	  console.log(error);
});
```




##About

This was made with learning purposes. Partly inspired by the <a href="https://github.com/alexperezpaya/irelia">LoL API Wrapper by Alejandro Perezpayá</a>.
<br>Feel free to use or modify this code in any way.
