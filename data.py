from xml.etree.ElementTree import tostring
from nba_api.stats.endpoints import shotchartdetail
from nba_api.stats.endpoints import playergamelog
from nba_api.stats.library.parameters import SeasonAll
import json
from nba_api.stats.static import players
player_dict = players.get_players()

def shotchartdetail():
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
	with open("playersNBA.json", "w") as outfile:
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
		
##shotchartdetail()