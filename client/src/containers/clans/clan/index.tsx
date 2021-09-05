import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { ClanPage, FullscreenLoader } from 'components';
import Button, { ButtonClasses } from 'components/basic/button';
import * as actions from './logic/actions';
import { useDispatch } from 'react-redux';
import { ROUTES } from 'constants/routes';
import { sendIntitationLetter } from 'services/follower/followers.service';
import { useClanSelector, useUserSelector } from 'hooks/useAppSelector';
import { Link, useParams } from 'react-router-dom';
import { ClanPageStatus, IMemberWithPosition } from './logic/types';
import { WebApi } from 'typings/webapi';
import { IClanForm } from 'components/modals/clan-modal/types';
import { Order } from 'helpers/table-helper';
import { membersSorts } from './logic/config';
import styles from './clan.module.scss';
import clsx from 'clsx';

const Clan: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams<{ id: string }>();

	const {
		data: clan,
		community,
		status,
		editStatus,
		invitationStatus,
		error,
		membersSort,
		membersFilter,
	} = useClanSelector();
	const user: WebApi.Entities.IUser = useUserSelector() as WebApi.Entities.IUser;

	const communityWithoutClan: any[] = community.filter((user) => user.clan === null);

	const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
	const [isInvitationOpen, setIsInvitationOpen] = useState<boolean>(false);
	const [isLeaveOpen, setIsLeaveOpen] = useState<boolean>(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

	useEffect(() => {
		if (id) {
			dispatch(actions.fetchClan({ id }));
		} else {
			history.push(ROUTES.Clans);
		}
	}, [id]);

	const membersData: IMemberWithPosition[] = useMemo(() => {
		if (clan) {
			const sort =
				membersSort.order === Order.ASC
					? membersSorts[membersSort.strategy]
					: (a: IMemberWithPosition, b: IMemberWithPosition) => -membersSorts[membersSort.strategy](a, b);

			return [...clan.members]
				.sort((member) => member.honor)
				.map((member, index) => ({ ...member, position: index + 1 }))
				.filter((member) =>
					`${member.name} ${member.surname}`
						.toLocaleLowerCase()
						.includes((membersFilter?.name ?? '').toLocaleLowerCase()),
				)
				.sort(sort);
		}
		return [];
	}, [clan, membersSort, membersFilter]);

	const onToggleClanMember = () => {
		dispatch(actions.toggleClanMember());
	};

	const onDelete = useCallback(() => {
		dispatch(actions.deleteClan());
	}, [clan]);

	const onEdit = useCallback(
		(form: IClanForm) => {
			dispatch(actions.updateClan({ id: clan?.id as string, form }));
		},
		[clan],
	);

	const onInvite = useCallback(
		async (toUser: WebApi.Entities.IUser) => {
			sendIntitationLetter(user, toUser);
		},
		[user],
	);

	const handleInviteClick = async () => {
		dispatch(actions.fetchCommunity({ userId: user.id }));
	};

	switch (status) {
		case ClanPageStatus.SUCCESS:
		case ClanPageStatus.ERROR: {
			return (
				<>
					{error && <div className={styles.error}>{error}</div>}
					{clan ? (
						<ClanPage
							clan={clan}
							visitor={user}
							clanActions={{
								onLeave: onToggleClanMember,
								onJoin: onToggleClanMember,
								onDelete,
								onEdit,
							}}
							members={{
								data: membersData,
								sort: membersSort,
								filter: membersFilter,
								setSort: (sort) => dispatch(actions.setMembersSort({ sort })),
								setFilter: (filter) => dispatch(actions.setMembersFilter({ filter })),
							}}
							invitation={{
								onInvite,
								handleInviteClick,
								community: communityWithoutClan,
							}}
							modals={{
								isEditOpen,
								isInvitationOpen,
								isLeaveOpen,
								setIsEditOpen,
								setIsInvitationOpen,
								setIsLeaveOpen,
								isEditLoading: editStatus === ClanPageStatus.LOADING,
								isInvitationLoading: invitationStatus === ClanPageStatus.LOADING,
								isDeleteOpen,
								setIsDeleteOpen,
							}}
						/>
					) : (
						<Link to={ROUTES.Clans}>
							<Button className={clsx(ButtonClasses.red, ButtonClasses.filled)}>Go back to clans</Button>
						</Link>
					)}
				</>
			);
		}
		case ClanPageStatus.LOADING:
		default: {
			return <FullscreenLoader />;
		}
	}
};

export default Clan;
