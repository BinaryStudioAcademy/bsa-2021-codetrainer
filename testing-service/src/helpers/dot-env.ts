import { config } from 'dotenv';

config();

export const dotEnv = (variable: string) => {
	const value = process.env[variable];
	if (!value) {
		throw new Error(`${variable} doesn't exist`);
	}
	return value as string;
};
