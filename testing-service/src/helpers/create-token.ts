import jwt, { Secret } from 'jsonwebtoken';
import { ENV } from '../common/env-enum';

export const createToken = (data: Record<string, string>) =>
	jwt.sign(data, ENV.JWT.SECRET as Secret, { expiresIn: ENV.JWT.EXPIRES_IN });
