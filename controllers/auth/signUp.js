const { User } = require('../../models/user');
const { requestError } = require('../../helpers');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, 'Email in use');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ password: hashedPassword, email });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signUp;
