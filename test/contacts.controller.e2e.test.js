const { HttpCode } = require("../src/helpers/constants");
const request = require("supertest");
const app = require("../src/app");
const {
  contacts,
  newContact,
} = require("../src/services/__mocks__/data-contacts");

jest.mock("../src/services");
jest.mock("../src/helpers/guard", () => {
  return (req, res, next) => {
    req.user = { id: 1 };
    next();
  };
});

describe("Should handle get request api/contacts", () => {
  test("Should return 200 status for get all contacts", async (done) => {
    const res = await request(app)
      .get("/api/contacts")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(HttpCode.OK);
    expect(res.body).toBeDefined();
    expect(res.body.data.contacts).toBeInstanceOf(Array);

    done();
  });

  test("Should return 200 status for get  contact by id", async (done) => {
    const contact = contacts[0];
    const res = await request(app)
      .get(`/api/contacts/${contact._id}`)
      .set("Accept", "application/json");

    expect(res.status).toEqual(HttpCode.OK);
    expect(res.body).toBeDefined();
    expect(res.body.data.contact._id).toBe(contact._id);

    done();
  });

  test("Should return 404 status for find  contact by wrong id", async (done) => {
    const contact = { _id: 123456 };
    const res = await request(app)
      .get(`/api/contacts/${contact._id}`)
      .set("Accept", "application/json");

    expect(res.status).toEqual(HttpCode.NOT_FOUND);
    expect(res.body).toBeDefined();

    done();
  });

  test("Should return 201 status for create  contact ", async (done) => {
    const res = await request(app)
      .post(`/api/contacts`)
      .send(newContact)
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(HttpCode.CREATED);
    expect(res.body).toBeDefined();
    expect(res.body.data.contact.name).toBe(newContact.name);
    expect(res.body.data.contact.phone).toBe(newContact.phone);

    done();
  });
});
