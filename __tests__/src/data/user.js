import { randomNumber } from "../common/utils/helper.js";

export const user = {
  email: "test@test.com",
  password: "123456789",
};

export const invalidEmail = {
  email: "atest@google.com",
  password: "Pa55word",
};

export const invalidPassword = {
  email: "test@google.com",
  password: `Pa55word${randomNumber}`,
};

export const userToDelete = {};

export const newUser = {
  username: `user-${randomNumber}`,
  email: `user${randomNumber}@bsa21.com`,
  name: `John-${randomNumber}`,
  surname: `Johnson-${randomNumber}`,
  password: `Pa55word${randomNumber}`,
};

export const userSchema = {
  title: "User schema",
  type: "object",
  required: ["id", "username", "email"],
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
    username: {
      type: "string",
      length: 25,
      nullable: true,
    },
    email: {
      type: "string",
      length: 100,
      unique: true,
    },
  },
};
