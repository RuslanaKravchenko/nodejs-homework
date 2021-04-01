const express = require("express");
const router = express.Router();
const controllerUsers = require("../../controllers/users");
const guard = require("../../helpers/guard");
const { createAccountLimiter } = require("../../helpers/rateLimit");

router.post("/register", createAccountLimiter, controllerUsers.register);
router.post("/login", controllerUsers.login);
router.post("/logout", guard, controllerUsers.logout);

module.exports = router;
