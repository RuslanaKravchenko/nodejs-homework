const { UsersRepository } = require("../repository");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
require("dotenv").config();
const { ErrorHandler } = require("../helpers/errorHandler");

class UserService {
  constructor() {
    this.cloudinary = cloudinary;
    this.cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
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

  async updateAvatar(id, pathFile) {
    try {
      const {
        secure_url: avatarURL,
        public_id: idCloudAvatar,
      } = await this.#uploadCloud(pathFile);

      const oldAvatar = await this.repositories.users.getAvatar(id);
      if (oldAvatar) {
        this.cloudinary.uploader.destroy(
          oldAvatar.idCloudAvatar,
          (err, result) => {
            console.log(err, result);
          }
        );
      }

      await this.repositories.users.updateAvatar(id, avatarURL, idCloudAvatar);
      await fs.unlink(pathFile);

      return avatarURL;
    } catch (error) {
      throw new ErrorHandler(null, "Error upload avatar");
    }
  }

  #uploadCloud = (pathFile) => {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.upload(
        pathFile,
        {
          folder: "Phonebook/userAvatars",
          transformation: {
            width: 250,
            height: 250,
            gravity: "faces",
            crop: "fill",
          },
        },
        (error, result) => {
          if (error) reject(error);
          if (result) resolve(result);
        }
      );
    });
  };
}

module.exports = UserService;
