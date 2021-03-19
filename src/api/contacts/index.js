const express = require("express");
const router = express.Router();
const controllerContacts = require("../../controllers/contacts");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("../../validation/contacts");

router
  .get("/", controllerContacts.getAllContacts)
  .get("/:contactId", controllerContacts.getContactById)
  .post("/", validateCreateContact, controllerContacts.createContact)
  .patch("/:contactId", validateUpdateContact, controllerContacts.updateContact)
  .delete("/:contactId", controllerContacts.removeContact);

module.exports = router;
