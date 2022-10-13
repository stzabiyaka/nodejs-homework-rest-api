const { Contact } = require('../../models/contact');
const { requestError } = require('../../helpers');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw requestError(404, 'Not found');
  }

  res.json({ message: 'contact deleted' });
};

module.exports = removeContact;
