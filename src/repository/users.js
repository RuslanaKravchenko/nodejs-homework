const User = require("../schemas/user");

class UsersRepository {
  constructor() {
    this.model = User;
  }

  async findUserById(id) {
    const result = await this.model.findOne({ _id: id });
    return result;
  }

  async getCurrentUser(id) {
    const user = await this.model.findOne(
      { _id: id },
      "_id name email avatarURL subscription createdAt"
    );
    return user;
  }

  async findUserByEmail(email) {
    const result = await this.model.findOne({ email });
    return result;
  }

  async findByField(field) {
    const result = await this.model.findOne(field);
    return result;
  }

  async updateVerify(user) {
    await user.updateOne({ verify: true, verifyToken: null });
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

  async updateUserAvatar(id, avatarURL, idCloudAvatar) {
    await this.model.updateOne({ _id: id }, { avatarURL, idCloudAvatar });
  }

  async getAvatar(id) {
    const { avatarURL, idCloudAvatar } = await this.model.findOne({ _id: id });
    return { avatarURL, idCloudAvatar };
  }
}

module.exports = UsersRepository;
