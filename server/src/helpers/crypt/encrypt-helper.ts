import { hash } from 'bcrypt';
import { USER_PASSWORD_SALT_ROUNDS } from '../../common';

export const encrypt = (data: string) => hash(data, USER_PASSWORD_SALT_ROUNDS);
