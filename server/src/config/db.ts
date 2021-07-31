import { ConnectionOptions } from 'typeorm';
import { ENV } from '../common';
import { User } from '../data/models';

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
	SSL: ssl,
} = ENV.DB;

export const dbConfig = {
	database,
	username,
	password,
	host,
	port,
	type,
	synchronize: synchronize === 'true',
	logging: logging === 'true',
	migrations: [migrations],
	entities: [User],
	ssl: ssl === 'true' ? { rejectUnauthorized: false } : false,
} as ConnectionOptions;
