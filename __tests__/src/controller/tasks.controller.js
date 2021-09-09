import request from "../httpRequest.js";
import { BaseController } from "./base.controller.js";

export class TaskController extends BaseController {
  async getAllTasks() {
    const response = await request.get(
      { url: "tasks/" },
      { headers: { Authorization: `Bearer ${this.params.token}` } }
    );

    return response;
  }

  async createTask(payload) {
    const response = await request.post(
      { url: "tasks/" },
      { headers: { Authorization: `Bearer ${this.params.token}` } },
      {
        body: {
          name: payload.taskName,
          rank: payload.rank,
          initialSolution: payload.initialSolution,
          completeSolution: payload.completeSolution,
          isPublished: payload.isPublished,
        },
      }
    );

    return response;
  }

  async deleteTask(taskID) {
    const response = await request.delete(
      { url: `tasks/${taskID}` },
      { headers: { Authorization: `Bearer ${this.params.token}` } }
    );

    return response;
  }
}
