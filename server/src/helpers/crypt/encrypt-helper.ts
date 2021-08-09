import { hash } from 'bcrypt';
import { USER_PASSWORD_SALT_ROUNDS } from '../../common';

export const encrypt = async (data?: string) => data && hash(data, USER_PASSWORD_SALT_ROUNDS);
