import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ClanPage, Modal, Spinner } from 'components';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import { ROUTES } from 'constants/routes';
import { getCommunityByUserId, sendIntitationLetter } from 'services/follower/followers.service';
import { getUserById } from 'services';
import { CommunityMember } from 'components/pages/clans/clan/components/community-member';

const Clan: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const currentSort = useSelector((state: IRootState) => state.clan.options.sortBY);
	const user = useSelector((state: IRootState) => state.auth.userData.user);
	const clan = useSelector((state: IRootState) => state.clan.data);

	useEffect(() => {
		const clanId = user?.clan?.id;

		if (clanId) {
			dispatch(actions.clearClan());
			dispatch(actions.fetchClan({ id: clanId }));
		} else {
			history.push(ROUTES.Clans);
		}
	}, []);

	const sortByRank = () => {
		dispatch(actions.sortClanMemberByRank());
	};

	const sortByTime = () => {
		dispatch(actions.sortClanMemberByTime());
	};

	const leaveClan = () => {
		dispatch(actions.leaveClan());
		history.push(ROUTES.Clans);
	};

	const handleInviteClick = async () => {
		setIsOpen(true);
		setModalLoading(true);
		if (user) {
			const userCommunity: string[] = await getCommunityByUserId(user.id);
			const users = await userCommunity.map(async (user) => {
				const fetchedUser = getUserById(user);
				return fetchedUser;
			});
			const result = await Promise.all([...users]).then((fetchedUsers) => {
				const result = fetchedUsers.filter(({ user }) => {
					if (user.clan === null) {
						return user;
					}
				});
				return result;
			});
			setCommunity(result);
			setModalLoading(false);
		}
	};
	const handleInvitationSend = (fromUser: any, toUser: any) => {
		sendIntitationLetter(fromUser, toUser);
	};
	const [modalLoading, setModalLoading] = useState(false);
	const [community, setCommunity] = useState<any[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const element = (
		<div>
			{modalLoading ? (
				<Spinner />
			) : (
				community.map(({ user: toUser }) => {
					return (
						<CommunityMember
							key={toUser.id}
							user={toUser}
							fromUser={user}
							handleInviteClick={handleInvitationSend}
						/>
					);
				})
			)}
		</div>
	);
	return (
		<div>
			{clan && (
				<ClanPage
					clan={clan}
					sortByRank={sortByRank}
					sortByTime={sortByTime}
					leaveClan={leaveClan}
					currentSort={currentSort}
					handleInviteClick={handleInviteClick}
				/>
			)}
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				elements={{ title: `Invite Friends To ${clan?.name}`, showCloseButton: true, body: element }}
			/>
		</div>
	);
};

export default Clan;
