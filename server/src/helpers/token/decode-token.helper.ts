import jwt from 'jsonwebtoken';
import { ENV } from '../../common';

export function decodeToken(token: string): string | jwt.JwtPayload {
	return jwt.verify(token, ENV.JWT.SECRET, {
		issuer: ENV.JWT.ISSUER
	});
}
