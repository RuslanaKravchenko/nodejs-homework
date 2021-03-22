const Contact = require("../schemas/contacts");

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async getAllContacts() {
    const results = await this.model.find();
    return results;
  }

  async getContactById(id) {
    const result = await this.model.findOne({ _id: id });
    return result;
  }

  async createContact(body) {
    const result = await this.model.create(body);
    return result;
  }

  async updateContact(id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );

    return result;
  }

  async removeContact(id) {
    const result = await this.model.findByIdAndRemove({
      _id: id,
    });

    return result;
  }
}

module.exports = ContactsRepository;
