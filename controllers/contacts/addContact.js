const contacts = require('../../models/contacts');
const { requestError } = require('../../helpers');

const addContact = async (req, res) => {
  const { body } = req;

  const result = await contacts.addContact(body);

  if (!result) {
    throw requestError(409, `Contact ${body.name} is already in the list.`);
  }

  res.status(201).json(result);
};

module.exports = addContact;
