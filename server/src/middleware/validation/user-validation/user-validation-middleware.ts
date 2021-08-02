import express from 'express';
import checkUserSchema from './user-schema';

const userValidationMiddleware = checkUserSchema;

export default userValidationMiddleware;
