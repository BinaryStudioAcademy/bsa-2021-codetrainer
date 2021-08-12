import { Router } from 'express';
import { FollowersApiPath, REQ_TYPE } from '../../common';
import { TFollowerService } from '../../services';
import { dataValidationMiddleware, SchemasDataValidation } from '../../middleware';

export const initFollower = (appRouter: typeof Router, services: { follower: TFollowerService }) => {
	const { follower: followerService } = services;
	const router = appRouter();

	router
		.post(
			FollowersApiPath.ALL,
			dataValidationMiddleware(SchemasDataValidation.followerFieldsSchema, REQ_TYPE.BODY),
			(req, res, next) => {
				followerService
					.create(req.body)
					.then((data) => res.send(data))
					.catch(next);
			},
		)
		.get(FollowersApiPath.FOLLOWERS, (req, res, next) => {
			followerService
				.getFollowers(req.params.id)
				.then((data) => res.send(data))
				.catch(next);
		})
		.get(FollowersApiPath.FOLLOWING, (req, res, next) => {
			followerService
				.getFollowing(req.params.id)
				.then((data) => res.send(data))
				.catch(next);
		})
		.delete(
			FollowersApiPath.ONE,
			dataValidationMiddleware(SchemasDataValidation.followerFieldsSchema, REQ_TYPE.BODY),
			(req, res, next) => {
				followerService
					.delete(req.body)
					.then((data) => res.send(data))
					.catch(next);
			},
		);

	return router;
};
