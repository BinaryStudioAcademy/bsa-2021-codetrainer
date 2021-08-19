import React, { useState } from 'react';
import { HomePage } from 'components/pages';
import NextTaskContainer from 'containers/next-task';
import { useSelector } from 'react-redux';
import { IRootState } from '../../typings/root-state';
import { ROUTES } from '../../constants/routes';
import { Redirect } from 'react-router-dom';

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

const HomePageContainer: React.FC = () => {
	const user = useSelector((rootState: IRootState) => rootState.auth.userData.user);
	const [selectedFeedCategory, setSelectedFeedCategory] = useState('All');

	const handleSelectFeedCategory = (category: string) => {
		setSelectedFeedCategory(category);
	};

	if (!user) {
		return <Redirect from="/home" to={ROUTES.NotFound} />;
	}

	const users = user.clan?.members.length ? user.clan.members : [user];

	return (
		<>
			<HomePage
				activeUser={user}
				users={users}
				messages={testMessages.messages}
				selectedFeedCategory={selectedFeedCategory}
				onSelectFeedCategory={handleSelectFeedCategory}
				isLastPage={testMessages.isLastPage}
				nextTaskContent={<NextTaskContainer />}
			/>
		</>
	);
};

export default HomePageContainer;
