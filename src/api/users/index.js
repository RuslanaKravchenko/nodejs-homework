const express = require("express");
const router = express.Router();
const controllerUsers = require("../../controllers/users");
const guard = require("../../helpers/guard");

router.post("/register", controllerUsers.register);
router.post("/login", controllerUsers.login);
router.post("/logout", guard, controllerUsers.logout);

module.exports = router;
