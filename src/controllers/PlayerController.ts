import express = require('express');
const checkPrivileges = require('../middlewares/checkPrivileges');
const mongoose = require('mongoose');

class PlayerController {
  public path = '/players';
  public router = express.Router();
  public Player = mongoose.model('players');

  constructor(pathPrefix: string = '') {
    this.path = pathPrefix + '/players';
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getPlayers);
    this.router.post(this.path, checkPrivileges, this.createPlayer);
  }

  getPlayers = (req: express.Request, res: express.Response) => {
    res.end('test');
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
      console.log(e);
      res.send({ error: 'Error while creating new player' });
    }
  };
}

module.exports = PlayerController;
