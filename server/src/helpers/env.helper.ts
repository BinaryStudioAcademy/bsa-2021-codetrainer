import { config } from 'dotenv';

config();

export function getEnv(variable: string): string {
	return process.env[variable] as string;
}
