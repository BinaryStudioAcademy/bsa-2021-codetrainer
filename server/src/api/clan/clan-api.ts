import { Router } from 'express';
import { ClanApiPath, REQ_TYPE } from '../../common';
import {
	clanAdminPermissionMiddleware,
	clanMemberPermissionMiddleware,
	dataValidationMiddleware,
	SchemasDataValidation,
	checkClanIdMiddleware,
} from '../../middleware';
import { ClanService } from '../../services';
import { IUserFields } from '../../types';

export const initClan = (appRouter: typeof Router, services: { clan: ClanService }) => {
	const { clan: clansService } = services;
	const router = appRouter();

	router
		.get(ClanApiPath.ROOT, (req, res, next) =>
			clansService
				.getClans(req.body)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(`${ClanApiPath.ROOT}:id`, clanMemberPermissionMiddleware, (req, res, next) =>
			clansService
				.getClan(req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.post(
			ClanApiPath.ROOT,
			dataValidationMiddleware(SchemasDataValidation.clanFieldsSchema, REQ_TYPE.BODY),
			(req, res, next) =>
				clansService
					.create(req.user, req.body)
					.then((data) => res.send(data))
					.catch(next),
		)
		.put(
			ClanApiPath.ROOT,
			clanAdminPermissionMiddleware,
			dataValidationMiddleware(SchemasDataValidation.clanFieldsSchema, REQ_TYPE.BODY),
			checkClanIdMiddleware,
			(req, res, next) =>
				clansService
					.update(req.clan, req.body)
					.then((data) => res.send(data))
					.catch(next),
		)
		.delete(ClanApiPath.ROOT, clanAdminPermissionMiddleware, checkClanIdMiddleware, (req, res, next) =>
			clansService
				.delete(req.clan)
				.then((data) => res.send(data))
				.catch(next),
		);

	return router;
};
