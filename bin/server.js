const fs = require("fs/promises");
const path = require("path");
const app = require("../src/app");
const db = require("../src/db");
require("dotenv").config();

const UPLOAD_DIR = process.env.UPLOAD_DIR;
// const STORE_IMG = process.env.STORE_IMG;
const IMG_DIR = path.join(process.cwd(), process.env.IMG_DIR);

const PORT = process.env.PORT || 3000;

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR);
    await createFolderIsNotExist(IMG_DIR);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
});
