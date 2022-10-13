const { Contact } = require('../../models/contact');
const { requestError } = require('../../helpers');

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!result) {
    throw requestError(404, 'Not found');
  }

  res.json(result);
};

module.exports = updateFavorite;
