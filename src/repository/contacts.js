const { db } = require("../db");

class ContactsRepository {
  constructor() {
    this.db = db;
  }

  async getAllContacts() {
    const results = await this.db.models.contact.findAll();
    return results;
  }

  async getContactById(id) {
    const result = await this.db.models.contact.findOne({ where: { id } });
    return result;
  }

  async createContact(body) {
    const result = await this.db.models.contact.create(body);
    return result;
  }

  async updateContact(id, body) {
    const result = await this.db.models.contact.findOne({ where: { id } });
    if (!result) {
      return null;
    }

    return result.update(body);
  }

  async removeContact(id) {
    const result = await this.db.models.contact.findOne({ where: { id } });
    if (!result) {
      return null;
    }

    return result.destroy();
  }
}

module.exports = ContactsRepository;
