"use strict";

var request = require('request');
var url = require('url');
var LoLJSError = require('./js4lol_error');

var LoLJS = function(config) {
	this.api_key = config.api_key;
	this.debug = config.debug;
	return this;
};

// ---------------------------------- Basic functions for requests --------------------------------------------------

LoLJS.prototype.createApiUrl = function (options){

	if(options && options.query){
		options.query.api_key = this.api_key;
	} else {
		options.query = {api_key: this.api_key};
	}
	
	if (this.debug)
		console.log('Query: ' + options.query);

	// var host = (options.region.toLowerCase() == 'na') ? 'na.api.pvp.net' : this.host;
	var host = options.region.toLowerCase() + '.api.pvp.net';

	//TODO Fix this with more region endpoints

	var result = url.format({
		protocol: 'https',
		host: host + '/api/lol/' + options.region + options.path,
		query: options.query		
	});
	
	return result;

};

LoLJS.prototype.createObserverUrl = function (options){

	if(options && options.query){
		options.query.api_key = this.api_key;
	} else {
		options.query = {api_key: this.api_key};
	}

	if (this.debug)
		console.log('Query: ' + options.query);
	
	var host = options.region.toLowerCase() + '.api.pvp.net';

	//TODO Fix this with more region endpoints

	var result = url.format({
		protocol: 'https',
		host: host + '/observer-mode/rest/' + options.path,
		query: options.query		
	});

	return result;

};

LoLJS.prototype.createStaticDataUrl = function (options){

	if(options && options.query){
		options.query.api_key = this.api_key;
	} else {
		options.query = {api_key: this.api_key};
	}

	if (this.debug)
		console.log('Query: ' + options.query);
	
	var host = 'global.api.pvp.net';

	//TODO Fix this with more region endpoints

	var result = url.format({
		protocol: 'https',
		host: host + '/api/lol/static-data/' + options.region + options.path,
		query: options.query		
	});

	return result;

};

LoLJS.prototype.executeRequest = function (url, callback){

	if (this.debug)
		console.log('Url: ' + url);

	request.get(url, function (err, res, body){

		if(err){
			if (this.debug)
				console.log('Request err:', err);
			callback(err);
		} else {
			if(res.statusCode === 200){
				try {
					body = JSON.parse(body);
					callback(null, body); //Error is null, sends body to callback
				} catch (e){

					callback(e);
				}
			} else {
				//Create new error and send it to callback
				err = new LoLJSError(url, res.statusCode);
				callback(err);
			}
		}
	});
};

// ------------------------------------------------------------------------------------------------------------------
// --------------------------------------------- Champions basic ----------------------------------------------------

LoLJS.prototype.getChampionsBasic = function (region, freeToPlay, callback) {	

	var options = {
		region: region,
		path: '/v1.2/champion',
		query: {
			freeToPlay: freeToPlay
		}
	};

	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getChampionBasic = function(region, champId, callback) {
	var options = {
		region: region,
		path: '/v1.2/champion/' + champId
	}

	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

// ------------------------------------------------------------------------------------------------------------------
// ---------------------------------- Observer (Featured games, current game) ---------------------------------------

LoLJS.prototype.getFeaturedGames = function(region, callback) {
	var options = {
		region: region,
		path: 'featured'
	}

	var url = this.createObserverUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getCurrentGame = function(region, summonerId, callback) {

	var platfrom = this.observerPlatformByRegion[region];
	var options = {
		region: region,
		path: 'consumer/getSpectatorGameInfo/' + platfrom + '/' + summonerId
	}

	var url = this.createObserverUrl(options);
	this.executeRequest(url, callback);
}

// ------------------------------------------------------------------------------------------------------------------
// ---------------------------------- Summoner recent games ---------------------------------------------------------
LoLJS.prototype.getSummonerRecentGames = function(region, summonerId, callback){
	var options = {
		region: region,
		path: '/v1.3/game/by-summoner/' + summonerId + '/recent'
	}

	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

// ------------------------------------------------------------------------------------------------------------------
// ---------------------------------- League info -------------------------------------------------------------------

LoLJS.prototype.getLeagueBySummId = function(region, summonerId, callback, entry) {

	var path = '/v2.5/league/by-summoner/' + summonerId
	if (entry)
		path += '/entry'

	var options = {
		region: region,
		path: path
	}

	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getLeagueEntryBySummId = function(region, summonerId, callback) {
	this.getLeagueBySummId(region, summonerId, callback, true);
}

LoLJS.prototype.getLeagueByTeamId = function(region, teamId, callback, entry) {

	var path = '/v2.5/league/by-team/' + teamId
	if(entry)
		path += '/entry'

	var options = {
		region: region,
		path: path
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getLeagueEntryByTeamId = function(region, teamId, callback) {
	this.getLeagueByTeamId(region, teamId, callback, true);
}

LoLJS.prototype.getGameTypeChallengerLeague = function(region, gameType, callback) {
	var options = {
		region: region,
		path: '/v2.5/league/challenger',
		query: {
			type: gameType
		}
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getGameTypeMasterLeague = function(region, gameType, callback) {
	var options = {
		region: region,
		path: '/v2.5/league/master',
		query: {
			type: gameType
		}
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

// ------------------------------------------------------------------------------------------------------------------
// ---------------------------------- Lol static data ---------------------------------------------------------------

LoLJS.prototype.getChampionsData = function(region, callback) {
	var options = {
		region: region,
		path: '/v1.2/champion'
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getChampionDataById = function(region, champId, callback) {
	var options = {
		region: region,
		path: '/v1.2/champion/' + champId
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getItemsData = function(region, callback) {
	var options = {
		region: region,
		path: '/v1.2/item'
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getItemStaticDataById = function(region, itemId, callback) {
	var options = {
		region: region,
		path: '/v1.2/item/' + itemId
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getMapsData = function(region, callback) {
	var options = {
		region: region,
		path: '/v1.2/map/'
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getMasteriesData = function(region, callback) {
	var options = {
		region: region,
		path: '/v1.2/mastery'
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getMasteryDataById = function(region, masteryId, callback) {
	var options = {
		region: region,
		path: '/v1.2/mastery/' + masteryId
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

// ----------------------------- DDragon ----------------------------------------

LoLJS.prototype.getRealmByRegion = function(region, callback) {
	var options = {
		region: region,
		path: '/v1.2/realm'
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getRunesData = function(region, callback) {
	var options = {
		region: region,
		path: '/v1.2/rune'
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getRuneDataById = function(region, runeId, callback) {
	var options = {
		region: region,
		path: '/v1.2/rune/' + runeId
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getSummonerSpellsData = function(region, callback) {
	var options = {
		region: region,
		path: '/v1.2/summoner-spell'
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getSummonerSpellById = function(region, spellId, callback) {
	var options = {
		region: region,
		path: '/v1.2/summoner-spell/' + spellId
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

// ----------------------------- Status ----------------------------------------

LoLJS.prototype.getStatusByRegion = function(region, callback) {
	
	var url = 'http://status.leagueoflegends.com/shards/' + region;
	this.executeRequest(url, callback);
}

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------- Matches -------------------------------------------------------------------------

LoLJS.prototype.getMatchById = function(region, matchId, includeTimeline, callback) {
	var options = {
		region: region,
		path: '/v2.2/match/' + matchId,
		query: {
			includeTimeline: includeTimeline
		}
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getSummonerMatchHistory = function(region, summonerId, championIds, rankedQueues, beginIndex, endIndex, callback) {

	var query = {};

	//TODO Handle bad input

	if (championIds)
		query.championIds = championIds;
	if (rankedQueues)
		query.rankedQueues = rankedQueues;
	if (beginIndex && endIndex){
			query.beginIndex = beginIndex;
			query.endIndex = endIndex;
		}

	var options = {
		region: region,
		path: '/v2.2/matchhistory/' + summonerId,
		query: query
		
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------- Stats --------------------------------------------------------------------------

LoLJS.prototype.getSummonerRankedStats = function(region, summonerId, callback, season) {

	var query = {};

	if (season)
		query.season = season;

	var options = {
		region: region,
		path: '/v1.3/stats/by-summoner/' + summonerId + '/ranked',
		query: query
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getSummonerStats = function(region, summonerId, callback, season) {

	var query = {};

	if (season)
		query.season = season;

	var options = {
		region: region,
		path: '/v1.3/stats/by-summoner/' + summonerId + '/summary',
		query: query
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------- Stats --------------------------------------------------------------------------

LoLJS.prototype.getSummonerByName = function(region, summonerNames, callback) {

	var options = {
		region: region,
		path: '/v1.4/summoner/by-name/' + summonerNames,
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getSummonerById = function(region, summonerIds, callback) {

	var options = {
		region: region,
		path: '/v1.4/summoner/' + summonerIds,
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getSummonerMasteries = function(region, summonerIds, callback) {

	var options = {
		region: region,
		path: '/v1.4/summoner/' + summonerIds + '/masteries',
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getSummonerName = function(region, summonerIds, callback) {

	var options = {
		region: region,
		path: '/v1.4/summoner/' + summonerIds + '/name',
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getSummonerRunes = function(region, summonerIds, callback) {

	var options = {
		region: region,
		path: '/v1.4/summoner/' + summonerIds + '/runes',
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------- Teams --------------------------------------------------------------------------

LoLJS.prototype.getSummonerTeams = function(region, summonerIds, callback) {

	var options = {
		region: region,
		path: '/v2.4/team/by-summoner/' + summonerIds,
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

LoLJS.prototype.getTeamById = function(region, teamIds, callback) {

	var options = {
		region: region,
		path: '/v2.4/team/' + teamIds,
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

// --------------------------------------------------------------------------------------------------------------------
// ---------------------------------- Helper --------------------------------------------------------------------------

LoLJS.prototype.observerPlatformByRegion = {
		euw: 'EUW1',
		eune: 'EUN1',
		na: 'NA1',
		br: 'BR1',
		oce: 'OC1',
		ru: 'RU',
		tr: 'TR1',
		lan: 'LA1',
		las: 'LA2',
		kr: 'KR'
} 



module.exports = LoLJS;