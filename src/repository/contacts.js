const Contact = require("../schemas/contacts");

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async getAllContacts(
    userId,
    { limit = 5, page = 1, sortBy, sortByDesc, filter, category }
  ) {
    if (!category) {
      const result = await this.model.paginate(
        { owner: userId },
        {
          limit,
          page,
          sort: {
            ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
            ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
          },
          select: filter ? filter.split("|").join(" ") : "",
          populate: {
            path: "owner",
            select: "name email",
          },
        }
      );
      return result;
    } else {
      const result = await this.model.paginate(
        { category, owner: userId },
        {
          limit,
          page,
          sort: {
            ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
            ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
          },
          select: filter ? filter.split("|").join(" ") : "",
          populate: {
            path: "owner",
            select: "name email",
          },
        }
      );
      return result;
    }
  }

  async getContactById(userId, id) {
    const result = await this.model
      .findOne({ _id: id, owner: userId })
      .populate({
        path: "owner",
        select: "name email",
      });
    return result;
  }

  async createContact(userId, body) {
    const result = await this.model.create({ ...body, owner: userId });
    return result;
  }

  async updateContact(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true }
    );

    return result;
  }

  async removeContact(userId, id) {
    const result = await this.model.findByIdAndRemove({
      _id: id,
      owner: userId,
    });

    return result;
  }
}

module.exports = ContactsRepository;
