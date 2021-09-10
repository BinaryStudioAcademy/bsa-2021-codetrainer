import { FullscreenLoader } from 'components';
import { CollectionPage } from 'components/pages/collection';
import historyHelper from 'helpers/history.helper';
import { useAppSelector, useUserSelector } from 'hooks/useAppSelector';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { deleteCollection, deleteFromCollection } from 'services/collections.service';
import * as actions from './logic/actions';

interface ICollectionPage {}

export const CollectionContainer = ({}: ICollectionPage) => {
	const dispatch = useDispatch();
	const user = useUserSelector();
	const { id } = useParams<{ id: string }>();
	useEffect(() => {
		if (user && user.id) {
			dispatch(actions.fetchCollections({ userId: user?.id }));
		}
	}, []);
	const { collections, isLoading } = useAppSelector((store) => store.collections);
	const collection = collections.find((item) => item.id === id);

	const handleDeleteTask = (id: string) => {
		if (collection && collection.id) {
			deleteFromCollection(collection.id, id);
		}
		if (user && user.id) {
			dispatch(actions.fetchCollections({ userId: user?.id }));
		}
	};

	const handleDeleteCollection = (id: string) => {
		deleteCollection(id);
		historyHelper.push('/home');
	};
	if (!collection) {
		return <FullscreenLoader />;
	}
	return isLoading ? (
		<FullscreenLoader />
	) : (
		<CollectionPage
			collection={collection}
			handleDeleteTask={handleDeleteTask}
			handleDeleteCollection={handleDeleteCollection}
		/>
	);
};
