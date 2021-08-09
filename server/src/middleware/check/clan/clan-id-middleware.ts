import { RequestHandler } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpCodes, CREATE_ERRORS, ERRORS } from '../../../common';

import { ClanRepository } from '../../../data';

export const checkClanIdMiddleware: RequestHandler = async (req, res, next) => {
	const repository = getCustomRepository(ClanRepository);
	const clan = req.user.clan && (await repository.getById(req.user.clan.id));
	if (!clan) {
		res.status(HttpCodes.BAD_REQUEST).send(CREATE_ERRORS(ERRORS.NO_CLAN));
	} else {
		req.clan = clan;
		next();
	}
};
