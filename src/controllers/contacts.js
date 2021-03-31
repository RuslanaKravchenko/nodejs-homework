const { HttpCode } = require("../helpers/constants");
const { ContactsService } = require("../services");
const contactsService = new ContactsService();

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await contactsService.getAllContacts(userId, req.query);
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        ...contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsService.getContactById(
      userId,
      req.params.contactId
    );
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const createContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsService.createContact(userId, req.body);
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsService.updateContact(
      userId,
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsService.removeContact(
      userId,
      req.params.contactId
    );
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        message: "contact deleted",
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
