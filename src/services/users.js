const { UsersRepository } = require("../repository");
const { ErrorHandler } = require("../helpers/errorHandler");
const {
  saveAvatarToStatic,
  deleteOldAvatar,
} = require("../helpers/createAvatar");

class UserService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }
  async createUser(body) {
    const data = await this.repositories.users.createUser(body);
    return data;
  }

  async findUserByEmail(email) {
    const data = await this.repositories.users.findUserByEmail(email);
    return data;
  }

  async findUserById(id) {
    const data = await this.repositories.users.findUserById(id);
    return data;
  }

  async updateUser(id, body) {
    const data = await this.repositories.users.updateUser(id, body);
    return data;
  }

  async updateUserAvatar(id, pathFile, fileName) {
    try {
      const newFileName = `${Date.now()}-${fileName}`;
      const newAvatarUrl = await saveAvatarToStatic(id, pathFile, newFileName);
      console.log(newAvatarUrl);

      const oldAvatar = await this.repositories.users.getAvatar(id);
      if (oldAvatar) {
        await deleteOldAvatar(oldAvatar);
      }

      await this.repositories.users.updateUserAvatar(id, newAvatarUrl);

      return newAvatarUrl;
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(null, "Error upload avatar");
    }
  }
}

module.exports = UserService;
