const { ContactsRepository } = require("../repository");
const db = require("../db");

class ContactsService {
  constructor() {
    process.nextTick(async () => {
      const client = await db;
      this.repositories = {
        contacts: new ContactsRepository(client),
      };
    });
  }
  async getAllContacts() {
    const data = await this.repositories.contacts.getAllContacts();
    return data;
  }
  async getContactById(id) {
    const data = await this.repositories.contacts.getContactById(id);
    return data;
  }
  async createContact(body) {
    const data = await this.repositories.contacts.createContact(body);
    return data;
  }
  async updateContact(id, body) {
    const data = await this.repositories.contacts.updateContact(id, body);
    return data;
  }
  async removeContact(id) {
    const data = await this.repositories.contacts.removeContact(id);
    return data;
  }
}

module.exports = ContactsService;
