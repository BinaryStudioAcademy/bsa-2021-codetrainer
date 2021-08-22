import React from 'react';
import ClansList from './components/clans-list';
import { IClansProps } from '../types';
import styles from './clans.module.scss';
import { Button } from 'components';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';

const ClansPage: React.FC<IClansProps> = ({ user, clans, joinClan, leaveClan, handleGoToClan }) => {
	return (
		<>
			<div className={styles.container}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<h4>Clans</h4>
					<Button className={clsx(ButtonClasses.blue)} onClick={handleGoToClan}>
						To my clan
					</Button>
				</div>
				<ClansList joinClan={joinClan} leaveClan={leaveClan} clans={clans} userId={user.id} />
			</div>
		</>
	);
};

export default ClansPage;
