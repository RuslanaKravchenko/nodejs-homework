const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
require("dotenv").config();

const UPLOAD_DIR = process.env.UPLOAD_DIR;
const IMG_DIR = process.env.IMG_DIR;

const saveAvatarToStatic = async (userId, pathFile, fileName) => {
  const img = await Jimp.read(pathFile);

  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);

  await createFolderIsExist(path.join(IMG_DIR));

  await fs.rename(pathFile, path.join(IMG_DIR, fileName));

  const newAvatarURL = path.normalize(path.join(fileName));

  return newAvatarURL;
};

module.exports = {
  saveAvatarToStatic,
};
