import jwt, { Secret } from 'jsonwebtoken';
import { ENV } from '../../common';

export enum TokenTypes {
	ACCESS = 'access',
	REFRESH = 'refresh',
}

export const createToken = (data: Record<string, string>, type: TokenTypes) =>
	jwt.sign(data, ENV.JWT.SECRET as Secret, {
		expiresIn: ENV.JWT[type === TokenTypes.ACCESS ? 'EXPIRES_IN' : 'REFRESH_EXPIRES_IN'],
	});
