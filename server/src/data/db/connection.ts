import { createConnection } from 'typeorm';
import { dbConfig } from '../../config/db';

createConnection(dbConfig)
	.then(async (connection) => {
		await connection.runMigrations();
		console.info('Db connecting');
	})
	.catch(() => {
		console.error('No db connection');
		process.exit(1);
	});
