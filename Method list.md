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
```

######Get basic information of all champions
```node
js4lol.getChampionsBasic(region, freeToPlay[true|false], callback);

```

######Get a champion's basic information by it's id
```node 
js4lol.getChampionBasic(region, championId, callback);

```

######Get a list of current featured games in a region
```node 
js4lol.getFeaturedGames(region, callback);

```

######Get a list of a summoner's recent games
```node
js4lol.getSummonerRecentGames('lan', 150062, callback);

```

######Get a list of leagues by summoner id
```node 
js4lol.getLeagueBySummId(region, summonerId, callback);

```

######Get a list of league entries by summoner id
```node 
js4lol.getLeagueEntryBySummId(region, summonerId, callback);

```

######Get a list of leagues by team id
```node 
js4lol.getLeagueByTeamId(region, teamId, callback);

```

######Get a list league entries by team id
```node 
js4lol.getLeagueEntryByTeamId(region, teamId, callback);

```

######Get the challenger league of the given region and game queue type
```node 
js4lol.getGameTypeChallengerLeague(region, gameQueueType[ie. RANKED_SOLO_5x5], callback);

```

######Get the master league of the given region and game queue type
```node 
js4lol.getGameTypeMasterLeague(region, gameQueueType[ie. RANKED_SOLO_5x5], callback);

```

######Get the static data of all champions
```node 
js4lol.getChampionsData('lan', callback);

```

######Get a champion's static data by it's id
```node 
js4lol.getChampionDataById(region, championId, callback);

```

######Get the data of all the items
```node 
js4lol.getItemsData(region, callback);

```

######Get item data by it's id
```node 
js4lol.getItemStaticDataById(region, itemId, callback);

```

######Get maps data
```node 
js4lol.getMapsData(region, callback);

```

######Get the data of all the masteries
```node
js4lol.getMasteriesData(region, callback);

```
######Get mastery data by it's id
```node
js4lol.getMasteryDataById (region, masteryId, callback);

```
#####Dragon static data
######Get realm by id
```node
js4lol.getRealmByRegion(region, callback);

```

######Get runes data
```node
js4lol.getRunesData(region, callback);

```

######Get rune data by it's id
```node
js4lol.getRuneDataById(region, runeId, callback);

```

######Get summoner spells data
```node
js4lol.getSummonerSpellsData(region, callback);

```

######Get summoner spell data by it's id
```node 
js4lol.getSummonerSpellById(region, spellId, callback);

```

#####Status
######Get status by region
```node
js4lol.getStatusByRegion(region, callback);

```

######Matches
######Get match by id
```node 
js4lol.getMatchById(region, matchId, includeTimeline[true|false], callback);

```
######Get match history by summoner id
```node
js4lol.getSummonerMatchHistory(region, summonerId, [championIds|null], [rankedQueues|null], [beginIndex|null],[endIndex|null, callback);

```

#####Stats
######Get summoner ranked stats
```node
js4lol.getSummonerRankedStats(region, summonerId, callback, season);

```

######Get summoner stats
```node 
js4lol.getSummonerStats(region, summonerId, callback, season);

```

#####Summoner
######Get summoner by name
```node
js4lol.getSummonerByName(region, summonerNames, callback);

```

######Get summoner by id
```node
js4lol.getSummonerById(region, summonerIds, callback);

```

######Get summoner masteries
```node
js4lol.getSummonerMasteries(region, summonerIds, callback);

```

######Get summoner name
```node
js4lol.getSummonerName(region, summonerIds, callback);

```

######Get summoner runes
```node
js4lol.getSummonerRunes(region, summonerIds, callback);

```

#####Teams
######Get summoner teams
```node
js4lol.getSummonerTeams(region, summonerIds, callback);

```

######Get team by id
```node
js4lol.getTeamById(region, teamIds, callback);

```
