import React from 'react';
import clsx from 'clsx';
import CommunityUser from '../community-user';
import styles from './community.module.scss';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import { ICommunityProps } from './interface';
import { ClanModal } from 'components/modals';

const Community: React.FC<ICommunityProps> = ({ users }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const openModal = () => {
		setIsOpen(true);
	};
	return (
		<div className={styles.community}>
			<ClanModal isOpen={isOpen} setIsOpen={setIsOpen} />
			<div>
				<h4 className={styles.communityHeader}>Community</h4>
				<p className={styles.communityDescription}>
					You are automatically given an allegiance with anyone who is in the same clan as you. You can also
					become allies with other warriors by following each other or inviting new warriors to join.
				</p>

				<div className={styles.communityTableHeader}>
					<h5 className={styles.communityColumnTitle}>User</h5>
					<h5 className={styles.communityColumnTitle}>Clan</h5>
					<h5 className={styles.communityColumnTitle}>Honor</h5>
				</div>

				<div className={styles.communityTableBody}>
					<div className={styles.communityColumn}>
						{users.map((user) => (
							<CommunityUser key={user.id} {...user} />
						))}
					</div>

					<div className={styles.communityColumn}>
						{users.map((user) => (
							<p key={user.id} className={styles.columnText}>
								{user.clan?.name}
							</p>
						))}
					</div>

					<div className={styles.communityColumn}>
						{users.map((user) => (
							<p key={user.id} className={styles.columnText}>
								{user.honor}
							</p>
						))}
					</div>
				</div>
				<div className={styles.buttonsContainer}>
					<Button onClick={openModal} className={clsx(ButtonClasses.red, styles.createButton)}>
						Create New Clan
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Community;
