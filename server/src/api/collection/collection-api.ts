import { Router } from 'express';
import { CollectionsApiPath } from '../../common';
import { CollectionService } from '../../services';

export const initCollection = (appRouter: typeof Router, services: { collection: CollectionService }) => {
	const { collection: collectionService } = services;
	const router = appRouter();

	router
		.get(CollectionsApiPath.ROOT, (req, res, next) =>
			collectionService
				.getCollections()
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(CollectionsApiPath.AUTHORED, (req, res, next) =>
			collectionService
				.getAuthoredCollections({
					authorId: req.query.author as string,
					skip: Number(req.query.skip) || 0,
					take: Number(req.query.take) || 10,
				})
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(CollectionsApiPath.FOLLOWED, (req, res, next) =>
			collectionService
				.getFollowedCollections({
					followerId: req.query.follower as string,
					skip: Number(req.query.skip) || 0,
					take: Number(req.query.take) || 10,
				})
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(CollectionsApiPath.ID, (req, res, next) =>
			collectionService
				.getCollectionById(req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.post(CollectionsApiPath.ROOT, (req, res, next) =>
			collectionService
				.createEmptyCollection(req.user, req.body)
				.then((data) => res.send(data))
				.catch(next),
		)
		.patch(CollectionsApiPath.ID, (req, res, next) => {
			collectionService
				.addTaskToCollection(req.params.id, req.body.id)
				.then((data) => res.send(data))
				.catch(next);
		})
		.delete(CollectionsApiPath.ID, (req, res, next) =>
			collectionService
				.deleteCollection(req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.delete(`${CollectionsApiPath.ID}${'/task'}`, (req, res, next) =>
			collectionService
				.removeTaskFromCollection((req.params as any).id, req.body.id)
				.then((data) => res.send(data))
				.catch(next),
		);

	return router;
};
