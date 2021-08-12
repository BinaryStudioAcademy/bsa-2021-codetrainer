import jwt, { Secret } from 'jsonwebtoken';
import { ENV } from '../../common';
import { TokenTypes } from './token-types';

export const verifyToken = (token: string, type: TokenTypes) =>
	jwt.verify(token, ENV.JWT.SECRET as Secret, { maxAge: ENV.JWT[type] }) as jwt.JwtPayload;
