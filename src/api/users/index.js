const express = require("express");
const router = express.Router();
const controllerUsers = require("../../controllers/users");
const { validateUpdateUser } = require("../../validation/users");
const guard = require("../../helpers/guard");

router
  .get("/current", guard, controllerUsers.getCurrentUser)
  .patch("/update", guard, validateUpdateUser, controllerUsers.updateUser);

module.exports = router;
