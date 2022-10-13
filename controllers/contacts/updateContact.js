const { Contact } = require('../../models/contact');
const { requestError } = require('../../helpers');

const updateContact = async (req, res) => {
  const { body } = req;

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, body, { new: true });

  if (!result) {
    throw requestError(404, 'Not found');
  }

  res.json(result);
};

module.exports = updateContact;
