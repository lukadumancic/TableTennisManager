import express from 'express';

export default (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  if (false) {
    return res.send({ error: 'No privileges' });
  }
  next();
};
