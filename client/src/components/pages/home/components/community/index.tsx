import React from 'react';
import clsx from 'clsx';
import CommunityUser from '../community-user';
import styles from './community.module.scss';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import { ICommunityProps } from './interfce';

const Community: React.FC<ICommunityProps> = ({ users }) => {
	return (
		<div className={styles.community}>
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
								{user.clan}
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
					<Button className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.addButton)}>
						Add New Friend
					</Button>
					<Button className={clsx(ButtonClasses.red, styles.createButton)}>Create New Clan</Button>
				</div>
			</div>
		</div>
	);
};

export default Community;
