import { expect } from "chai";
import { ApiClient } from "../src/apiClient.js";
import { invalidPassword, invalidEmail, user } from "../src/data/user.js";

describe("Suite - /auth/login route", function () {
  it("should be albe to login", async () => {
    const apiClient = ApiClient.unauthorized();
    const { body, statusCode } = await apiClient.user.login(user);

    expect(statusCode).to.be.eql(200);
    expect(body.user.email).to.be.eql(user.email);
  });

  it("shouldn't be albe to login with wrong email", async () => {
    const apiClient = ApiClient.unauthorized();
    const { body, statusCode } = await apiClient.user.login(
      invalidEmail,
      false
    );
    expect(statusCode).to.eql(401);
    expect(body.message).to.eql("Incorrect email.");
  });

  it("shouldn't be albe to login with wrong password", async () => {
    const apiClient = ApiClient.unauthorized();
    const { body, statusCode } = await apiClient.user.login(
      invalidPassword,
      false
    );
    expect(statusCode).to.eql(401);
    expect(body.message).to.eql("Incorrect email.");
  });
});
