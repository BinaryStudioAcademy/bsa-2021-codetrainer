import React, { useCallback, useEffect, useState } from 'react';
import Feed from '../../components/pages/home/components/feed';
import { getMessages, setPage } from '../home-page/logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../typings/root-state';
import moment from 'moment';

export const FeedContainer = () => {
	const dispatch = useDispatch();
	const { messages, page, messagesCount, messagesOnPage } = useSelector(({ home }: IRootState) => home.state);
	const [selectedFeedCategory, setSelectedFeedCategory] = useState('All');

	const handleSelectFeedCategory = (category: string) => {
		setSelectedFeedCategory(category);
	};

	useEffect(() => {
		dispatch(getMessages({ skip: 0, take: messagesOnPage, isLoadPage: true }));
	}, []);

	const handleClickMoreMessages = useCallback(() => {
		if (page * messagesOnPage >= messagesCount) {
			return;
		}
		dispatch(setPage({ page: page + 1 }));
		dispatch(getMessages({ skip: page * messagesOnPage, take: messagesOnPage }));
	}, [page, messagesCount, messagesOnPage]);

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
				isLastPage={page * messagesOnPage >= messagesCount}
				onClick={handleClickMoreMessages}
			/>
		</>
	);
};
