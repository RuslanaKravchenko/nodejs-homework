const { UsersRepository } = require("../repository");

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
}

module.exports = UserService;
