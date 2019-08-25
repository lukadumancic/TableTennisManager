import express from 'express';
import mongoose from 'mongoose';
import checkPrivileges from '../middlewares/checkPrivileges';
import rankPointsQuery from '../helpers/rankPointsQuery';

export default class PlayerController {
  public path = '/players';
  public router = express.Router();
  public Player = mongoose.model('players');

  constructor(pathPrefix: string = '') {
    this.path = pathPrefix + '/players';
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getPlayers);
    this.router.get(this.path + '/rank', this.getPlayerRankPoints);
    this.router.post(this.path, checkPrivileges, this.createPlayer);
  }

  getPlayers = async (req: express.Request, res: express.Response) => {
    try {
      const players = await this.Player.find({});
      res.send(players);
    } catch (e) {
      res.send({ error: 'Something went wrong' });
    }
  };

  createPlayer = async (req: express.Request, res: express.Response) => {
    try {
      const { name } = req.body;
      if (name) {
        const player = await this.Player.create({ name });
        res.send(player);
      } else {
        res.send({ error: 'Params missing' });
      }
    } catch (e) {
      res.send({ error: 'Error while creating new player' });
    }
  };

  getPlayerRankPoints = async (req: express.Request, res: express.Response) => {
    try {
      const rankPoints1 = await this.Player.aggregate(rankPointsQuery(1));
      const rankPoints2 = await this.Player.aggregate(rankPointsQuery(2));

      const totalPoints = rankPoints1
        .map((rankPoint1: any) => {
          let rankPoint2 = rankPoints2.find(
            (value: any) =>
              value._id.toHexString() === rankPoint1._id.toHexString()
          );
          return {
            ...rankPoint1,
            setWonSum: rankPoint1.setWonSum + rankPoint2.setWonSum
          };
        })
        .sort((a, b) => b.setWonSum - a.setWonSum);
      res.send(totalPoints);
    } catch (e) {
      res.send({ error: 'Something went wrong' });
    }
  };
}
