var Js4LoL = require('./main.js');

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

// js4lol.getGameTypeChallengerLeague('lan', js4lol.gameTypes.RANKED_SOLO_5x5, function(error, body) {
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

// js4lol.getChampionsStaticData('lan', function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })

// js4lol.getChampionStaticData('lan', 5,function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })

// js4lol.getAllItemsStaticData('lan', function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })

// js4lol.getItemStaticData('lan', 3800, function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })

// js4lol.getMapsStaticData('lan', function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })

// js4lol.getMasteriesData('na', function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })

// js4lol.getMasteryDataById('na', 4341, function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })

// js4lol.getRealmByRegion('na', function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })

// js4lol.getRunesData('lan', function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })

// js4lol.getRuneDataById('lan', 8035, function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })

// js4lol.getSummonerSpellsData('lan', function(error, body) {
// 	if (body)
// 		console.log(body);
// 	else
// 		console.log(error);
// })

// js4lol.getSummonerSpellById('lan', 4, function(error, body) {
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
								//true||false
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