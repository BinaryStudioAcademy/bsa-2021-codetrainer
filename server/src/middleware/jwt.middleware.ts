import { Response, NextFunction } from 'express';
import { IPayload } from './models/IToken';
import { IUserRequest } from './models/IUserRequest';
import { HttpCodes } from '../common';
import { decodeToken , ValidationError } from '../helpers';

export function jwtMiddleware(req: IUserRequest, res: Response, next: NextFunction): void {
	try {
		const authorizationHeader = req.headers.authorization;
		const [, token] = (authorizationHeader ?? '').split(' '); // bearer authentication
		const payload: IPayload = decodeToken(token) as IPayload;
		if(!payload.id) {
			throw new Error();
		}
		req.userId = payload.id;
		next();
	}
	catch {
		throw new ValidationError({
			message: 'unauthorized',
			status: HttpCodes.UNAUTHORIZED
		});
	}
}
