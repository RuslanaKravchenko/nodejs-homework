const User = require("../schemas/user");

class UsersRepository {
  constructor() {
    this.model = User;
  }

  async findUserById(id) {
    const result = await this.model.findOne({ _id: id });
    return result;
  }

  async findUserByEmail(email) {
    const result = await this.model.findOne({ email });
    return result;
  }

  async createUser(body) {
    const user = new this.model(body);
    return user.save();
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token });
  }

  async updateUser(id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );

    return result;
  }
}

module.exports = UsersRepository;
