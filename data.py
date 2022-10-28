import time
import csv
from email import header
import json
from types import SimpleNamespace
from unittest import result
from urllib import response
from xml.etree.ElementTree import tostring
from nba_api.stats.endpoints import commonallplayers, boxscoreusagev2, boxscoresummaryv2, boxscoresimilarityscore, boxscorescoringv2, boxscoreplayertrackv2, boxscoremiscv2, boxscorematchups, boxscorefourfactorsv2, boxscoredefensive, playercareerstats, leaguedashplayerstats, boxscoretraditionalv2, leaguedashplayershotlocations, leaguedashplayerptshot, leaguedashplayerclutch, assistleaders, assisttracker, leaguegamelog, leaguehustlestatsplayer, leaguehustlestatsplayerleaders, leaguedashlineups, leaguedashoppptshot, shotchartdetail, alltimeleadersgrids, boxscoreadvancedv2, playergamelog
from nba_api.stats.library.parameters import LeagueID, PerModeSimple, PlayerOrTeam, Season, SeasonType
from nba_api.stats.library.parameters import ConferenceNullable, DivisionSimpleNullable, GameScopeSimpleNullable, LastNGamesNullable, LeagueIDNullable, LocationNullable, MonthNullable, OutcomeNullable, PerModeSimpleNullable, PlayerExperienceNullable, PlayerPositionAbbreviationNullable, SeasonNullable, SeasonSegmentNullable, SeasonTypeAllStarNullable, StarterBenchNullable, DivisionNullable
from nba_api.stats.library.parameters import EndPeriod, EndRange, RangeType, StartPeriod, StartRange
from nba_api.stats.library.parameters import Direction, LeagueID, PlayerOrTeamAbbreviation, Season, SeasonTypeAllStar, Sorter
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.library.parameters import PerModeTime, Season, SeasonTypeAllStar, ConferenceNullable, DivisionSimpleNullable, LeagueIDNullable, LocationNullable, MonthNullable, OutcomeNullable, PlayerExperienceNullable, PlayerPositionNullable, SeasonSegmentNullable, DivisionNullable
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.library.parameters import PerModeTime, Season, SeasonTypeAllStar, ConferenceNullable, DivisionSimpleNullable, LeagueIDNullable, LocationNullable, MonthNullable, OutcomeNullable, PlayerExperienceNullable, PlayerPositionNullable, SeasonSegmentNullable, DivisionNullable
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.library.parameters import GroupQuantity, LastNGames, MeasureTypeDetailedDefense, Month, PaceAdjust, PerModeDetailed, Period, PlusMinus, Rank, Season, SeasonTypeAllStar, ConferenceNullable, DivisionSimpleNullable, GameSegmentNullable, LeagueIDNullable, LocationNullable, OutcomeNullable, SeasonSegmentNullable, ShotClockRangeNullable, DivisionNullable
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.library.parameters import LeagueID, PerModeSimple, Season, SeasonTypeAllStar, ConferenceNullable, DivisionNullable, GameSegmentNullable, LastNGamesNullable, LocationNullable, MonthNullable, OutcomeNullable, PeriodNullable, SeasonSegmentNullable, ShotClockRangeNullable
from nba_api.stats.library.parameters import SeasonAll
import json
from nba_api.stats.static import players
import psycopg2
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.library.parameters import AheadBehind, ClutchTime, LastNGames, MeasureTypeDetailedDefense, Month, PaceAdjust, PerModeDetailed, Period, PlusMinus, PointDiff, Rank, Season, SeasonTypeAllStar, ConferenceNullable, DivisionSimpleNullable, GameScopeSimpleNullable, GameSegmentNullable, LeagueIDNullable, LocationNullable, OutcomeNullable, PlayerExperienceNullable, PlayerPositionAbbreviationNullable, SeasonSegmentNullable, ShotClockRangeNullable, StarterBenchNullable, DivisionNullable
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.library.parameters import LeagueID, PerModeSimple, Season, SeasonTypeAllStar, ConferenceNullable, DivisionNullable, GameSegmentNullable, LastNGamesNullable, LocationNullable, MonthNullable, OutcomeNullable, PeriodNullable, PlayerExperienceNullable, PlayerPositionNullable, SeasonSegmentNullable, ShotClockRangeNullable, StarterBenchNullable
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.library.parameters import DistanceRange, LastNGames, MeasureTypeSimple, Month, PaceAdjust, PerModeDetailed, Period, PlusMinus, Rank, Season, SeasonTypeAllStar, ConferenceNullable, DivisionSimpleNullable, GameScopeSimpleNullable, GameSegmentNullable, LeagueIDNullable, LocationNullable, OutcomeNullable, PlayerExperienceNullable, PlayerPositionAbbreviationNullable, SeasonSegmentNullable, ShotClockRangeNullable, StarterBenchNullable, DivisionNullable
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.library.parameters import DistanceRange, LastNGames, MeasureTypeSimple, Month, PaceAdjust, PerModeDetailed, Period, PlusMinus, Rank, Season, SeasonTypeAllStar, ConferenceNullable, DivisionSimpleNullable, GameScopeSimpleNullable, GameSegmentNullable, LeagueIDNullable, LocationNullable, OutcomeNullable, PlayerExperienceNullable, PlayerPositionAbbreviationNullable, SeasonSegmentNullable, ShotClockRangeNullable, StarterBenchNullable, DivisionNullable
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.library.parameters import EndPeriod, EndRange, RangeType, StartPeriod, StartRange
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.library.parameters import LastNGames, MeasureTypeDetailedDefense, Month, PaceAdjust, PerModeDetailed, Period, PlusMinus, Rank, Season, SeasonTypeAllStar, ConferenceNullable, DivisionSimpleNullable, GameScopeSimpleNullable, GameSegmentNullable, LeagueIDNullable, LocationNullable, OutcomeNullable, PlayerExperienceNullable, PlayerPositionAbbreviationNullable, SeasonSegmentNullable, ShotClockRangeNullable, StarterBenchNullable, DivisionNullable
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.library.parameters import PerMode36, LeagueIDNullable
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.library.parameters import EndPeriod, EndRange, RangeType, StartPeriod, StartRange
from nba_api.stats.endpoints._base import Endpoint
from nba_api.stats.library.http import NBAStatsHTTP
from nba_api.stats.library.parameters import LeagueID, SeasonYear, SeasonType

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
	with open("assiststacker.json", "w") as outfile:
	    outfile.write(jsonContent)

boxScoreArray = []
def readLeagueGames():
	f = open('leaguegames2022-2023.json')
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
		box = boxscoreadvanced(games["resultSets"][0]["rowSet"][i][4])
		boxScoreArray.append(box)
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
	try:
		with open('boxscores2018-2019.csv', 'a', encoding='UTF8', newline='') as f:
			writer = csv.writer(f)
			writer.writerow(header)
			writer.writerows(boxData.resultSets[0].rowSet)
			f.close()
	except ValueError:
		print("VALUE ERROR?!?!?!!?!!??!?!??!??!?!!?")

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
        season='2022-23',
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
	with open("leaguegames2022-2023.json", "w") as outfile:
	    outfile.write(jsonContent)

def leaguehustlestats():
	response = leaguehustlestatsplayer.LeagueHustleStatsPlayer(
		per_mode_time=PerModeTime.default,
        season="2020-21",
        season_type_all_star=SeasonTypeAllStar.default,
        college_nullable='',
        conference_nullable=ConferenceNullable.default,
        country_nullable='',
        date_from_nullable='',
        date_to_nullable='',
        division_simple_nullable=DivisionSimpleNullable.default,
        draft_pick_nullable='',
        draft_year_nullable='',
        height_nullable='',
        league_id_nullable=LeagueIDNullable.default,
        location_nullable=LocationNullable.default,
        month_nullable=MonthNullable.default,
        opponent_team_id_nullable='',
        outcome_nullable=OutcomeNullable.default,
        po_round_nullable='',
        player_experience_nullable=PlayerExperienceNullable.default,
        player_position_nullable=PlayerPositionNullable.default,
        season_segment_nullable=SeasonSegmentNullable.default,
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
	print(response)
	print(Season.default)
	with open("leaguehustlestatsplayer2020-2021", "w") as outfile:
	    outfile.write(jsonContent)



def leaguehustlestatsleaders():
	response = leaguehustlestatsplayerleaders.LeagueHustleStatsPlayerLeaders(
 		per_mode_time=PerModeTime.default,
        season='2021-22',
        season_type_all_star=SeasonTypeAllStar.default,
        college_nullable='',
        conference_nullable=ConferenceNullable.default,
        country_nullable='',
        date_from_nullable='',
        date_to_nullable='',
        division_simple_nullable=DivisionSimpleNullable.default,
        draft_pick_nullable='',
        draft_year_nullable='',
        height_nullable='',
        league_id_nullable=LeagueIDNullable.default,
        location_nullable=LocationNullable.default,
        month_nullable=MonthNullable.default,
        opponent_team_id_nullable='',
        outcome_nullable=OutcomeNullable.default,
        po_round_nullable='',
        player_experience_nullable=PlayerExperienceNullable.default,
        player_position_nullable=PlayerPositionNullable.default,
        season_segment_nullable=SeasonSegmentNullable.default,
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
	print(response)
	print(Season.default)
	with open("leaguehustlestatsplayerleaders2021-2022", "w") as outfile:
	    outfile.write(jsonContent)

def leaguedashlineupsfunction():
	response = leaguedashlineups.LeagueDashLineups(
		group_quantity=GroupQuantity.default,
        last_n_games=LastNGames.default,
        measure_type_detailed_defense=MeasureTypeDetailedDefense.default,
        month=Month.default,
        opponent_team_id=0,
        pace_adjust=PaceAdjust.default,
        per_mode_detailed=PerModeDetailed.default,
        period=Period.default,
        plus_minus=PlusMinus.default,
        rank=Rank.default,
        season='2015-16',
        season_type_all_star=SeasonTypeAllStar.default,
        conference_nullable=ConferenceNullable.default,
        date_from_nullable='',
        date_to_nullable='',
        division_simple_nullable=DivisionSimpleNullable.default,
        game_segment_nullable=GameSegmentNullable.default,
        league_id_nullable=LeagueIDNullable.default,
        location_nullable=LocationNullable.default,
        outcome_nullable=OutcomeNullable.default,
        po_round_nullable='',
        season_segment_nullable=SeasonSegmentNullable.default,
        shot_clock_range_nullable=ShotClockRangeNullable.default,
        team_id_nullable='',
        vs_conference_nullable=ConferenceNullable.default,
        vs_division_nullable=DivisionNullable.default,
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True
	)
	content = json.loads(response.get_json())
	jsonContent = json.dumps(content)
	with open("leaguedashlineups2015-2016.json", "w") as outfile:
	    outfile.write(jsonContent)

def leaguedashoppptshotfunction():
	response = leaguedashoppptshot.LeagueDashOppPtShot(
        league_id=LeagueID.default,
        per_mode_simple=PerModeSimple.default,
        season='2021-22',
        season_type_all_star=SeasonTypeAllStar.default,
        close_def_dist_range_nullable='',
        conference_nullable=ConferenceNullable.default,
        date_from_nullable='',
        date_to_nullable='',
        division_nullable=DivisionNullable.default,
        dribble_range_nullable='',
        game_segment_nullable=GameSegmentNullable.default,
        general_range_nullable='',
        last_n_games_nullable=LastNGamesNullable.default,
        location_nullable=LocationNullable.default,
        month_nullable=MonthNullable.default,
        opponent_team_id_nullable='',
        outcome_nullable=OutcomeNullable.default,
        po_round_nullable='',
        period_nullable=PeriodNullable.default,
        season_segment_nullable=SeasonSegmentNullable.default,
        shot_clock_range_nullable=ShotClockRangeNullable.default,
        shot_dist_range_nullable='',
        team_id_nullable='',
        touch_time_range_nullable='',
        vs_conference_nullable=ConferenceNullable.default,
        vs_division_nullable=DivisionNullable.default,
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True
    )
   
	content = json.loads(response.get_json())
	jsonContent = json.dumps(content)
	print(response)
	print(Season.default)
	with open("leaguedashoppptshot2021-2022.json", "w") as outfile:
	    outfile.write(jsonContent)

def write():    
    #establishing the connection
    conn = psycopg2.connect(
       database="NBAstatistics", user='petejackerson', password='redsox45', host='localhost', port= '5432'
    )

    #Setting auto commit false
    conn.autocommit = True

    #Creating a cursor object using the cursor() method
    cursor = conn.cursor()

    #Retrieving data
    cursor.execute('''SELECT * from "hustleFactor"''')

    response = cursor.fetchall()
   
    content = json.dumps(response)
    jsonContent = json.loads(content)
    jsonResult = json.dumps(jsonContent)

    with open("hustleFactor.json", "w") as outfile:
        outfile.write(jsonResult)
    conn.close()

def leaguedashplayerclutchfunction():
	response = leaguedashplayerclutch.LeagueDashPlayerClutch(
        ahead_behind=AheadBehind.default,
        clutch_time=ClutchTime.default,
        last_n_games=LastNGames.default,
        measure_type_detailed_defense=MeasureTypeDetailedDefense.default,
        month=Month.default,
        opponent_team_id=0,
        pace_adjust=PaceAdjust.default,
        per_mode_detailed=PerModeDetailed.default,
        period=Period.default,
        plus_minus=PlusMinus.default,
        point_diff=PointDiff.default,
        rank=Rank.default,
        season="2020-21",
        season_type_all_star=SeasonTypeAllStar.default,
        college_nullable='',
        conference_nullable=ConferenceNullable.default,
        country_nullable='',
        date_from_nullable='',
        date_to_nullable='',
        division_simple_nullable=DivisionSimpleNullable.default,
        draft_pick_nullable='',
        draft_year_nullable='',
        game_scope_simple_nullable=GameScopeSimpleNullable.default,
        game_segment_nullable=GameSegmentNullable.default,
        height_nullable='',
        league_id_nullable=LeagueIDNullable.default,
        location_nullable=LocationNullable.default,
        outcome_nullable=OutcomeNullable.default,
        po_round_nullable='',
        player_experience_nullable=PlayerExperienceNullable.default,
        player_position_abbreviation_nullable=PlayerPositionAbbreviationNullable.default,
        season_segment_nullable=SeasonSegmentNullable.default,
        shot_clock_range_nullable=ShotClockRangeNullable.default,
        starter_bench_nullable=StarterBenchNullable.default,
        team_id_nullable='',
        vs_conference_nullable=ConferenceNullable.default,
        vs_division_nullable=DivisionNullable.default,
        weight_nullable='',
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True,
    )
	content = json.loads(response.get_json())
	jsonContent = json.dumps(content)
	with open("leaguedashplayerclutch2021-2022.json", "w") as outfile:
	    outfile.write(jsonContent)

def leaguedashplayerptshotfunction():
	response = leaguedashplayerptshot.LeagueDashPlayerPtShot(
        league_id=LeagueID.default,
        per_mode_simple=PerModeSimple.default,
        season="2015-16",
        season_type_all_star=SeasonTypeAllStar.default,
        close_def_dist_range_nullable='',
        college_nullable='',
        conference_nullable=ConferenceNullable.default,
        country_nullable='',
        date_from_nullable='',
        date_to_nullable='',
        division_nullable=DivisionNullable.default,
        draft_pick_nullable='',
        draft_year_nullable='',
        dribble_range_nullable='',
        game_segment_nullable=GameSegmentNullable.default,
        general_range_nullable='',
        height_nullable='',
        last_n_games_nullable=LastNGamesNullable.default,
        location_nullable=LocationNullable.default,
        month_nullable=MonthNullable.default,
        opponent_team_id_nullable='',
        outcome_nullable=OutcomeNullable.default,
        po_round_nullable='',
        period_nullable=PeriodNullable.default,
        player_experience_nullable=PlayerExperienceNullable.default,
        player_position_nullable=PlayerPositionNullable.default,
        season_segment_nullable=SeasonSegmentNullable.default,
        shot_clock_range_nullable=ShotClockRangeNullable.default,
        shot_dist_range_nullable='',
        starter_bench_nullable=StarterBenchNullable.default,
        team_id_nullable='',
        touch_time_range_nullable='',
        vs_conference_nullable=ConferenceNullable.default,
        vs_division_nullable=DivisionNullable.default,
        weight_nullable='',
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True,
    )
	content = json.loads(response.get_json())
	jsonContent = json.dumps(content)
	with open("leaguedashplayerptshot2015-2016.json", "w") as outfile:
	    outfile.write(jsonContent)


def leaguedashplayershotlocationsfunction():
	response = leaguedashplayershotlocations.LeagueDashPlayerShotLocations(
        distance_range=DistanceRange.default,
        last_n_games=LastNGames.default,
        measure_type_simple=MeasureTypeSimple.default,
        month=Month.default,
        opponent_team_id=0,
        pace_adjust=PaceAdjust.default,
        per_mode_detailed=PerModeDetailed.default,
        period=Period.default,
        plus_minus=PlusMinus.default,
        rank=Rank.default,
        season="2015-16",
        season_type_all_star=SeasonTypeAllStar.default,
        college_nullable='',
        conference_nullable=ConferenceNullable.default,
        country_nullable='',
        date_from_nullable='',
        date_to_nullable='',
        division_simple_nullable=DivisionSimpleNullable.default,
        draft_pick_nullable='',
        draft_year_nullable='',
        game_scope_simple_nullable=GameScopeSimpleNullable.default,
        game_segment_nullable=GameSegmentNullable.default,
        height_nullable='',
        league_id_nullable=LeagueIDNullable.default,
        location_nullable=LocationNullable.default,
        outcome_nullable=OutcomeNullable.default,
        po_round_nullable='',
        player_experience_nullable=PlayerExperienceNullable.default,
        player_position_abbreviation_nullable=PlayerPositionAbbreviationNullable.default,
        season_segment_nullable=SeasonSegmentNullable.default,
        shot_clock_range_nullable=ShotClockRangeNullable.default,
        starter_bench_nullable=StarterBenchNullable.default,
        team_id_nullable='',
        vs_conference_nullable=ConferenceNullable.default,
        vs_division_nullable=DivisionNullable.default,
        weight_nullable='',
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True,
    )
	content = json.loads(response.get_json())
	jsonContent = json.dumps(content)
	with open("leaguedashplayershotlocations2015-2016.json", "w") as outfile:
	    outfile.write(jsonContent)


boxScoreArrayTraditional = []
def readLeagueGamesTraditional():
    f = open('leaguegames2022-2023.json')
    games = json.load(f)
    idList = []
    for i in range (0, len(games["resultSets"][0]["rowSet"])):
        time.sleep(1)
        print(len(games["resultSets"][0]["rowSet"]))
        print(games["resultSets"][0]["rowSet"][i])
        if games["resultSets"][0]["rowSet"][i][4] in idList or games["resultSets"][0]["rowSet"][i][4] is None:
            print(games["resultSets"][0]["rowSet"][i][4])
            continue
        idList.append(games["resultSets"][0]["rowSet"][i][4])
        print(games["resultSets"][0]["rowSet"][i][4])
        box = boxScoreTraditional(games["resultSets"][0]["rowSet"][i][4])
        boxScoreArrayTraditional.append(box)
    # Closing file
    f.close()


def boxScoreTraditional(gameId):
    response = boxscoretraditionalv2.BoxScoreTraditionalV2(
        game_id = gameId,
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
    try:
        with open('boxscorestraditional2022-2023.csv', 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(boxData.resultSets[0].rowSet)
            f.close()
    except ValueError:
        print("VALUE ERROR?!?!?!!?!!??!?!??!??!?!!?")

def leagueDashPlayerStatsFunction():
    response = leaguedashplayerstats.LeagueDashPlayerStats(
        last_n_games=LastNGames.default,
        measure_type_detailed_defense=MeasureTypeDetailedDefense.default,
        month=Month.default,
        opponent_team_id=0,
        pace_adjust=PaceAdjust.default,
        per_mode_detailed=PerModeDetailed.default,
        period=Period.default,
        plus_minus=PlusMinus.default,
        rank=Rank.default,
        season='2021-22',
        season_type_all_star=SeasonTypeAllStar.default,
        college_nullable='',
        conference_nullable=ConferenceNullable.default,
        country_nullable='',
        date_from_nullable='',
        date_to_nullable='',
        division_simple_nullable=DivisionSimpleNullable.default,
        draft_pick_nullable='',
        draft_year_nullable='',
        game_scope_simple_nullable=GameScopeSimpleNullable.default,
        game_segment_nullable=GameSegmentNullable.default,
        height_nullable='',
        league_id_nullable=LeagueIDNullable.default,
        location_nullable=LocationNullable.default,
        outcome_nullable=OutcomeNullable.default,
        po_round_nullable='',
        player_experience_nullable=PlayerExperienceNullable.default,
        player_position_abbreviation_nullable=PlayerPositionAbbreviationNullable.default,
        season_segment_nullable=SeasonSegmentNullable.default,
        shot_clock_range_nullable=ShotClockRangeNullable.default,
        starter_bench_nullable=StarterBenchNullable.default,
        team_id_nullable='',
        two_way_nullable='',
        vs_conference_nullable=ConferenceNullable.default,
        vs_division_nullable=DivisionNullable.default,
        weight_nullable='',
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True
    )
    print(response)
    
    content = json.loads(response.get_json())
    jsonContent = json.dumps(content)
    print(jsonContent)
    with open("leaguedashplayerstats2021-2022.json", "w") as outfile:
	    outfile.write(jsonContent)

def getPlayerIds():
    f = open('playersNBA.json')
    players = json.load(f)

    for i in range(0, len(players)):
        playerid = str(players[i][5])
        playerCareerStatsFunction(playerid)

    f.close()

def playerCareerStatsFunction(playerid):
    print(playerid)
    response = playercareerstats.PlayerCareerStats(
        player_id = playerid,
        per_mode36=PerMode36.default,
        league_id_nullable=LeagueIDNullable.default,
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True
    )
    content = json.loads(response.get_json())
    jsonContent = json.dumps(content)
    careerData = json.loads(jsonContent, object_hook=lambda d: SimpleNamespace(**d))
    print('BREAKKKKKKKKKKKKKKKKKK')

    header = careerData.resultSets[0].headers
    try:
        with open('seasonregularplayerstats.csv', 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(careerData.resultSets[0].rowSet)
            f.close()
    except ValueError:
        print("VALUE ERROR?!?!?!!?!!??!?!??!??!?!!?")


boxScoreArrayDefensive = []
def readLeagueGamesDefensive():
    f = open('leaguegames2015-2016.json')
    games = json.load(f)
    idList = []
    for i in range (0, len(games["resultSets"][0]["rowSet"])):
        time.sleep(1)
        print(len(games["resultSets"][0]["rowSet"]))
        print(games["resultSets"][0]["rowSet"][i])
        if games["resultSets"][0]["rowSet"][i][4] in idList or games["resultSets"][0]["rowSet"][i][4] is None:
            print(games["resultSets"][0]["rowSet"][i][4])
            continue
        idList.append(games["resultSets"][0]["rowSet"][i][4])
        print(games["resultSets"][0]["rowSet"][i][4])
        box = boxScoreDefensive(games["resultSets"][0]["rowSet"][i][4])
        boxScoreArrayDefensive.append(box)
    # Closing file
    f.close()

def boxScoreDefensive(gameid):
    print(gameid)
    print('boo')
    response = boxscoredefensive.BoxScoreDefensive(
        game_id='0021700807',
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True   
    )
    print(response)
    content = json.loads(response.get_json())
    jsonContent = json.dumps(content)
    boxScoreDefensiveData = json.loads(jsonContent, object_hook=lambda d: SimpleNamespace(**d))
    print('BREAKKKKKKKKKKKKKKKKKK')

    header = boxScoreDefensiveData.resultSets[0].headers
    try:
        with open('boxscoredefensive.csv', 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(boxScoreDefensiveData.resultSets[0].rowSet)
            f.close()
    except ValueError:
        print("VALUE ERROR?!?!?!!?!!??!?!??!??!?!!?")


boxScoreArrayFourFactors = []
def readLeagueFourFactors():
    f = open('leaguegames2021-2022.json')
    games = json.load(f)
    idList = []
    ##len(games["resultSets"][0]["rowSet"])
    for i in range (0, len(games["resultSets"][0]["rowSet"])):
        time.sleep(1)
        print(i)
        print(games["resultSets"][0]["rowSet"][i])
        if games["resultSets"][0]["rowSet"][i][4] in idList or games["resultSets"][0]["rowSet"][i][4] is None:
            print(games["resultSets"][0]["rowSet"][i][4])
            continue
        idList.append(games["resultSets"][0]["rowSet"][i][4])
        print(games["resultSets"][0]["rowSet"][i][4])
        box = boxScoreFourFactorsV2(games["resultSets"][0]["rowSet"][i][4])
        boxScoreArrayFourFactors.append(box)
    # Closing file
    f.close()


def boxScoreFourFactorsV2(gameid):
    response = boxscorefourfactorsv2.BoxScoreFourFactorsV2(
        game_id=gameid,
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
    boxScoreFourFactorsData = json.loads(jsonContent, object_hook=lambda d: SimpleNamespace(**d))
    header = boxScoreFourFactorsData.resultSets[1].headers
    try:
        with open('boxscorefourfactorsteams2021-2022.csv', 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(boxScoreFourFactorsData.resultSets[1].rowSet)
            f.close()
    except ValueError:
        print("VALUE ERROR?!?!?!!?!!??!?!??!??!?!!?")


boxScoreArrayMatchups = []
def readLeagueMatchups():
    f = open('leaguegames2015-2016.json')
    games = json.load(f)
    idList = []
    ##len(games["resultSets"][0]["rowSet"])
    for i in range (0, len(games["resultSets"][0]["rowSet"])):
        time.sleep(1)
        print(i)
        print(games["resultSets"][0]["rowSet"][i])
        if games["resultSets"][0]["rowSet"][i][4] in idList or games["resultSets"][0]["rowSet"][i][4] is None:
            print(games["resultSets"][0]["rowSet"][i][4])
            continue
        idList.append(games["resultSets"][0]["rowSet"][i][4])
        print(games["resultSets"][0]["rowSet"][i][4])
        box = boxScoreMatchupsFunction(games["resultSets"][0]["rowSet"][i][4])
        boxScoreArrayMatchups.append(box)
    # Closing file
    f.close()


def boxScoreMatchupsFunction(gameid):
    print(gameid)
    response = boxscorematchups.BoxScoreMatchups(
        game_id=gameid,
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True
    )
    print(response)
    
    content = json.loads(response.get_json())
    print(content)
    jsonContent = json.dumps(content)
    print(jsonContent)
    boxScoreMatchupsData = json.loads(jsonContent, object_hook=lambda d: SimpleNamespace(**d))
    header = boxScoreMatchupsData.resultSets[0].headers
    try:
        with open('boxscorematchups2015-2016.csv', 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(boxScoreMatchupsData.resultSets[0].rowSet)
            f.close()
    except ValueError:
        print("VALUE ERROR?!?!?!!?!!??!?!??!??!?!!?")
        
boxScoreArrayMisc = []
def readLeagueMisc():
    f = open('leaguegames2021-2022.json')
    games = json.load(f)
    idList = []
    ##len(games["resultSets"][0]["rowSet"])
    for i in range (0, len(games["resultSets"][0]["rowSet"])):
        time.sleep(1)
        print(i)
        print(games["resultSets"][0]["rowSet"][i])
        if games["resultSets"][0]["rowSet"][i][4] in idList or games["resultSets"][0]["rowSet"][i][4] is None:
            print(games["resultSets"][0]["rowSet"][i][4])
            continue
        idList.append(games["resultSets"][0]["rowSet"][i][4])
        print(games["resultSets"][0]["rowSet"][i][4])
        box = boxScoreMiscFunction(games["resultSets"][0]["rowSet"][i][4])
        boxScoreArrayMisc.append(box)
    # Closing file
    f.close()
def boxScoreMiscFunction(gameid):
    print(gameid)
    response = boxscoremiscv2.BoxScoreMiscV2(
        game_id=gameid,
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
    print(content)
    jsonContent = json.dumps(content)
    print(jsonContent)
    boxScoreMiscData = json.loads(jsonContent, object_hook=lambda d: SimpleNamespace(**d))
    header = boxScoreMiscData.resultSets[1].headers
    try:
        with open('boxscoremiscteams2021-2022.csv', 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(boxScoreMiscData.resultSets[1].rowSet)
            f.close()
    except ValueError:
        print("VALUE ERROR?!?!?!!?!!??!?!??!??!?!!?")






boxScoreArrayPlayerTracker = []
def readLeaguePlayerTracker():
    f = open('leaguegames2021-2022.json')
    games = json.load(f)
    idList = []
    ##len(games["resultSets"][0]["rowSet"])
    for i in range (0, len(games["resultSets"][0]["rowSet"])):
        time.sleep(1)
        print(i)
        print(games["resultSets"][0]["rowSet"][i])
        if games["resultSets"][0]["rowSet"][i][4] in idList or games["resultSets"][0]["rowSet"][i][4] is None:
            print(games["resultSets"][0]["rowSet"][i][4])
            continue
        idList.append(games["resultSets"][0]["rowSet"][i][4])
        print(games["resultSets"][0]["rowSet"][i][4])
        box = boxScorePlayerTrackerFunction(games["resultSets"][0]["rowSet"][i][4])
        boxScoreArrayPlayerTracker.append(box)
    # Closing file
    f.close()

def boxScorePlayerTrackerFunction(gameid):
    print(gameid)
    response = boxscoreplayertrackv2.BoxScorePlayerTrackV2(
        game_id=gameid,
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True
    )
    content = json.loads(response.get_json())
    print(content)
    jsonContent = json.dumps(content)
    print(jsonContent)
    boxScorePlayerTrackerData = json.loads(jsonContent, object_hook=lambda d: SimpleNamespace(**d))
    header = boxScorePlayerTrackerData.resultSets[0].headers
    try:
        with open('boxscoreplayertracker2021-2022.csv', 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(boxScorePlayerTrackerData.resultSets[0].rowSet)
            f.close()
    except ValueError:
        print("VALUE ERROR?!?!?!!?!!??!?!??!??!?!!?")



boxScoreArrayScoring = []
def readLeagueScoring():
    f = open('./juicystats/leaguegames2021-2022.json')
    games = json.load(f)
    idList = []
    ##len(games["resultSets"][0]["rowSet"])
    for i in range (0, 2):
        time.sleep(1)
        print(i)
        print(games["resultSets"][0]["rowSet"][i])
        if games["resultSets"][0]["rowSet"][i][4] in idList or games["resultSets"][0]["rowSet"][i][4] is None:
            print(games["resultSets"][0]["rowSet"][i][4])
            continue
        idList.append(games["resultSets"][0]["rowSet"][i][4])
        ##print(games["resultSets"][0]["rowSet"][i][4])
        box = boxScoreScoringFunction(games["resultSets"][0]["rowSet"][i][4])
        ##boxScoreArrayScoring.append(box)
    # Closing file
    f.close()

def boxScoreScoringFunction(gameid):
    print(gameid)
    response = boxscorescoringv2.BoxScoreScoringV2(
        game_id=gameid,
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
    print(content)
    jsonContent = json.dumps(content)
    print(jsonContent)
    boxScoreScoringData = json.loads(jsonContent, object_hook=lambda d: SimpleNamespace(**d))
    header = boxScoreScoringData.resultSets[1].headers
    try:
        with open('boxscorescoringteams2021-2022.csv', 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(boxScoreScoringData.resultSets[1].rowSet)
            f.close()
    except ValueError:
        print("VALUE ERROR?!?!?!!?!!??!?!??!??!?!!?")

boxScoreSimilarityScoreArray = []
def readLeagueSimilarityScore():
    f = open('./juicystats/playersNBA.json')
    players = json.load(f)
    idList = []
    ##len(games["resultSets"][0]["rowSet"])
    for i in range (0, 5):
        for j in range (0, 5):
            if players[i] == players[j]:
                continue
            
            ##time.sleep(1)
            print(i)
            print(j)
            print(players[i][0])
            print(players[j][0])
            box = boxScoreSimilarityScoreFunction(str(players[i][0]), str(players[j][0]))
            boxScoreSimilarityScoreArray.append(box)
    # Closing file
    f.close()

def boxScoreSimilarityScoreFunction():
    ##print(player1_id)
    ##print(player2_id)
    response = boxscoresimilarityscore.BoxScoreSimilarityScore(
        person2_id='203991',
        person1_id='203935',
        person1_league_id=LeagueID.default,
        person1_season_year='2021',
        person1_season_type=SeasonType.default,
        person2_league_id=LeagueID.default,
        person2_season_year='2021',
        person2_season_type=SeasonType.default,
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True
    )
    content = json.loads(response.get_json())
    print(content)
    jsonContent = json.dumps(content)
    print(jsonContent)
    boxScoreSimilarityScoreData = json.loads(jsonContent, object_hook=lambda d: SimpleNamespace(**d))
    header = boxScoreSimilarityScoreData.resultSets[0].headers
    try:
        with open('boxscoresimilarityscore2015-2016.csv', 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(boxScoreSimilarityScoreData.resultSets[0].rowSet)
            f.close()
    except ValueError:
        print("VALUE ERROR?!?!?!!?!!??!?!??!??!?!!?")


boxScoreArraySummary = []
def readLeagueSummary():
    f = open('./juicystats/leaguegames2018-2019.json')
    games = json.load(f)
    idList = []
    ##len(games["resultSets"][0]["rowSet"])
    for i in range (0, len(games["resultSets"][0]["rowSet"])):
        time.sleep(1)
        print(i)
        if games["resultSets"][0]["rowSet"][i][4] in idList or games["resultSets"][0]["rowSet"][i][4] is None:
            print(games["resultSets"][0]["rowSet"][i][4])
            continue
        idList.append(games["resultSets"][0]["rowSet"][i][4])
        print(games["resultSets"][0]["rowSet"][i][4])
        box = boxScoreSummaryFunction(games["resultSets"][0]["rowSet"][i][4])
        boxScoreArraySummary.append(box)
    # Closing file
    f.close()

def boxScoreSummaryFunction(gameid):
    print(gameid)
    response = boxscoresummaryv2.BoxScoreSummaryV2(
        game_id=gameid,
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True
    )
    content = json.loads(response.get_json())
    print(content)
    jsonContent = json.dumps(content)
    print(jsonContent)
    boxScoreSummaryData = json.loads(jsonContent, object_hook=lambda d: SimpleNamespace(**d))
    header = boxScoreSummaryData.resultSets[0].headers
    print(boxScoreSummaryData.resultSets[0])
    try:
        with open('boxscoresummary2018-2019.csv', 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(boxScoreSummaryData.resultSets[0].rowSet)
            f.close()
    except ValueError:
        print("VALUE ERROR?!?!?!!?!!??!?!??!??!?!!?")

boxScoreArrayUsage = []
def readLeagueUsage():
    f = open('./juicystats/leaguegames2021-2022.json')
    games = json.load(f)
    idList = []
    ##len(games["resultSets"][0]["rowSet"])
    for i in range (0, len(games["resultSets"][0]["rowSet"])):
        time.sleep(1)
        print(i)
        if games["resultSets"][0]["rowSet"][i][4] in idList or games["resultSets"][0]["rowSet"][i][4] is None:
            print(games["resultSets"][0]["rowSet"][i][4])
            continue
        idList.append(games["resultSets"][0]["rowSet"][i][4])
        print(games["resultSets"][0]["rowSet"][i][4])
        box = boxScoreUsageFunction(games["resultSets"][0]["rowSet"][i][4])
        boxScoreArrayUsage.append(box)
    # Closing file
    f.close()

def boxScoreUsageFunction(gameid):
    print(gameid)
    response = boxscoreusagev2.BoxScoreUsageV2(
        game_id=gameid,
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
    print(content)
    jsonContent = json.dumps(content)
    print(jsonContent)
    boxScoreUsageData = json.loads(jsonContent, object_hook=lambda d: SimpleNamespace(**d))
    header = boxScoreUsageData.resultSets[1].headers
    print(boxScoreUsageData.resultSets)
    try:
        with open('boxscoreusageteams2021-2022.csv', 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(boxScoreUsageData.resultSets[1].rowSet)
            f.close()
    except ValueError:
        print("VALUE ERROR?!?!?!!?!!??!?!??!??!?!!?")

commonAllPlayersArray = []
def readLeagueCommonAllPlayers():
    f = open('./juicystats/leaguegames2015-2016.json')
    games = json.load(f)
    idList = []
    ##len(games["resultSets"][0]["rowSet"])
    for i in range (0, len(games["resultSets"][0]["rowSet"])):
        time.sleep(1)
        print(i)
        if games["resultSets"][0]["rowSet"][i][4] in idList or games["resultSets"][0]["rowSet"][i][4] is None:
            print(games["resultSets"][0]["rowSet"][i][4])
            continue
        idList.append(games["resultSets"][0]["rowSet"][i][4])
        print(games["resultSets"][0]["rowSet"][i][4])
        box = commonAllPlayersFunction(games["resultSets"][0]["rowSet"][i][4])
        commonAllPlayersArray.append(box)
    # Closing file
    f.close()

def commonAllPlayersFunction(gameid):
    print(gameid)
    response = commonallplayers.CommonAllPlayers(
        is_only_current_season=0,
        league_id=LeagueID.default,
        season=Season.default,
        proxy=None,
        headers=None,
        timeout=30,
        get_request=True
    )
    content = json.loads(response.get_json())
    print(content)
    jsonContent = json.dumps(content)
    print(jsonContent)
    boxScoreUsageData = json.loads(jsonContent, object_hook=lambda d: SimpleNamespace(**d))
    header = boxScoreUsageData.resultSets[1].headers
    print(boxScoreUsageData.resultSets)
    try:
        with open('boxscoreusageteams2021-2022.csv', 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(commonAllPlayersData.resultSets[1].rowSet)
            f.close()
    except ValueError:
        print("VALUE ERROR?!?!?!!?!!??!?!??!??!?!!?")
##shotchartdetailfunction()
##allassists()
##assiststracker()
##playergamelogfunction('153', '0021700807')
leaguegames()
##readLeagueGames()
##leaguehustlestats()
##leaguehustlestatsleaders()
##leaguedashlineupsfunction()
##leaguedashoppptshotfunction()
##write()
##leaguedashplayerclutchfunction()
##leaguedashplayerptshotfunction()
##leaguedashplayershotlocationsfunction()
##readLeagueGamesTraditional()
##leagueDashPlayerStatsFunction()
##playerCareerStatsFunction()
##getPlayerIds()
##readLeagueGamesDefensive()
##readLeagueFourFactors()
##readLeagueMatchups()
##readLeagueMisc()
##readLeaguePlayerTracker()
##readLeagueScoring()
##readLeagueSimilarityScore()
##boxScoreSimilarityScoreFunction()
##readLeagueUsage()
##readLeagueSummary()