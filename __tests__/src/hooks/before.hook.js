import { ApiClient } from "../apiClient.js";
import { user } from "../data/user.js";

export const mochaHooks = {
  async beforeAll() {
    const apiClient = ApiClient.unauthorized();
    const { body } = await apiClient.user.register(user);
    if (body.message.includes("Invalid login: 534-5.7.14")) {
      console.log(body.message);
      return;
    } else {
      throw new Error(body.message);
    }
  },
};
