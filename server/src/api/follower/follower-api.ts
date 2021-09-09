import { Router } from 'express';
import { FollowersApiPath, REQ_TYPE } from '../../common';
import { FollowersService } from '../../services';

export const initFollower = (appRouter: typeof Router, services: { follower: FollowersService }) => {
	const { follower: followerService } = services;
	const router = appRouter();

	router
		.get(FollowersApiPath.FOLLOWERS, (req, res, next) => {
			followerService
				.getFollowers(req.params.id)
				.then((data) => res.send(data))
				.catch(next);
		})
		.post(`${FollowersApiPath.ALL}:id`, (req, res, next) => {
			followerService
				.follow(req.user, req.params.id)
				.then((data) => res.send(data))
				.catch(next);
		})
		.delete(`${FollowersApiPath.ALL}:id`, (req, res, next) => {
			followerService
				.unfollow(req.user, req.params.id)
				.then((data) => res.send(data))
				.catch(next);
		})
		.get(FollowersApiPath.FOLLOWING, (req, res, next) => {
			followerService
				.getFollowing(req.params.id)
				.then((data) => res.send(data))
				.catch(next);
		})
		.get(FollowersApiPath.COMMUNITY, (req, res, next) => {
			followerService
				.getCommunity(req.params.id)
				.then((data) => res.send(data))
				.catch(next);
		})
		.delete(FollowersApiPath.ONE, (req, res, next) => {
			followerService
				.delete(req.body)
				.then((data) => res.send(data))
				.catch(next);
		});

	return router;
};
