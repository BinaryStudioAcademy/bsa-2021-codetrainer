import { config } from 'dotenv';

config();

export function getEnv(variable: string): string {
	if (!process.env[variable]) {
		throw new Error(`${variable} doesn't exist`);
	}
	return process.env[variable] as string;
}
