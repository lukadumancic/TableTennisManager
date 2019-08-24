import express from 'express';
import mongoose from 'mongoose';
import checkPrivileges from '../middlewares/checkPrivileges';
import playersExist from '../middlewares/playersExist';
import checkScoreFormat from '../middlewares/checkScoreFormat';
import matchQuery from '../helpers/matchQuery';

export default class MatchController {
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

  getMatches = async (req: express.Request, res: express.Response) => {
    try {
      const { playerId1, playerId2, id } = req.query;
      const matches = await this.Match.aggregate(
        matchQuery(playerId1, playerId2, id)
      );

      res.send(matches);
    } catch (e) {
      res.send({ error: 'Something went wrong' });
    }
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
