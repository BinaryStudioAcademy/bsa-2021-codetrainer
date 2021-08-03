import express, { Router } from 'express';
import cors from 'cors';
import passport from 'passport';
import { ENV } from './common';
import { initApi } from './api';
import { errorHandlerMiddleware } from './middleware';

import 'reflect-metadata';
import './data/db/connection';
import './config/passport';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(ENV.APP.API_PATH, initApi());
app.use(errorHandlerMiddleware);

app.listen(ENV.APP.PORT, () => {
	console.info(`Server is running on port ${ENV.APP.PORT}`);
});
