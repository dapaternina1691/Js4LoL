var Js4LoLError = function(url, statusCode){
	Error.call(this);
	Error.captureStackTrace(this, Js4LoLError);

	this.name = 'Js4LoLError';
	this.url = url;
	this.statusCode = statusCode;
	this.message = 'HTTP Status Code ' + statusCode + ' received when requesting ' + url;

	this.populateStatus();
};
Js4LoLError.prototype = new Error();
Js4LoLError.prototype.constructor = Js4LoLError;

Js4LoLError.prototype.populateStatus = function(){
	if(this.statusCode === 404){
		this.status = {
			message: 'Not found. Check if: \n -The ID or name provided does not match any existing resource (e.g., there is no summoner matching the specified ID)'+
			'\n -The API request was for an incorrect or unsupported path',
			code: this.statusCode
		};
	} else if(this.statusCode === 429){
		this.status = {
			message: 'Rate limit exceeded',
			code: this.statusCode
		};
	} else if(this.statusCode === 500){
		this.status = {
			message: 'Internal server error',
			code: this.statusCode
		};
	} else {
		this.status = {
			message: 'Unknown error',
			code: 0
		};
	}
};

module.exports = Js4LoLError;