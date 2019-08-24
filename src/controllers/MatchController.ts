const express = require('express');
const checkPrivileges = require('../middlewares/checkPrivileges');
const playersExist = require('../middlewares/playersExist');
const checkScoreFormat = require('../middlewares/checkScoreFormat');
const mongoose = require('mongoose');

class MatchController {
  public path = '/players';
  public router = express.Router();
  public Match = mongoose.model('matches');

  constructor(pathPrefix: string = '') {
    this.path = pathPrefix + '/matches';
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getMatches);
    this.router.post(
      this.path,
      checkPrivileges,
      playersExist,
      checkScoreFormat,
      this.createMatch
    );
  }

  getMatches = (req: express.Request, res: express.Response) => {
    res.send('test');
  };

  createMatch = async (req: express.Request, res: express.Response) => {
    try {
      const { playerId1, playerId2, score } = req.body;
      const match = await this.Match.create({
        playerId1,
        playerId2,
        score: score.map((value: number[]) => {
          return {
            points1: value[0],
            points2: value[1]
          };
        })
      });
      res.send(match);
    } catch (e) {
      res.send({ error: 'Error while creating new match' });
    }
  };
}

module.exports = MatchController;
