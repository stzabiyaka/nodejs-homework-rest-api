const contacts = require('../../models/contacts');
const { requestError } = require('../../helpers');

const updateContact = async (req, res) => {
  const { body } = req;

  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, body);

  if (!result) {
    throw requestError(404, 'Not found');
  }

  res.json(result);
};

module.exports = updateContact;
