import express, { Router } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { checkConfig } from './helpers';
import { ENV } from './common';
import { initApi } from './api';
import { errorHandlerMiddleware } from './middleware';
import { cookieConfig } from './config';

import 'reflect-metadata';
import './data/db/connection';
import './config/passport';

checkConfig();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession(cookieConfig));
app.use(cors());

app.use(passport.initialize());

app.use(ENV.APP.API_PATH, initApi(Router));

app.use(errorHandlerMiddleware);

app.listen(ENV.APP.PORT, () => {
	console.info(`Server is running on port ${ENV.APP.PORT}`);
});
