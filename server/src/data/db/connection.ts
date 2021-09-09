import { createConnection } from 'typeorm';
import { dbConfig } from '../../config/db';

createConnection(dbConfig)
	.then(async (connection) => {
		await connection.runMigrations();
		console.info('DB connected');
	})
	.catch((error) => {
		console.error('DB connection failed');
		console.log(error);
		process.exit(1);
	});
