import { randomNumber } from "../common/utils/helper.js";

export const newTask = {
  name: `${randomNumber}`,
  rank: 5,
  initialSolution: "let a = 100, return a*100",
};

export const taskSchema = {
  title: "Challenge schema",
  type: "object",
  required: ["id", "name", "rank"],
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
    name: {
      type: "string",
      maxLength: 25,
      nullable: true,
    },
    rank: {
      type: "integer",
      maxLength: 1,
    },
  },
};
