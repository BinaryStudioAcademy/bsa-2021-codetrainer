import React from 'react';
import { Card, Text } from '@blueprintjs/core';
import CommunityUser from '../community-user';
import styles from './community.module.scss';
import { Button } from 'components/basic';
import { ICommunityProps } from './interfce';

const Community: React.FC<ICommunityProps> = ({ users }) => {
	return (
		<div className={styles.community}>
			<Card>
				<Text tagName="h4" className={styles.communityHeader}>
					Community
				</Text>
				<Text className={styles.communityDescription}>
					You are automatically given an allegiance with anyone who is in the same clan as you. You can also
					become allies with other warriors by following each other or inviting new warriors to join.
				</Text>

				<div className={styles.communityTableHeader}>
					<Text tagName="h5" className={styles.communityColumnTitle}>
						User
					</Text>
					<Text tagName="h5" className={styles.communityColumnTitle}>
						Clan
					</Text>
					<Text tagName="h5" className={styles.communityColumnTitle}>
						Honor
					</Text>
				</div>

				<div className={styles.communityTableBody}>
					<div className={styles.communityColumn}>
						{users.map((user) => (
							<CommunityUser key={user.id} {...user} />
						))}
					</div>

					<div className={styles.communityColumn}>
						{users.map((user) => (
							<Text key={user.id} className={styles.columnText}>
								{user.clan}
							</Text>
						))}
					</div>

					<div className={styles.communityColumn}>
						{users.map((user) => (
							<Text key={user.id} className={styles.columnText}>
								{user.honor}
							</Text>
						))}
					</div>
				</div>
				<div className={styles.buttonsContainer}>
					<Button text="Add New Friend" className={styles.addButton} />
					<Button text="Create New Clan" className={styles.createButton} />
				</div>
			</Card>
		</div>
	);
};

export default Community;
