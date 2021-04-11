const { contacts } = require("./data-contacts");

const mockGetAll = jest.fn(() => {
  return { contacts, total: contacts.length, totalPages: 1, limit: 5, page: 1 };
});

const mockGetById = jest.fn((userId, { contactId }) => {
  const [contact] = contacts.filter(
    (el) => String(el._id) === String(contactId)
  );
  return contact;
});

const mockCreateContact = jest.fn((userId, body) => {
  contacts.push({ ...body, _id: "5eb074232c30a1378dacdbax" });
  return { ...body, _id: "5eb074232c30a1378dacdbax" };
});

const mockUpdateContact = jest.fn((userId, { contactId }, body) => {
  const [contact] = contacts.filter(
    (el) => String(el._id) === String(contactId)
  );

  if (contact) {
    contact.name = body.name;
  }
  return contact;
});

const mockRemoveContact = jest.fn((userId, { contactId }) => {
  const index = contacts.findIndex(
    (el) => String(el._id) === String(contactId)
  );

  if (index !== -1) {
    const [contact] = contacts.splice(index, 1);
    return contact;
  }

  return null;
});

const ContactsService = jest.fn().mockImplementation(() => {
  return {
    getAllContacts: mockGetAll,
    getContactById: mockGetById,
    createContact: mockCreateContact,
    updateContact: mockUpdateContact,
    removeContact: mockRemoveContact,
  };
});

const UserService = jest.fn().mockImplementation(() => {
  return {
    createUser: jest.fn(),
    findUserByEmail: jest.fn(),
    findUserById: jest.fn(),
    updateUser: jest.fn(),
    updateUserAvatar: jest.fn(),
  };
});

const AuthService = jest.fn().mockImplementation(() => {
  return {
    login: jest.fn(),
    logout: jest.fn(),
  };
});

module.exports = {
  ContactsService,
  UserService,
  AuthService,
};
