import time
import csv
from email import header
import json
from types import SimpleNamespace
from unittest import result
from urllib import response
from xml.etree.ElementTree import tostring
from nba_api.stats.endpoints import assistleaders, assisttracker, leaguegamelog, shotchartdetail, alltimeleadersgrids, boxscoreadvancedv2, playergamelog
from nba_api.stats.library.parameters import LeagueID, PerModeSimple, PlayerOrTeam, Season, SeasonType
from nba_api.stats.library.parameters import ConferenceNullable, DivisionSimpleNullable, GameScopeSimpleNullable, LastNGamesNullable, LeagueIDNullable, LocationNullable, MonthNullable, OutcomeNullable, PerModeSimpleNullable, PlayerExperienceNullable, PlayerPositionAbbreviationNullable, SeasonNullable, SeasonSegmentNullable, SeasonTypeAllStarNullable, StarterBenchNullable, DivisionNullable
from nba_api.stats.library.parameters import EndPeriod, EndRange, RangeType, StartPeriod, StartRange
from nba_api.stats.library.parameters import Direction, LeagueID, PlayerOrTeamAbbreviation, Season, SeasonTypeAllStar, Sorter


from nba_api.stats.library.parameters import SeasonAll
import json
from nba_api.stats.static import players
player_dict = players.get_players()

def allassists():
	response = assistleaders.AssistLeaders(
		league_id=LeagueID.default,
        per_mode_simple=PerModeSimple.default,
        player_or_team=PlayerOrTeam.default,
        season=Season.default,
        season_type_playoffs=SeasonType.default,
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True
	)

	content = json.loads(response.get_json())
	jsonContent = json.dumps(content)
	with open("alltimeassists.json", "w") as outfile:
	    outfile.write(jsonContent)

def assiststracker():
	response = assisttracker.AssistTracker(
        college_nullable='',
        conference_nullable=ConferenceNullable.default,
        country_nullable='',
        date_from_nullable='',
        date_to_nullable='',
        division_simple_nullable=DivisionSimpleNullable.default,
        draft_pick_nullable='',
        draft_year_nullable='',
        game_scope_simple_nullable=GameScopeSimpleNullable.default,
        height_nullable='',
        last_n_games_nullable=LastNGamesNullable.default,
        league_id_nullable=LeagueIDNullable.default,
        location_nullable=LocationNullable.default,
        month_nullable=MonthNullable.default,
        opponent_team_id_nullable='',
        outcome_nullable=OutcomeNullable.default,
        po_round_nullable='',
        per_mode_simple_nullable=PerModeSimpleNullable.default,
        player_experience_nullable=PlayerExperienceNullable.default,
        player_position_abbreviation_nullable=PlayerPositionAbbreviationNullable.default,
        season_nullable=SeasonNullable.default,
        season_segment_nullable=SeasonSegmentNullable.default,
        season_type_all_star_nullable=SeasonTypeAllStarNullable.default,
        starter_bench_nullable=StarterBenchNullable.default,
        team_id_nullable='',
        vs_conference_nullable=ConferenceNullable.default,
        vs_division_nullable=DivisionNullable.default,
        weight_nullable='',
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True
	)

	content = json.loads(response.get_json())
	jsonContent = json.dumps(content)
	with open("assisttracker.json", "w") as outfile:
	    outfile.write(jsonContent)


def readLeagueGames():
	f = open('leaguegames2015-2016.json')
	# returns JSON object as 
	# a dictionary
	games = json.load(f)
	# Iterating through the json
	# list
	idList = []
	for i in range (0, len(games["resultSets"][0]["rowSet"])):
		time.sleep(1)
		print(len(games["resultSets"][0]["rowSet"]))
		print(games["resultSets"][0]["rowSet"][i])
		if games["resultSets"][0]["rowSet"][i][4] in idList:
			continue
		idList.append(games["resultSets"][0]["rowSet"][i][4])
		boxscoreadvanced(games["resultSets"][0]["rowSet"][i][4])
	# Closing file
	f.close()

def boxscoreadvanced(gameId):

	response = boxscoreadvancedv2.BoxScoreAdvancedV2(
		game_id=gameId,
		end_period=EndPeriod.default,
		end_range=EndRange.default,
		range_type=RangeType.default,
		start_period=StartPeriod.default,
		start_range=StartRange.default,
		proxy=None,
		headers=None,
		timeout=30,
		get_request=True
	)
	content = json.loads(response.get_json())
	jsonContent = json.dumps(content)
	boxData = json.loads(jsonContent, object_hook=lambda d: SimpleNamespace(**d))
	print(boxData.resultSets[0].headers)
	header = boxData.resultSets[0].headers
	with open('countries.csv', 'w', encoding='UTF8', newline='') as f:
		writer = csv.writer(f)
		writer.writerow(header)
		writer.writerows(boxData.resultSets[0].rowSet)

def alltimers():
	response = alltimeleadersgrids.AllTimeLeadersGrids(
        league_id=LeagueID.default,
        per_mode_simple=PerModeSimple.default,
        season_type=SeasonType.default,
        topx=20,
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True
	)

	content = json.loads(response.get_json())
	jsonContent = json.dumps(content)
	with open("alltimeleadersgrids2.json", "w") as outfile:
	    outfile.write(jsonContent)

def shotchartdetailfunction():
	response = shotchartdetail.ShotChartDetail(
		team_id=0,
		player_id=0,
		context_measure_simple='FGA',
		season_nullable='2020-21',
		season_type_all_star='Regular Season'
	)

	content = json.loads(response.get_json())
	jsonContent = json.dumps(content)
	with open("2020-2021.json", "w") as outfile:
	    outfile.write(jsonContent)

def playergamelogfunction(playerId, season):
	print('helllllooooo??????????')
	response = playergamelog.PlayerGameLog(player_id=playerId, season=season)
	content = json.loads(response.get_json())
	jsonContent = json.dumps(content)
	with open("games.json", "w") as outfile:
		outfile.write(jsonContent)

def writeNBAplayers():
	seasons = ['2015', '2016', '2017', '2018', '2019', '2020', '2021']
	list = []
	for player in player_dict:
		print(player)
		jsonContent = json.dumps(player)
		list.append(jsonContent)
		jsonList = json.dumps(list)
	with open("playersNBA.json", "w") as outfile:
		outfile.write(jsonList)

def leaguegames():
	response = leaguegamelog.LeagueGameLog(
		counter=0,
        direction=Direction.default,
        league_id=LeagueID.default,
        player_or_team_abbreviation=PlayerOrTeamAbbreviation.default,
        season="2015-16",
        season_type_all_star=SeasonTypeAllStar.default,
        sorter=Sorter.default,
        date_from_nullable='',
        date_to_nullable='',
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True
	)

	content = json.loads(response.get_json())
	jsonContent = json.dumps(content)
	with open("leaguegames2015-2016.json", "w") as outfile:
	    outfile.write(jsonContent)
##shotchartdetailfunction()
##allassists()
##assiststracker()
##playergamelogfunction('153', '0021700807')
##leaguegames()
readLeagueGames()