import jwt, { Secret } from 'jsonwebtoken';
import { ENV } from '../../common';

export const createToken = (data: Record<string, string>) =>
	jwt.sign(data, ENV.JWT.SECRET as Secret, {
		issuer: ENV.JWT.ISSUER,
		expiresIn: ENV.JWT.EXPIRES_IN
	});
