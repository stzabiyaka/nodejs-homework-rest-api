const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { User } = require('../../models/user');
const { requestError, hasher, sendEmail, createVerifyEmail } = require('../../helpers');

const signUp = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, 'Email in use');
  }
  const hashedPassword = await hasher(password, 10);
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    password: hashedPassword,
    email,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifyEmail(email, verificationToken);

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signUp;
