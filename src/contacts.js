import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

// contacts.js

/*
 * Розкоментуй і запиши значення
 * const contactsPath = ;
 */

async function listContacts() {
  // I read the file contacts.json
  const data = await fs.readFile(contactsPath, "utf-8");
  // I parse json in JS object
  const contacts = JSON.parse(data);
  //I return arr of contacts
  return contacts;
}

// async function getContactById(contactId) {
//   // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
// }

// async function removeContact(contactId) {
//   // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
// }

// async function addContact(name, email, phone) {
//   // ...твій код. Повертає об'єкт доданого контакту (з id).
// }
