import { compare } from 'bcrypt';

export const cryptCompare = (data: string, encrypted: string) => compare(data, encrypted);
