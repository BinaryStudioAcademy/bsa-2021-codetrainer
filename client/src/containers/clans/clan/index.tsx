import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ClanPage } from 'components';
import * as actions from './logic/actions';
import * as clansActions from './../clans/logic/actions';
import * as userActions from '../../user/logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import { ROUTES } from 'constants/routes';
import { getCommunityByUserId, sendIntitationLetter } from 'services/follower/followers.service';
import { deleteClan } from 'services/clans.service';
import { useUserSelector } from 'hooks/useAppSelector';
import { IUser } from 'typings/common/IUser';
import { useParams } from 'react-router-dom';

const Clan: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const currentSort = useSelector((state: IRootState) => state.clan.options.sortBY);
	const user: IUser | null = useUserSelector();
	const clan = useSelector((state: IRootState) => state.clan.data);

	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) {
			dispatch(actions.clearClan());
			dispatch(actions.fetchClan({ id }));
		} else {
			history.push(ROUTES.Clans);
		}
	}, [id]);

	const sortByRank = () => {
		dispatch(actions.sortClanMemberByRank());
	};

	const sortByTime = () => {
		dispatch(actions.sortClanMemberByTime());
	};

	const leaveClan = () => {
		dispatch(actions.leaveClan());
	};

	const joinClan = (id: string) => {
		dispatch(clansActions.joinClan({ id }));
	};

	const handleDeleteClan = async () => {
		await deleteClan();
		dispatch(actions.clearClan());
		dispatch(userActions.setUserClan({ clan: null }));
		history.push(ROUTES.Clans);
	};
	const handleInviteClick = async () => {
		setIsInvitationOpen(true);
		setModalLoading(true);
		if (user) {
			const users: IUser[] = await getCommunityByUserId(user.id);
			setCommunity(users);
			setModalLoading(false);
		}
	};
	const handleInvitationSend = (fromUser: any, toUser: any) => {
		sendIntitationLetter(fromUser, toUser);
	};
	const [modalLoading, setModalLoading] = useState(false);
	const [community, setCommunity] = useState<any[]>([]);
	const [isInvitationOpen, setIsInvitationOpen] = useState(false);
	const [modalShown, setModalShown] = useState(false);
	return (
		clan && (
			<ClanPage
				clan={clan}
				isOwnClan={id === user?.clan?.id}
				sortByRank={sortByRank}
				sortByTime={sortByTime}
				leaveClan={leaveClan}
				joinClan={joinClan}
				currentSort={currentSort}
				user={user}
				handleDeleteClan={handleDeleteClan}
				modalShown={modalShown}
				setModalShown={setModalShown}
				handleInviteClick={handleInviteClick}
				modalLoading={modalLoading}
				community={community}
				handleInvitationSend={handleInvitationSend}
				isInvitationOpen={isInvitationOpen}
				setIsInvitationOpen={setIsInvitationOpen}
			/>
		)
	);
};

export default Clan;
