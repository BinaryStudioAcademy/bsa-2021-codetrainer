import React, { useEffect, useState } from 'react';
import Feed from '../../components/pages/home/components/feed';
import { getMessages } from '../home-page/logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../typings/root-state';
import moment from 'moment';

export const FeedContainer = () => {
	const dispatch = useDispatch();
	const messages = useSelector((rootState: IRootState) => rootState.home.state.messages);
	const [selectedFeedCategory, setSelectedFeedCategory] = useState('All');

	const handleSelectFeedCategory = (category: string) => {
		setSelectedFeedCategory(category);
	};

	useEffect(() => {
		dispatch(getMessages());
	}, []);

	return (
		<>
			<Feed
				messages={
					messages
						? messages.map((item) => {
								return {
									...item,
									createdAt: moment(item.createdAt).fromNow(),
								};
						  })
						: null
				}
				selectedFeedCategory={selectedFeedCategory}
				onSelectFeedCategory={handleSelectFeedCategory}
				isLastPage={false}
			/>
		</>
	);
};
