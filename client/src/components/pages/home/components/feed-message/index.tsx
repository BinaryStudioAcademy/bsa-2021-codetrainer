import React from 'react';
import { Text } from '@blueprintjs/core';
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
					<Text tagName="span" className={styles.messageData}>
						{userName}
					</Text>
					<span className={styles.separator}></span>
					<Text tagName="span" className={styles.messageData}>
						{clan}
					</Text>
					<span className={styles.separator}></span>
					<Text tagName="span" className={styles.messageData}>
						{date}
					</Text>
				</div>
				<Text tagName="p" className={styles.messageText}>
					{text}
				</Text>
			</div>
		</div>
	);
};

export default FeedMessage;
