import express from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { ENV, WHITE_ROUTES } from './common';
import { initApi } from './api';
import { authorizationMiddleware, errorHandlerMiddleware } from './middleware';
import { cookieConfig } from './config';

import 'reflect-metadata';
import './data/db/connection';
import './config/passport';

const app = express();

app.set('trust proxy', 1);
app.use(
	cors({
		origin: (origin, callback) => {
			if (['http://localhost', 'https://staging.codetrain.xyz'].includes(origin as string)) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession(cookieConfig));

app.use(passport.initialize());
app.use(ENV.APP.API_PATH, authorizationMiddleware(WHITE_ROUTES));
app.use(ENV.APP.API_PATH, initApi());
app.use(errorHandlerMiddleware);

app.listen(ENV.APP.PORT, () => {
	console.info(`Server is running on port ${ENV.APP.PORT}`);
});
