module.exports = (req, res, next) => {
  if (false) {
    return res.send({ error: 'No privileges' });
  }
  next();
};
