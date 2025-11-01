import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// contacts.js

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  // I read the file contacts.json
  const data = await fs.readFile(contactsPath, "utf-8");
  // I parse json in JS object
  const contacts = JSON.parse(data);
  //I return arr of contacts
  return contacts;
}

async function getContactById(contactId) {
  // I get all contacts
  const contacts = await listContacts();
  // I look for the needed contact by it's id
  const contact = contacts.find((contact) => contact.id === contactId);
  // I return the needed contact or null
  return contact || null;
}

async function removeContact(contactId) {
  // I get the list of contacts
  const contacts = await listContacts();

  // I find the index of conctact which I want to remove
  const index = contacts.findIndex((cont) => cont.id === contactId);
  // I return null if the contcact doesn't exist
  if (index === -1) {
    return null;
  }

  // I save the removed conctact
  const [removedContact] = contacts.splice(index, 1);
  //I write the new list of contacts without removed
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
}
// console.log(await listContacts());
// const removed = await removeContact("rsKkOQUi80UsgVPCcLZZW")
// console.log(removed)

async function addContact(name, email, phone) {
  // I get the list of contacts
  const contacts = await listContacts();
  // I form the new contact with its own id
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  // I add the new one to the list
  contacts.push(newContact);
  // I write the concacts in the file
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const newContact = await addContact(
  "Ivan Volos",
  "johnVolos@example.com",
  "(123) 456-43847"
);
console.log(newContact);

