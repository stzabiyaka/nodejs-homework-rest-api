const { User } = require('../../models/user');
const { requestError } = require('../../helpers');
const bcrypt = require('bcrypt');
const { SECRET_KEY, TOKEN_EXPIRES_IN = '12h' } = process.env;
const jwt = require('jsonwebtoken');

const throwLoginError = () => {
  throw requestError(401, 'Email or password is wrong');
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throwLoginError();
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throwLoginError();
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRES_IN });
  const result = await User.findByIdAndUpdate(user._id, { token }, { new: true });
  res.json({
    token: result.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = signIn;
