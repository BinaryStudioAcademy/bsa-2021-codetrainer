import React from 'react';
import styles from './home-page.module.scss';
import Community from './components/community/index';
import { IHomeProps } from './interface';

const Home: React.FC<IHomeProps> = ({ activeUser, users, nextTaskContent, feedContent }) => {
	return (
		<div className={styles.container}>
			<h3 className={styles.userGreeting}>Hi, {activeUser?.name}!</h3>

			<div className={styles.nextTaskWrapper}>{nextTaskContent}</div>

			<div className={styles.communityWrapper}>
				<Community users={users} />
			</div>

			<div className={styles.feedWrapper}>{feedContent}</div>
		</div>
	);
};

export default Home;
