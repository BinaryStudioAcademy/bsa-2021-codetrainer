import React, { useMemo } from 'react';
import { IClanProps } from '../types';
import ClanInfo from './components/clan-info';
import MembersList from './components/members-list';
import styles from './clan.module.scss';
import { Spinner } from 'components';
import { ClanModal, ConfirmModal, Modal } from 'components/modals';
import { CommunityMember } from './components/community-member';
import ClanActions from './components/clan-actions';
import { TVisitor } from './types';
import { MemberRoles } from 'common/enum/app/clans';
import { ClanModalType } from 'components/modals/clan-modal/types';
import { WebApi } from 'typings/webapi';

const ClanPage: React.FC<IClanProps> = ({ clan, visitor: user, clanActions, members, invitation, modals }) => {
	const visitor: TVisitor = useMemo(() => {
		const isMember = Boolean(user?.clan) && user?.clan?.id === clan?.id;
		return {
			isMember,
			isAdmin: isMember && user?.profileClan?.role === MemberRoles.ADMIN,
		};
	}, [clan, user]);

	const inviteModalElements = useMemo(
		() => (
			<div>
				{modals.isInvitationLoading ? (
					<Spinner />
				) : (
					invitation.community.map((toUser: WebApi.Entities.IUser) => (
						<CommunityMember
							key={toUser.id}
							user={toUser}
							fromUser={user}
							handleInviteClick={invitation.onInvite}
						/>
					))
				)}
			</div>
		),
		[invitation],
	);

	const initial = useMemo(() => {
		const { name, description, isPublic, avatar, cover, maxMembers } = clan;
		return {
			name,
			description,
			isPublic,
			avatar,
			cover,
			maxMembers,
		};
	}, [clan]);

	return (
		<>
			<Modal
				isOpen={modals.isInvitationOpen}
				setIsOpen={modals.setIsInvitationOpen}
				elements={{
					title: `Invite Friends To ${clan?.name}`,
					body: inviteModalElements,
					showCloseButton: true,
				}}
			/>
			<ClanModal
				isOpen={modals.isEditOpen}
				setIsOpen={modals.setIsEditOpen}
				isLoading={modals.isEditLoading}
				type={ClanModalType.EDIT}
				initial={initial}
				onSubmit={clanActions.onEdit}
				onDelete={clanActions.onDelete}
			/>
			<ConfirmModal
				isOpen={modals.isLeaveOpen}
				setIsOpen={modals.setIsLeaveOpen}
				onConfirm={(confirm) => {
					modals.setIsLeaveOpen(false);
					if (confirm) {
						clanActions.onLeave();
					}
				}}
				confirm="Leave"
				elements={{
					title: `Leave the ${clan.name}`,
					body: `Do you realy want leave the ${clan.name}?`,
				}}
			/>
			<div className={styles.container}>
				<ClanInfo clan={clan} />
				<ClanActions
					visitor={visitor}
					handleJoin={clanActions.onJoin}
					handleLeave={() => modals.setIsLeaveOpen(true)}
					handleEdit={() => modals.setIsEditOpen(true)}
					handleInvitation={() => {
						invitation.handleInviteClick();
						modals.setIsInvitationOpen(true);
					}}
				/>
				{clan.members.length ? <MembersList {...members} /> : <div>This Clan has no members</div>}
			</div>
		</>
	);
};

export default ClanPage;
