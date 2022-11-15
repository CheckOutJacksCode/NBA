const request = require('supertest');
const {jsdom} = require('jsdom');
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = require('should');
const app = require('../index.js');


chai.use(chaiHttp);
describe('/GET home box scores traditional by playerid, season', () => {
    function testBoxScoresTraditionalHome (playerid, season, status) {
        it(`it should GET all home game box scores from "boxscorestraditional${season}" WHERE player_id = playerid`, (done) => {
          chai.request(app)
              .get(`/boxScoresTraditional/home/${playerid}/${season}`)
              .end((err, res) => {
                    if (status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array').of.length(41);
                        chai.expect(res.body[0].player_id).to.be.equal(playerid);
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let players = [['201939', '2015-2016', 200], ['1628369', '2015-2016', 404], ['201939', '2015-2015', 400]];
    for(let i = 0; i < players.length; i++) {
        testBoxScoresTraditionalHome(players[i][0], players[i][1], players[i][2])
    }
});

describe('/GET visitor box scores traditional by playerid, season', () => {
    function testBoxScoresTraditionalVisitor (playerid, season, status) {
        it(`it should GET all visitor game box scores from "boxscorestraditional${season}" WHERE player_id = playerid`, (done) => {
          chai.request(app)
              .get(`/boxScoresTraditional/visitor/${playerid}/${season}`)
              .end((err, res) => {
                    if ( status === 200) {
                        res.status.should.be.equal(200);
                        chai.expect(res.body).to.be.an('array').of.length(41);
                        chai.expect(res.body[0].player_id).to.be.equal(playerid);
                    } else if (status === 404) {
                        res.status.should.be.equal(404);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    } else if (status === 400) {
                        res.status.should.be.equal(400);
                        chai.expect(res.body).to.be.an('object').with.property('name').to.be.equal('error');
                    }
                    done();
              });
        });
    }
    let players = [['201939', '2015-2016', 200], ['1628369', '2015-2016', 404], ['201939', '2015-2015', 400]];
    for(let i = 0; i < players.length; i++) {
        testBoxScoresTraditionalVisitor(players[i][0], players[i][1], players[i][2])
    }
});