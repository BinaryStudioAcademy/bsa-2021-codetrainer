import { Router } from 'express';
import { ProfileClanApiPath } from '../../common/enum/api/profile-clan-api-path';
import { ProfileClanService } from '../../services';

export const initProfileClan = (appRouter: typeof Router, services: { profileClan: ProfileClanService }) => {
	const { profileClan: profileClanService } = services;

	const router = appRouter();

	router.put(ProfileClanApiPath.TO_ONE_BY_ID, async (req, res, next) => {
		profileClanService
			.updateRole(req.params.id,req.body.role)
			.then((data)=>res.send(data))
			.catch(next);
	});

	router.get(ProfileClanApiPath.TO_ONE_BY_ID, async (req, res, next) => {
		profileClanService
			.getById(req.params.id)
			.then((data) => res.send(data))
			.catch(next);
	});
	return router;
};