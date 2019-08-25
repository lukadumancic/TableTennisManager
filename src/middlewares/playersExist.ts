import playerExists from '../helpers/playerExists';
import express from 'express';

export default async (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
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
