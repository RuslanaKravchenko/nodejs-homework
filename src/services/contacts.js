const { ContactsRepository } = require("../repository");

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
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
