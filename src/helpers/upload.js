const path = require("path");
const multer = require("multer");
require("dotenv").config();

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + "-" + Date.now());
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, cb) {
    console.log(file.mimetype);
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }

    cb(null, false);
  },
});

module.exports = upload;
