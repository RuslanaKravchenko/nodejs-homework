const express = require("express");
const router = express.Router();
const controllerUsers = require("../../controllers/users");
const { validateUpdateUser } = require("../../validation/users");
const upload = require("../../utils/upload");
const guard = require("../../helpers/guard");

router
  .get("/current", guard, controllerUsers.getCurrentUser)
  .patch("/update", guard, validateUpdateUser, controllerUsers.updateUser)
  // .patch("/avatars", guard, upload.single("avatar"), async (req, res, next) => {
  //   console.log(req.file);
  //   if (req.file) {
  //     const { file } = req;
  //     await fs.rename(
  //       file.path,
  //       path.join(process.env.IMG_DIR, file.originalname)
  //     );
  //   }
  //   res.redirect("/");
  // })
  .patch(
    "/avatars",
    guard,
    upload.single("avatar"),
    controllerUsers.updateUserAvatar
  );

module.exports = router;
