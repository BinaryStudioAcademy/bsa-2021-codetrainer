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
		.patch(CollectionsApiPath.ID, (req, res, next) =>
			collectionService
				.manageTaskInsideCollection(req.params.id, JSON.parse(req.body).id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.delete(CollectionsApiPath.ID, (req, res, next) =>
			collectionService
				.deleteCollection(req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		);

	return router;
};
