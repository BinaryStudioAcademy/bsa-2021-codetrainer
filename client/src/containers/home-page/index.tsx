import React, { useEffect } from 'react';
import { HomePage } from 'components/pages';
import NextTaskContainer from 'containers/next-task';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../typings/root-state';
import { ROUTES } from '../../constants/routes';
import { Redirect } from 'react-router-dom';
import { FeedContainer } from '../feed';
import { getCommunity } from './logic/actions';

const HomePageContainer: React.FC = () => {
	const dispatch = useDispatch();
	const community = useSelector((rootState: IRootState) => rootState.home.state.community);
	const user = useSelector((rootState: IRootState) => rootState.auth.userData.user);

	if (!user) {
		return <Redirect from="/home" to={ROUTES.NotFound} />;
	}

	useEffect(() => {
		dispatch(getCommunity({ id: user.id }));
	}, []);

	const users = [];

	if (user.clan?.members) {
		users.push(...user.clan.members);
	}
	if (community) {
		users.push(...community);
	}
	if (!users.length) {
		users.push(user);
	} else {
		users.sort((a, b) => {
			return a.honor - b.honor;
		});
	}

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
