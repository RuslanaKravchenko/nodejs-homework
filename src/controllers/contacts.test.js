const contacts = require("./contacts");
const { HttpCode } = require("../helpers/constants");
const { ContactsService } = require("../services");
const {
  contacts: fakeData,
  newContact,
} = require("../services/__mocks__/data-contacts");

jest.mock("../services");

describe("Unit testing contact controllers", () => {
  let req, res, next;
  beforeEach(() => {
    req = { user: { id: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn();
  });

  // get all contacts:
  test("Should get all contacts", async () => {
    const result = await contacts.getAllContacts(req, res, next);

    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result).toHaveProperty("status", "success");
    expect(result).toHaveProperty("code", 200);
    expect(result).toHaveProperty("data");
  });

  test("Should get error when get all contacts", async () => {
    const result = await contacts.getAllContacts({}, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  // found  contact by id:
  test("Should found  contact by id", async () => {
    const { _id, name, phone } = fakeData[0];
    req.params = { contactId: _id };
    const result = await contacts.getContactById(req, res, next);

    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty("_id", _id);
    expect(result.data.contact).toHaveProperty("name", name);
    expect(result.data.contact).toHaveProperty("phone", phone);
  });

  test("Should found  contact by wrong id", async () => {
    req.params = { contactId: 1 };
    const result = await contacts.getContactById(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      status: HttpCode.NOT_FOUND,
      message: "Not found contact",
      data: "Not Found",
    });
  });

  test("Should get error when found contact by id", async () => {
    const result = await contacts.getContactById({}, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  // create  new contact:
  test("Should create  new contact", async () => {
    const { name, phone } = newContact;
    req.body = newContact;
    const result = await contacts.createContact(req, res, next);

    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty("_id");
    expect(result.data.contact).toHaveProperty("name", name);
    expect(result.data.contact).toHaveProperty("phone", phone);
  });

  test("Should get error when create contact", async () => {
    const result = await contacts.createContact({}, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  // update  contact by id:
  test("Should update  contact by id", async () => {
    const { _id } = fakeData[0];
    req.params = { contactId: _id };
    const name = "UpdateContacnt";
    req.body = { name };
    const result = await contacts.updateContact(req, res, next);

    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty("_id", _id);
    expect(result.data.contact).toHaveProperty("name", name);
  });

  test("Should update  contact by wrong id", async () => {
    req.params = { contactId: 1 };
    const name = "UpdateContacnt";
    req.body = { name };
    const result = await contacts.updateContact(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      status: HttpCode.NOT_FOUND,
      message: "Not found contact",
      data: "Not Found",
    });
  });

  test("Should get error when update contact by id", async () => {
    const result = await contacts.updateContact({}, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  //  remove  contact by id :
  test("Should remove  contact by id", async () => {
    const { _id, name, phone } = fakeData[0];
    req.params = { contactId: _id };

    const result = await contacts.removeContact(req, res, next);

    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty("_id", _id);
    expect(result.data.contact).toHaveProperty("name", name);
    expect(result.data.contact).toHaveProperty("phone", phone);
  });

  test("Should remove  contact by wrong id", async () => {
    req.params = { contactId: 1 };
    const result = await contacts.removeContact(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      status: HttpCode.NOT_FOUND,
      message: "Not found contact",
      data: "Not Found",
    });
  });

  test("Should get error when remove contact by id", async () => {
    const result = await contacts.removeContact({}, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
