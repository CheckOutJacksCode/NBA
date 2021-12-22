var axios = require("axios").default;

const getPlayerById = (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    var options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/players/playerId/' + id,
        headers: {
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
          'x-rapidapi-key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769'
        }
    }
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
};

module.exports = getPlayerById;