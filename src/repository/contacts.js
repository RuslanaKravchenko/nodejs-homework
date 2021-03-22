const { ObjectID } = require("mongodb");
const { HttpCode } = require("../helpers/constants");
const { ErrorHandler } = require("../helpers/errorHandler");

class ContactsRepository {
  constructor(client) {
    this.collection = client.db("db-contacts").collection("contacts");
  }

  #getMongoId(id) {
    try {
      return ObjectID(id);
    } catch (e) {
      throw new ErrorHandler(
        HttpCode.BAD_REQUEST,
        `MongoDb _id: ${e.message}`,
        "Bad Request"
      );
    }
  }

  async getAllContacts() {
    const results = await this.collection.find().toArray();
    return results;
  }

  async getContactById(id) {
    const objectId = this.#getMongoId(id);

    const [result] = await this.collection.find({ _id: objectId }).toArray();
    return result;
  }

  async createContact(body) {
    const {
      ops: [result],
    } = await this.collection.insertOne(body);
    return result;
  }

  async updateContact(id, body) {
    const objectId = this.#getMongoId(id);
    const { value: result } = await this.collection.findOneAndUpdate(
      { _id: objectId },
      { $set: body },
      { returnNewDocument: true }
    );

    return result;
  }

  async removeContact(id) {
    const objectId = this.#getMongoId(id);
    const { value: result } = await this.collection.findOneAndDelete({
      _id: objectId,
    });

    return result;
  }
}

module.exports = ContactsRepository;
