import chai, { expect } from "chai";
import { ApiClient } from "../src/apiClient.js";
import { user, userSchema } from "../src/data/user.js";
import jsonSchema from "chai-json-schema";
chai.use(jsonSchema);

describe("Suite - users/ route", function () {
  let apiClient;
  let userInfo;

  before(async () => {
    apiClient = await ApiClient.authorized(user);
    userInfo = await apiClient.user.login(user);
  });

  it("should get all users list", async () => {
    const { statusCode, body } = await apiClient.user.getAllUsers();
    expect(statusCode).to.be.eql(200);
    expect(body).to.be.a("object");
  });

  it("should get a user by id", async () => {
    const { statusCode, body } = await apiClient.user.getUserById(
      userInfo.body.user.id
    );
    expect(statusCode).to.be.eql(200);
    expect(body).to.be.a("object");
    expect(body.user).to.be.jsonSchema(userSchema);
  });

  it("shouldn't get unexisted user", async () => {
    const { statusCode } = await apiClient.user.getUserById(
      userInfo.body.user.id.slice(0, -3) + "000",
      false
    );
    expect(statusCode).to.be.eql(200);
  });
});
