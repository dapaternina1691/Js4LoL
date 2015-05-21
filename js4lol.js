"use strict";

var request = require('request');
var url = require('url');
var Js4LoLError = require('./js4lol_error');

var Js4LoL = function(config) {
	this.api_key = config.api_key;
	this.debug = config.debug;
	return this;
};

// ---------------------------------- Basic functions for requests --------------------------------------------------

Js4LoL.prototype.createApiUrl = function (options){

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

Js4LoL.prototype.createObserverUrl = function (options){

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

Js4LoL.prototype.createStaticDataUrl = function (options){

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

Js4LoL.prototype.executeRequest = function (url, callback){

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
				err = new Js4LoLError(url, res.statusCode);
				callback(err);
			}
		}
	});
};

// ------------------------------------------------------------------------------------------------------------------
// --------------------------------------------- Champions basic ----------------------------------------------------

Js4LoL.prototype.getChampionsBasic = function (region, freeToPlay, callback) {	

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

Js4LoL.prototype.getChampionBasic = function(region, champId, callback) {
	var options = {
		region: region,
		path: '/v1.2/champion/' + champId
	}

	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

// ------------------------------------------------------------------------------------------------------------------
// ---------------------------------- Observer (Featured games, current game) ---------------------------------------

Js4LoL.prototype.getFeaturedGames = function(region, callback) {
	var options = {
		region: region,
		path: 'featured'
	}

	var url = this.createObserverUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getCurrentGame = function(region, summonerId, callback) {

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
Js4LoL.prototype.getSummonerRecentGames = function(region, summonerId, callback){
	var options = {
		region: region,
		path: '/v1.3/game/by-summoner/' + summonerId + '/recent'
	}

	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

// ------------------------------------------------------------------------------------------------------------------
// ---------------------------------- League info -------------------------------------------------------------------

Js4LoL.prototype.getLeagueBySummId = function(region, summonerId, callback, entry) {

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

Js4LoL.prototype.getLeagueEntryBySummId = function(region, summonerId, callback) {
	this.getLeagueBySummId(region, summonerId, callback, true);
}

Js4LoL.prototype.getLeagueByTeamId = function(region, teamId, callback, entry) {

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

Js4LoL.prototype.getLeagueEntryByTeamId = function(region, teamId, callback) {
	this.getLeagueByTeamId(region, teamId, callback, true);
}

Js4LoL.prototype.getGameTypeChallengerLeague = function(region, gameType, callback) {
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

Js4LoL.prototype.getGameTypeMasterLeague = function(region, gameType, callback) {
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

Js4LoL.prototype.getChampionsData = function(region, locale, champData, callback) {

	var query = {};

	if (locale)
		query.locale = locale;
	if (champData)
		query.champData = champData;

	var options = {
		region: region,
		path: '/v1.2/champion',
		query: query
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getChampionDataById = function(region, champId, locale, champData, callback) {

	var query = {};

	if (locale)
		query.locale = locale;
	if (champData)
		query.champData = champData;

	var options = {
		region: region,
		path: '/v1.2/champion/' + champId,
		query: query
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getItemsData = function(region, locale, itemListData, callback) {

	var query = {};

	if (locale)
		query.locale = locale;
	if (itemListData)
		query.itemListData = itemListData;

	var options = {
		region: region,
		path: '/v1.2/item',
		query: query
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getItemStaticDataById = function(region, itemId, locale, itemData, callback) {

	var query = {};

	if (locale)
		query.locale = locale;
	if (itemData)
		query.itemData = itemData;

	var options = {
		region: region,
		path: '/v1.2/item/' + itemId
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getMapsData = function(region, locale, callback) {

	var query = {};

	if (locale)
		query.locale = locale;

	var options = {
		region: region,
		path: '/v1.2/map/',
		query: query
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getMasteriesData = function(region, locale, masteryListData, callback) {

	var query = {};

	if (locale)
		query.locale = locale;
	if (masteryListData)
		query.masteryListData = masteryListData;

	var options = {
		region: region,
		path: '/v1.2/mastery',
		query: query
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getMasteryDataById = function(region, masteryId, locale, masteryData, callback) {

	var query = {};

	if (locale)
		query.locale = locale;
	if (masteryData)
		query.masteryData = masteryData;

	var options = {
		region: region,
		path: '/v1.2/mastery/' + masteryId,
		query: query
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

// ----------------------------- DDragon ----------------------------------------

Js4LoL.prototype.getRealmByRegion = function(region, callback) {
	var options = {
		region: region,
		path: '/v1.2/realm'
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getRunesData = function(region, locale, runeListData, callback) {

	var query = {};

	if (locale)
		query.locale = locale;
	if (runeListData)
		query.runeListData = runeListData;

	var options = {
		region: region,
		path: '/v1.2/rune',
		query: query
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getRuneDataById = function(region, runeId, locale, runeData, callback) {

	var query = {};

	if (locale)
		query.locale = locale;
	if (runeData)
		query.runeData = runeData;

	var options = {
		region: region,
		path: '/v1.2/rune/' + runeId,
		query: query
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getSummonerSpellsData = function(region, locale, spellData, callback) {

	var query = {};

	if (locale)
		query.locale = locale;
	if (spellData)
		query.spellData = spellData;

	var options = {
		region: region,
		path: '/v1.2/summoner-spell',
		query: query
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getSummonerSpellById = function(region, spellId, locale, spellData, callback) {

	var query = {};

	if (locale)
		query.locale = locale;
	if (spellData)
		query.spellData = spellData;

	var options = {
		region: region,
		path: '/v1.2/summoner-spell/' + spellId,
		query: query
	}
	var url = this.createStaticDataUrl(options);
	this.executeRequest(url, callback);
}

// ----------------------------- Status ----------------------------------------

Js4LoL.prototype.getStatusByRegion = function(region, callback) {
	
	var url = 'http://status.leagueoflegends.com/shards/' + region;
	this.executeRequest(url, callback);
}

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------- Matches -------------------------------------------------------------------------

Js4LoL.prototype.getMatchById = function(region, matchId, includeTimeline, callback) {
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

Js4LoL.prototype.getSummonerMatchHistory = function(region, summonerId, championIds, rankedQueues, beginIndex, endIndex, callback) {

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

Js4LoL.prototype.getSummonerRankedStats = function(region, summonerId, callback, season) {

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

Js4LoL.prototype.getSummonerStats = function(region, summonerId, callback, season) {

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

Js4LoL.prototype.getSummonerByName = function(region, summonerNames, callback) {

	var options = {
		region: region,
		path: '/v1.4/summoner/by-name/' + summonerNames,
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getSummonerById = function(region, summonerIds, callback) {

	var options = {
		region: region,
		path: '/v1.4/summoner/' + summonerIds,
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getSummonerMasteries = function(region, summonerIds, callback) {

	var options = {
		region: region,
		path: '/v1.4/summoner/' + summonerIds + '/masteries',
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getSummonerName = function(region, summonerIds, callback) {

	var options = {
		region: region,
		path: '/v1.4/summoner/' + summonerIds + '/name',
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getSummonerRunes = function(region, summonerIds, callback) {

	var options = {
		region: region,
		path: '/v1.4/summoner/' + summonerIds + '/runes',
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------- Teams --------------------------------------------------------------------------

Js4LoL.prototype.getSummonerTeams = function(region, summonerIds, callback) {

	var options = {
		region: region,
		path: '/v2.4/team/by-summoner/' + summonerIds,
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

Js4LoL.prototype.getTeamById = function(region, teamIds, callback) {

	var options = {
		region: region,
		path: '/v2.4/team/' + teamIds,
	}
	var url = this.createApiUrl(options);
	this.executeRequest(url, callback);
}

// --------------------------------------------------------------------------------------------------------------------
// ---------------------------------- Helper --------------------------------------------------------------------------

Js4LoL.prototype.observerPlatformByRegion = {
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



module.exports = Js4LoL;