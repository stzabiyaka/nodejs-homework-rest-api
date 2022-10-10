const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, '/contacts.json');

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, 'utf8'));
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  return contacts.find(({ id }) => id === contactId) || null;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const result = contacts.filter(({ id }) => id !== contactId);
  if (result.length === contacts.length) {
    return null;
  }
  await updateContacts(JSON.stringify(result, null, 2));
  return contactId;
};

const addContact = async body => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const isContactExist = contacts.some(contact => contact.name === name);
  if (isContactExist) {
    return null;
  }
  const id = (
    Math.max.apply(
      null,
      contacts.map(({ id }) => Number(id))
    ) + 1
  ).toString();
  const newContact = { id, name, email, phone };
  await updateContacts(JSON.stringify([...contacts, newContact], null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index < 0) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await updateContacts(JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const updateContacts = async contacts => await fs.writeFile(contactsPath, contacts, 'utf8');

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
