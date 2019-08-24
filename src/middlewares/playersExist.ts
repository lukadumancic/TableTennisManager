const playerExists = require('../helpers/playerExists');

module.exports = async (req, res, next) => {
  const { playerId1, playerId2 } = req.body;
  if (playerId1 && playerId2) {
    const playersExist = (await Promise.all([
      await playerExists(playerId1),
      await playerExists(playerId2)
    ])).every((value: boolean) => value === true);

    if (playersExist) {
      next();
    } else {
      res.send({ error: 'Player does not exist' });
    }
  } else {
    res.send({ erro: 'Missing params' });
  }
};
