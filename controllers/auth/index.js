const signUp = require('./signUp');
const signIn = require('./signIn');
const signOut = require('./signOut');
const getCurrentUser = require('./getCurrentUser');
const updateUserSubscription = require('./updateUserSubscription');
const updateUserAvatar = require('./updateUserAvatar');
const verifyEmail = require('./verifyEmail');
const resendVereifyEmail = require('./resendVerifyEmail');

module.exports = {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  updateUserSubscription,
  updateUserAvatar,
  verifyEmail,
  resendVereifyEmail,
};
