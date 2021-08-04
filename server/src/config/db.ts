import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ENV } from '../common';

const {
	DATABASE: database,
	USERNAME: username,
	PASSWORD: password,
	HOST: host,
	PORT: port,
	DIALECT: type,
	SYNCHRONIZE: synchronize,
	LOGGING: logging,
	MIGRATIONS: migrations,
	ENTITIES: entities,
	MIGRATIONS_DIR: migrationsDir,
	ENTITIES_DIR: entitiesDir,
	SSL: ssl,
} = ENV.DB;

export const dbConfig = {
	namingStrategy: new SnakeNamingStrategy(),
	database,
	username,
	password,
	host,
	port,
	type,
	synchronize: synchronize === 'true',
	logging: logging === 'true',
	migrations: [migrations],
	entities: [entities],
	ssl: ssl === 'true' ? { rejectUnauthorized: false } : false,
	cli: {
		entitiesDir,
		migrationsDir,
	},
} as ConnectionOptions;
