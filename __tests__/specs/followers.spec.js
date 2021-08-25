import { expect } from "chai";
import { ApiClient } from "../src/apiClient.js";
import { user } from "../src/data/user.js";

describe("Suite - /followers route", function () {
  xit("get all followers list", async () => {
    const apiClient = await ApiClient.authorized(user);
    const { statusCode } = await apiClient.follower.getFollowers();

    expect(statusCode).to.be.eql(200);
  });

  xit("get all followings list", async () => {
    const apiClient = await ApiClient.authorized(user);
    const { statusCode } = await apiClient.follower.getFollowings();

    expect(statusCode).to.be.eql(200);
  });
});
