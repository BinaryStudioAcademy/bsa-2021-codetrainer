import { compare } from 'bcrypt';

export const cryptCompare = async (data: string, encrypted?: string) =>
	Boolean(encrypted) && compare(data, encrypted as string);
