import jwt, { Secret } from 'jsonwebtoken';
import { ENV } from '../../common';
import { TokenTypes } from './token-types';

export const createToken = (data: Record<string, string>, type: TokenTypes) =>
	jwt.sign(data, ENV.JWT.SECRET as Secret, { expiresIn: ENV.JWT[type] });
