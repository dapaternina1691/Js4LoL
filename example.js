var Js4LoL = require('./js4lol.js');

var config = {
	api_key: 'YOUR-API-KEY',
	debug: true
};

var js4lol = new Js4LoL(config);

// js4lol.getChampionsBasic('na', true, function(error, body){
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getChampionBasic('na', 5, function(error, body){
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getFeaturedGames('na', function(error, body){
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getSummonerRecentGames('lan', 150062, function(error, body){
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getLeagueBySummId('lan', 150062, function(error, body){
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getLeagueEntryBySummId('lan', 150062, function(error, body){
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getGameTypeChallengerLeague('lan', 'RANKED_SOLO_5x5', function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })


// js4lol.getGameTypeMasterLeague('lan', 'RANKED_SOLO_5x5', function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })



// js4lol.getStatusByRegion('lan', function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })
// 								true||false
// js4lol.getMatchById('lan', 166312028, false, function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })

// Js4LoL.prototype. = function(region, summonerId, championIds, rankedQueues, beginIndex, endIndex, callback)

// js4lol.getSummonerMatchHistory('lan', 150062, '10', 'RANKED_SOLO_5x5,RANKED_TEAM_5x5', null, null, function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })

// js4lol.getSummonerRankedStats('lan', 150062, function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// }, 'SEASON2014');

// js4lol.getSummonerStats('lan', 150062, function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// }, 'SEASON2014');

// js4lol.getSummonerByName('lan', 'MicroIce', function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getSummonerById('lan', 61509, function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getSummonerMasteries('lan', 61509, function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getSummonerName('lan', 61509, function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getSummonerRunes('lan', 61509, function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getSummonerTeams('lan', 61509, function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getTeamById('lan', 'TEAM-d17bcd60-8772-11e3-9087-d4ae528a458b', function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// var t = 'lan';
// console.log(js4lol.observerPlatformByRegion[t]);

// js4lol.getCurrentGame('lan', 5660153, function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getChampionsData('lan', 'en_US', 'all', function(error, body){
// 		if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getChampionDataById('lan', 5, 'es_MX', 'all', function(error, body){
// 		if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getItemsData('lan', 'es_MX', 'stats', function(error, body){
// 		if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getItemStaticDataById('lan', 3800, 'es_MX', 'stats', function(error, body){
// 		if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getMapsData('lan', 'es_MX', function(error, body){
// 		if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getMasteriesData('lan', 'es_MX', 'all', function(error, body){
// 		if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getMasteryDataById('lan', 4353, 'es_MX', 'all', function(error, body){
// 		if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getRunesData('lan', 'es_MX', 'all', function(error, body){
// 		if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getRuneDataById('lan', 5374, 'es_MX', 'all', function(error, body){
// 		if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

// js4lol.getSummonerSpellsData('lan', 'es_MX', 'all', function(error, body){
// 		if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// });

js4lol.getSummonerSpellById('lan', 4, 'es_MX', 'all', function(error, body){
		if (body)
		console.log(body);
	else
		console.log(error);
});