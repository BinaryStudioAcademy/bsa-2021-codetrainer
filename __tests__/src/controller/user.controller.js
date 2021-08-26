import request from "../httpRequest.js";
import { BaseController } from "./base.controller.js";

export class UserController extends BaseController {
  async login({ email, password }, throwHttpErrors = true) {
    const response = await request.post(
      {
        url: "auth/login",
        body: { email, password },
      },
      {
        throwHttpErrors,
      }
    );

    return response;
  }

  async register(payload) {
    const response = await request.post({
      url: "auth/register",
      body: {
        email: payload.email,
        password: payload.password,
        username: payload.username,
        confirmPassword: payload.confirmPassword,
        name: payload.name,
        surname: payload.surname,
      },
    });

    return response;
  }

  async delete(userID) {
    const response = request.delete({
      url: `user/${userID}`,
    });

    return response;
  }

  async getAllUsers() {
    const response = request.get(
      { url: "users/" },
      { headers: { Authorization: `Bearer ${this.params.token}` } }
    );

    return response;
  }

  async getUserById(userID) {
    const response = request.get(
      { url: `users/${userID}` },
      { headers: { Authorization: `Bearer ${this.params.token}` } }
    );

    return response;
  }
}
