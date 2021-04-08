const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
require("dotenv").config();

const IMG_DIR = process.env.IMG_DIR;

const saveAvatarToStatic = async (userId, pathFile, newFileName) => {
  const img = await Jimp.read(pathFile);

  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);

  const newPathFile = path.join(IMG_DIR, newFileName);

  await fs.rename(pathFile, newPathFile);

  const newAvatarURL = path.normalize(
    path.join(process.cwd(), IMG_DIR, newFileName)
  );

  return newAvatarURL;
};

const deleteOldAvatar = async (oldAvatar) => {
  try {
    await fs.unlink(oldAvatar);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  saveAvatarToStatic,
  deleteOldAvatar,
};
