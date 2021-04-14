const cloudinary = require("cloudinary").v2;
const { nanoid } = require("nanoid");
const fs = require("fs").promises;
require("dotenv").config();

const { UsersRepository } = require("../repository");
const EmailService = require("./email");
const { ErrorHandler } = require("../helpers/errorHandler");

class UserService {
  constructor() {
    this.cloudinary = cloudinary;
    this.cloudinary.config({
      cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
      api_key: process.env.API_KEY_CLOUDINARY,
      api_secret: process.env.API_SECRET_CLOUDINARY,
    });
    this.repositories = {
      users: new UsersRepository(),
    };
    this.emailService = new EmailService();
  }
  async createUser(body) {
    const verifyToken = nanoid();
    const { email, name } = body;

    try {
      await this.emailService.sendEmail(verifyToken, email, name);
    } catch (err) {
      throw new ErrorHandler(503, err.message, "Service Unavailable");
    }

    const data = await this.repositories.users.createUser({
      ...body,
      verifyToken,
    });
    return data;
  }

  async verify({ verificationToken }) {
    const user = await this.repositories.users.findByField({
      verifyToken: verificationToken,
    });
    if (user) {
      await this.repositories.users.updateVerify(user);
      return true;
    }

    return false;
  }

  async findUserByEmail(email) {
    const data = await this.repositories.users.findUserByEmail(email);
    return data;
  }

  async findUserById(id) {
    const data = await this.repositories.users.findUserById(id);
    return data;
  }

  async getCurrentUser(id) {
    const data = await this.repositories.users.getCurrentUser(id);
    return data;
  }

  async updateUser(id, body) {
    const data = await this.repositories.users.updateUser(id, body);
    return data;
  }

  async updateUserAvatar(id, pathFile) {
    try {
      const {
        secure_url: avatarURL,
        public_id: idCloudAvatar,
      } = await this.#uploadCloud(pathFile);

      const oldAvatar = await this.repositories.users.getAvatar(id);
      console.log(oldAvatar);
      if (oldAvatar) {
        this.cloudinary.uploader.destroy(
          oldAvatar.idCloudAvatar,
          (err, result) => {
            // console.log(err, result);
          }
        );
      }

      await this.repositories.users.updateUserAvatar(
        id,
        avatarURL,
        idCloudAvatar
      );
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
