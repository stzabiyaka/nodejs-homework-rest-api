const signUp = require('./signUp');
const signIn = require('./signIn');
const signOut = require('./signOut');
const getCurrentUser = require('./getCurrentUser');
const updateUserSubscription = require('./updateUserSubscription');
const updateUserAvatar = require('./updateUserAvatar');
const verifyUser = require('./verifyUser');

module.exports = {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  updateUserSubscription,
  updateUserAvatar,
  verifyUser,
};
