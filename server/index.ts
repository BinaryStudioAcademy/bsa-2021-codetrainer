import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { appPort } from './config/app.config';
import routes from './src/routes';

createConnection().then(async (connection) => {
	await connection.runMigrations();
	const app = express();
	app.use(cors());
	app.use(express.json());

	app.use('/api', routes);

	app.listen(appPort, () => {
		// eslint-disable-next-line no-console
		console.log(`Server is running on port ${appPort}`);
	});
});
