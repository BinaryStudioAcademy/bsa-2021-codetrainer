import React from 'react';
import { HomePage } from 'components/pages';
import NextTaskContainer from 'containers/next-task';
import { useSelector } from 'react-redux';
import { IRootState } from '../../typings/root-state';
import { ROUTES } from '../../constants/routes';
import { Redirect } from 'react-router-dom';
import { FeedContainer } from '../feed';

const HomePageContainer: React.FC = () => {
	const user = useSelector((rootState: IRootState) => rootState.auth.userData.user);

	if (!user) {
		return <Redirect from="/home" to={ROUTES.NotFound} />;
	}

	const users = user.clan?.members.length ? user.clan.members : [user];

	return (
		<>
			<HomePage
				activeUser={user}
				users={users}
				nextTaskContent={<NextTaskContainer />}
				feedContent={<FeedContainer />}
			/>
		</>
	);
};

export default HomePageContainer;
