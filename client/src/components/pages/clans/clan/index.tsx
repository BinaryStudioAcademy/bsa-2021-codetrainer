import React from 'react';
import { IClanProps } from '../types';
import ClanInfo from './components/clan-info';
import MembersList from './components/members-list';
import MembersSortPanel from './components/members-sort-panel';
import styles from './clan.module.scss';
import { Button, Spinner } from 'components';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';
import { Modal } from 'components/modals';
import { CommunityMember } from './components/community-member';

const ClanPage: React.FC<IClanProps> = ({
	modalShown,
	setModalShown,
	clan,
	sortByRank,
	sortByTime,
	leaveClan,
	currentSort,
	handleInviteClick,
	user,
	handleDeleteClan,
	modalLoading,
	community,
	handleInvitationSend,
	isInvitationOpen,
	setIsInvitationOpen,
}) => {
	const inviteModalElements = (
		<div>
			{modalLoading ? (
				<Spinner />
			) : (
				community.map(({ user: toUser }: any) => {
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
	const deleteModalElements = (
		<div style={{ display: 'flex', flexDirection: 'column', height: '260px', justifyContent: 'space-between' }}>
			<p>
				It will be impossible to undo deletion of the clan. <b>Still delete it?</b>
			</p>
			<div style={{ display: 'flex', width: '50%', justifyContent: 'space-around', bottom: 0 }}>
				<Button
					className={clsx(ButtonClasses.red, ButtonClasses.filled)}
					onClick={() => {
						setModalShown(false);
						handleDeleteClan();
					}}
				>
					Delete
				</Button>
				<Button className={ButtonClasses.red} onClick={() => setModalShown(false)}>
					Cancel
				</Button>
			</div>
		</div>
	);
	return (
		<>
			<Modal
				isOpen={modalShown}
				setIsOpen={setModalShown}
				elements={{ title: 'Do you really want to delete this clan?', body: deleteModalElements }}
			/>
			<Modal
				isOpen={isInvitationOpen}
				setIsOpen={setIsInvitationOpen}
				elements={{
					title: `Invite Friends To ${clan?.name}`,
					body: inviteModalElements,
					showCloseButton: true,
				}}
			/>
			<div className={styles.container}>
				<ClanInfo clan={clan} leaveClan={leaveClan} handleInviteClick={handleInviteClick} />
				<section className={styles.membersSection}>
					<MembersSortPanel sortByRank={sortByRank} sortByTime={sortByTime} currentSort={currentSort} />
					<MembersList members={clan.members} />
				</section>
			</div>
			{user?.profileClan?.role === 'admin' ? (
				<Button
					className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.delete)}
					onClick={() => setModalShown(true)}
				>
					Delete clan
				</Button>
			) : null}
		</>
	);
};

export default ClanPage;
