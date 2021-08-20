import { Router } from 'express';
import { CollectionsApiPath } from '../../common';
import { CollectionService } from '../../services';

export const initCollection = (appRouter: typeof Router, services: { collection: CollectionService }) => {
	const { collection: collectionService } = services;
	const router = appRouter();

	router
		// .get(CollectionsApiPath.ROOT, (req, res, next) => res.send('collections'))
		.get(CollectionsApiPath.ROOT, (req, res, next) =>
			collectionService
				.getCollectionByName(req.body)
				.then((data) => res.send(data || 'heh'))
				.catch(next),
		)
		.get(CollectionsApiPath.GET, (req, res, next) =>
			collectionService
				.getCollectionById(req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.post(CollectionsApiPath.CREATE, (req, res, next) =>
			collectionService
				.createCollection(req.body)
				.then((data) => res.send(data))
				.catch(next),
		)
		.delete(CollectionsApiPath.DELETE, (req, res, next) =>
			collectionService
				.deleteCollection(req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		);

	return router;
};
