import { Request, Response } from 'express';
import { User } from '../data';

export const setResponseSession = (
	req: Request,
	res: Response,
	data: { refreshToken: string; user?: User; token: string },
) => {
	const { refreshToken, ...restData } = data;
	req.session = {
		...(req.session || {}),
		refreshToken,
	};
	res.send(restData);
};
