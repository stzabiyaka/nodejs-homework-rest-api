const { User } = require('../../models/user');

const signOut = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json({ message: 'No content' });
  } catch (error) {}
};

module.exports = signOut;
