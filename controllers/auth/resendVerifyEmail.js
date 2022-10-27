const { User } = require('../../models/user');
const { requestError, createVerifyEmail, sendEmail } = require('../../helpers');

const resendVereifyEmail = async (req, res) => {
  const { email } = req.body;
  const result = await User.findOne({ email });
  if (!result) {
    throw requestError(404, 'User not found');
  }
  if (result.verify) {
    throw requestError(400, 'Verification has already been passed');
  }

  const mail = createVerifyEmail(email, result.verificationToken);

  await sendEmail(mail);

  res.json('Verification email sent');
};

module.exports = resendVereifyEmail;
