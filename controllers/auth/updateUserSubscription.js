const { User } = require('../../models/user');
const { requestError } = require('../../helpers');

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
    select: { createdAt: 0, updatedAt: 0, token: 0 },
  });

  if (!result) {
    throw requestError(404, 'Not found');
  }

  res.json(result);
};

module.exports = updateUserSubscription;
