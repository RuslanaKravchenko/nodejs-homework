const express = require("express");
const path = require("path");
// const fs = require("fs").promises;
const logger = require("morgan");
const cors = require("cors");

// Безопасность
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const contactsRouter = require("./api/contacts");
const authRouter = require("./api/auth");
const usersRouter = require("./api/users");
const { HttpCode } = require("./helpers/constants");
const { ErrorHandler } = require("./helpers/errorHandler");
const { apiLimit, jsonLimit } = require("./config/rateLimit.json");

const app = express();

// const multer = require("multer");
require("dotenv").config();
const IMG_DIR = process.env.IMG_DIR;
app.use(express.static(path.join(__dirname, IMG_DIR)));

// const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, UPLOAD_DIR);
//   },
//   filename: function (req, file, cb) {
//     // cb(null, file.fieldname + "-" + Date.now());
//     cb(null, file.originalname);
//   },
//   limits: {
//     fileSize: 2000000,
//   },

//   fileFilter: function (req, file, cb) {
//     if (file.mimetype.includes("images")) {
//       cb(null, true);
//       return;
//     }

//     cb(null, false);
//   },
// });

// const upload = multer({ storage: storage });

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: jsonLimit }));

// app.post("api/upload", upload.single("file"), async (req, res, next) => {
//   console.log(req.file);
//   res.redirect("/");
// });

app.use(
  "/api/",
  rateLimit({
    windowMs: apiLimit.windowMs, // 15 minutes
    max: apiLimit.max, // limit each IP to 100 requests per windowMs
    handler: (req, res, next) => {
      next(
        new ErrorHandler(
          HttpCode.BAD_REQUEST,
          "Вы исчерпали количество запросов за 15 минут. Попробуйте позже"
        )
      );
    },
  })
);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/api/contacts`,
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? "fail" : "error",
    code: err.status,
    message: err.message,
    data: err.status === 500 ? "Internal Server Error" : err.data,
  });
});

module.exports = app;
