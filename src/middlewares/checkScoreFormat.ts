const { MAX_SETS, MAX_GEMS_IN_SET } = require('../../config/constants');
const WINNER_TARGET_SETS = Math.ceil(MAX_SETS / 2);

module.exports = async (req, res, next) => {
  const { score } = req.body;
  if (score) {
    if (Array.isArray(score)) {
      if (score.length <= MAX_SETS) {
        if (score.every(value => Array.isArray(value) && value.length === 2)) {
          let playerSets = [0, 0];
          for (let i = 0; i < score.length; i++) {
            const [points1, points2] = score[i];
            if (points1 > MAX_GEMS_IN_SET || points2 > MAX_GEMS_IN_SET) {
              if (Math.abs(points1 - points2) === 2) {
                if (points1 > points2) {
                  playerSets[0]++;
                } else {
                  playerSets[1]++;
                }
              } else {
                return res.send({ error: 'Deuce points not valid' });
              }
            } else if (
              points1 === MAX_GEMS_IN_SET &&
              points2 <= MAX_GEMS_IN_SET - 2
            ) {
              playerSets[0]++;
            } else if (
              points2 === MAX_GEMS_IN_SET &&
              points1 <= MAX_GEMS_IN_SET - 2
            ) {
              playerSets[1]++;
            } else {
              return res.send({ error: 'Set points not valid' });
            }
          }

          if (
            playerSets[0] === WINNER_TARGET_SETS ||
            playerSets[1] === WINNER_TARGET_SETS
          ) {
            next();
          } else {
            return res.send({ error: 'No winner' });
          }
        } else {
          return res.send({ error: 'Wrong data format' });
        }
      } else {
        return res.send({ error: 'Max number of sets exceeded' });
      }
    } else {
      return res.send({ error: 'Wrong data format' });
    }
  } else {
    return res.send({ error: 'Params missing' });
  }
};
