const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const contactsPath = path.join(__dirname, './db/contacts.json');

const readContacts = async () => {
  const result = await fs.readFile(
    path.join(__dirname, './db/contacts.json'),
    'utf-8',
  );

  const contacts = JSON.parse(result);
  return contacts;
};

function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.filter(({ id }) => {
    return id.toString() === contactId;
  });

  if (!contact) {
    return null;
  }

  return contact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const updatedContacts = contacts.filter(({ id }) => {
    return id.toString() !== contactId;
  });
  fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return updatedContacts;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, './db/contacts.json'),
    JSON.stringify(contacts),
  );
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
