const express = require("express");
const router = express.Router();
const controllerContacts = require("../../controllers/contacts");

router
  .get("/", controllerContacts.getAllContacts)
  .get("/:contactId", controllerContacts.getContactById)
  .post("/", controllerContacts.createContact)
  .patch("/:contactId", controllerContacts.updateContact)
  .delete("/:contactId", controllerContacts.removeContact);

module.exports = router;
