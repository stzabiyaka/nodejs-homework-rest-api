const { User } = require('../../models/user');
const { requestError } = require('../../helpers');

const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;
  const result = await User.findOne(verificationToken);

  if (!result) {
    throw requestError(404, 'User not found');
  }

  await User.findByIdAndUpdate(
    result._id,
    { verificationToken: null, verify: true },
    { new: true }
  );

  res.json('Verification successful');
};

module.exports = verifyUser;
