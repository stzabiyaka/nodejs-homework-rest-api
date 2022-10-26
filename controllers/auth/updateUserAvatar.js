const fs = require('fs/promises');
const path = require('path');
const jimp = require('jimp');
const { User } = require('../../models/user');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');
const avatarSize = 250;

const updateUserAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const fileExtension = originalname.split('.').pop();
    const filename = `${_id}.${fileExtension}`;
    const resultUpload = path.join(avatarsDir, filename);

    const image = await jimp.read(tempUpload);

    image.contain(avatarSize, avatarSize).write(resultUpload);

    await fs.unlink(tempUpload);
    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
    res.json(avatarURL);
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateUserAvatar;
