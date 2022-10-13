const { requestError } = require('../helpers');

const validateFields = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const field = error.details[0].path[0];
      next(requestError(400, `missing required field: '${field}'`));
    }
    next();
  };
  return func;
};

module.exports = validateFields;
