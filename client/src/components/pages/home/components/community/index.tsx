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
					You automatically belong to a community with anyone who is in the same clan as you. You can also be
					a community with other warriors by following each other or inviting new warriors to join.
				</p>

				<table className={styles.communityUsers}>
					<tbody>
						<tr>
							<td className={styles.communityUser}>
								<span className={styles.communityColumnTitle}>User</span>
							</td>
							<td></td>
							<td></td>
							<td className={styles.communityClan}>
								<span className={styles.communityColumnTitle}>Clan</span>
							</td>
							<td className={styles.communityHonor}>
								<span className={styles.communityColumnTitle}>Honor</span>
							</td>
						</tr>
						{users.map((user) => (
							<CommunityUser user={user} key={user.id} />
						))}
					</tbody>
				</table>
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
