const request = require('supertest');
const {jsdom} = require('jsdom');
const {assert} = require('chai');
const app = require('../');

describe('GET https://api-nba-v1.p.rapidapi.com/players/playerId/20', function () {
    it('responds with a json containing player info', function (done) {
        request(app)
            .get('https://api-nba-v1.p.rapidapi.com/players/playerId/20')
            .set('Accept, application/json')
            .expect('Content Type', /json/)
            .expect(200, done);
    })
})
describe('GET /games', function () {
    it('responds with a json containing a list of all games', function (done) {
        request(app)
            .get('/games')
            .set('Accept, application/json')
            .expect('Content Type', /json/)
            .expect(200, done);
    })
})