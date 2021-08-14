import React from 'react';
import styles from './feed-message.module.scss';
import defaultUserIcon from './assets/user.svg';

interface IFeedMessageProps {
	userImageSource: string;
	userName: string;
	clan: string;
	date: string;
	text: string;
}

const FeedMessage: React.FC<IFeedMessageProps> = ({ userImageSource, userName, clan, date, text }) => {
	return (
		<div className={styles.messageUser}>
			<img className={styles.messageUserImage} src={userImageSource || defaultUserIcon} alt="user" />
			<div>
				<div className={styles.messageDataWrapper}>
					<span className={styles.messageData}>{userName}</span>
					<span className={styles.separator}></span>
					<span className={styles.messageData}>{clan}</span>
					<span className={styles.separator}></span>
					<span className={styles.messageData}>{date}</span>
				</div>
				<p className={styles.messageText}>{text}</p>
			</div>
		</div>
	);
};

export default FeedMessage;
