import express, { Router } from 'express';
import cors from 'cors';
import passport from 'passport';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { checkConfig } from './helpers';
import { ENV, WHITE_ROUTES, ApiPath } from './common';
import { initApi } from './api';
import { authorizationMiddleware, errorHandlerMiddleware } from './middleware';
import { swaggerSpec } from './config/swagger';

import 'reflect-metadata';
import './data/db/connection';
import './config/passport';

checkConfig();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(ENV.APP.API_PATH, authorizationMiddleware(WHITE_ROUTES));
app.use(ENV.APP.API_PATH, initApi(Router));
app.use(ApiPath.API_DOCS, swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(errorHandlerMiddleware);

app.listen(ENV.APP.PORT, () => {
	console.info(`Server is running on port ${ENV.APP.PORT}`);
});
