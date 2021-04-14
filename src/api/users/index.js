const express = require("express");
const router = express.Router();
const controllerUsers = require("../../controllers/users");
const { validateUpdateUser } = require("../../validation/users");
const guard = require("../../helpers/guard");
const upload = require("../../helpers/multer");

router
  .get("/verify/:verificationToken", controllerUsers.verify)
  .post("/verify", controllerUsers.resend)
  .get("/current", guard, controllerUsers.getCurrentUser)
  .patch("/update", guard, validateUpdateUser, controllerUsers.updateUser)
  .patch(
    "/avatars",
    guard,
    upload.single("avatar"),
    controllerUsers.updateUserAvatar
  );

module.exports = router;
