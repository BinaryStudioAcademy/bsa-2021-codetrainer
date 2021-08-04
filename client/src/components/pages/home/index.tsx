import React from 'react';
import styles from './home-page.module.scss';
import Community from './components/community/index';
import Feed from './components/feed/index';
import { IHomeProps } from './interface';

const Home: React.FC<IHomeProps> = ({
	activeUser,
	users,
	messages,
	selectedFeedCategory,
	onSelectFeedCategory,
	isLastPage,
	nextTaskContent,
}) => {
	return (
		<div className={styles.container}>
			<h3 className={styles.userGreeting}>Hi, {activeUser.name}!</h3>

			<div className={styles.nextTaskWrapper}>{nextTaskContent}</div>

			<div className={styles.communityWrapper}>
				<Community users={users} />
			</div>

			<div className={styles.feedWrapper}>
				<Feed
					messages={messages}
					selectedFeedCategory={selectedFeedCategory}
					onSelectFeedCategory={onSelectFeedCategory}
					isLastPage={isLastPage}
				/>
			</div>
		</div>
	);
};

export default Home;
