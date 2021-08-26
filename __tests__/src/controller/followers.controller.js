import { user } from "../data/user.js";
import request from "../httpRequest.js";
import { BaseController } from "./base.controller.js";

export class FollowerController extends BaseController {
  async getFollowers(id) {
    const response = await request.get(
      { url: `followers/followers/${id}` },
      { headers: { Authorization: `Bearer ${this.params.token}` } }
    );

    return response;
  }

  async getFollowings(id) {
    const response = await request.get(
      { url: `followers/following/${id}` },
      { headers: { Authorization: `Bearer ${this.params.token}` } }
    );

    return response;
  }
}
