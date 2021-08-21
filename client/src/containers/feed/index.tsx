import React, { useEffect, useState } from 'react';
import Feed from '../../components/pages/home/components/feed';
import { getMessages } from '../home-page/logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../typings/root-state';

const testMessages = {
	messages: [
		{
			id: '01',
			userImageSource: '',
			userName: 'Angel Mango',
			clan: 'Clan “Fiksiki”',
			date: '2 hour ago',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in turpis sed vitae egestas nullam semper aenean. Neque id tortor, nibh netus viverra sed orci. Convallis faucibus tempor in vitae nulla lectus.',
		},
		{
			id: '02',
			userImageSource: '',
			userName: 'Jaydon Passaquindici Arcand',
			clan: 'Clan “Fighter”',
			date: '2 hour ago',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis feugiat volutpat aliquet in. Morbi morbi sed neque metus, scelerisque enim molestie bibendum metus. Et cras venenatis nunc adipiscing cursus enim. Nullam velit arcu vitae in tincidunt fringilla nisi, magna amet.',
		},
		{
			id: '03',
			userImageSource: '',
			userName: 'Allison Ekstrom Bothman',
			clan: 'Clan “Mivina”',
			date: '2 hour ago',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in turpis sed vitae egestas nullam semper.',
		},
	],
	isLastPage: false,
};

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
				messages={messages}
				selectedFeedCategory={selectedFeedCategory}
				onSelectFeedCategory={handleSelectFeedCategory}
				isLastPage={testMessages.isLastPage}
			/>
		</>
	);
};
