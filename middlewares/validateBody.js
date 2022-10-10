const { requestError } = require('../helpers');

const validateBody = () => {
  const func = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      next(requestError(400, 'missing fields'));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
