import React from 'react';
import ClansList from './components/clans-list';
import { IClansProps } from '../types';
import styles from './clans.module.scss';

const ClansPage: React.FC<IClansProps> = ({ user, clans, joinClan, leaveClan }) => {
	return (
		<div className={styles.container}>
			<h4>Clans</h4>
			<ClansList joinClan={joinClan} leaveClan={leaveClan} clans={clans} userId={user.id} />
		</div>
	);
};

export default ClansPage;
