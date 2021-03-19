const { ContactsRepository } = require("../repository");

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }
  getAllContacts() {
    const data = this.repositories.contacts.getAllContacts();
    return data;
  }
  getContactById(id) {
    const data = this.repositories.contacts.getContactById(id);
    return data;
  }
  createContact(body) {
    const data = this.repositories.contacts.createContact(body);
    return data;
  }
  updateContact(id, body) {
    const data = this.repositories.contacts.updateContact(id, body);
    return data;
  }
  removeContact(id) {
    const data = this.repositories.contacts.removeContact(id);
    return data;
  }
}

module.exports = ContactsService;
