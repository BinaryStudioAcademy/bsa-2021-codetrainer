import { Router } from 'express';
import { ClanApiPath, REQ_TYPE } from '../../common';
import { clanPermissionMiddleware, dataValidationMiddleware, SchemasDataValidation } from '../../middleware';
import { TClanService } from '../../services';
import { IUserFields } from '../../types';

export const initClan = (appRouter: typeof Router, services: { clan: TClanService }) => {
	const { clan: clansService } = services;
	const router = appRouter();

	router
		.get(ClanApiPath.ROOT, (req, res, next) =>
			clansService
				.getClans(req.body)
				.then((data) => res.send(data))
				.catch(next),
		)
		.post(
			ClanApiPath.ROOT,
			dataValidationMiddleware(SchemasDataValidation.clanFieldsSchema, REQ_TYPE.BODY),
			(req, res, next) =>
				clansService
					.create(req.user as IUserFields, req.body)
					.then((data) => res.send(data))
					.catch(next),
		)
		.put(
			ClanApiPath.ROOT,
			clanPermissionMiddleware,
			dataValidationMiddleware(SchemasDataValidation.clanFieldsSchema, REQ_TYPE.BODY),
			(req, res, next) =>
				clansService
					.update(req.user as IUserFields, req.body)
					.then((data) => res.send(data))
					.catch(next),
		)
		.delete(ClanApiPath.ROOT, clanPermissionMiddleware, (req, res, next) =>
			clansService
				.delete({ user: req.user as IUserFields })
				.then((data) => res.send(data))
				.catch(next),
		);

	return router;
};
