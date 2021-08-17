import express from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { swaggerSpec } from './config/swagger';
import { ENV, WHITE_ROUTES, ApiPath } from './common';
import { initApi } from './api';
import { authorizationMiddleware, errorHandlerMiddleware } from './middleware';
import { cookieConfig, corsConfig } from './config';

import 'reflect-metadata';
import './data/db/connection';
import './config/passport';
import './config/amqplib';

const app = express();

app.set('trust proxy', 1);
app.use(cors(corsConfig));
app.options('*', cors() as any);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession(cookieConfig));

app.use(passport.initialize());
app.use(ENV.APP.API_PATH, authorizationMiddleware(WHITE_ROUTES));
app.use(ENV.APP.API_PATH, initApi());
app.use(ApiPath.API_DOCS, swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(errorHandlerMiddleware);

app.listen(ENV.APP.PORT, () => {
	console.info(`Server is running on port ${ENV.APP.PORT}`);
});
