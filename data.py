from xml.etree.ElementTree import tostring
from nba_api.stats.endpoints import shotchartdetail
import json

response = shotchartdetail.ShotChartDetail(
	team_id=1610612765,
	player_id=203484,
	season_nullable='2021-22',
	season_type_all_star='Regular Season'
)

content = json.loads(response.get_json())
jsonContent = json.dumps(content)
with open("kvcplayerstats2021.json", "w") as outfile:
    outfile.write(jsonContent)
