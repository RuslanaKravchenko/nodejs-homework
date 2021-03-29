const express = require("express");
const router = express.Router();
const controllerContacts = require("../../controllers/contacts");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("../../validation/contacts");
const guard = require("../../helpers/guard");

router
  .get("/", guard, controllerContacts.getAllContacts)
  .get("/:contactId", guard, controllerContacts.getContactById)
  .post("/", guard, validateCreateContact, controllerContacts.createContact)
  .patch(
    "/:contactId",
    guard,
    validateUpdateContact,
    controllerContacts.updateContact
  )
  .delete("/:contactId", guard, controllerContacts.removeContact);

module.exports = router;
