import jwt, { Secret } from 'jsonwebtoken';
import { ENV } from '../../common';

export const verifyToken = (token: string) =>
	jwt.verify(token, ENV.JWT.SECRET as Secret, { maxAge: ENV.JWT.REFRESH_EXPIRES_IN }) as jwt.JwtPayload;
