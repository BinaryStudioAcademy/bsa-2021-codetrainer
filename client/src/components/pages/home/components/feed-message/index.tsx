import React from 'react';
import styles from './feed-message.module.scss';
import { Avatar } from '../../../../basic';

interface IFeedMessageProps {
	id: string;
	user: {
		id: string;
		imageSource?: string;
		name: string;
		surname: string;
		clan: {
			id: string;
			name: string;
		};
	};
	task: {
		id: string;
		name: string;
	};
	body: string;
	createdAt: Date;
}

const FeedMessage: React.FC<IFeedMessageProps> = ({ user, createdAt, body }) => {
	return (
		<div className={styles.messageUser}>
			<Avatar avatar={user.imageSource} size={25} />

			<div>
				<div className={styles.messageDataWrapper}>
					<span className={styles.messageData}>{`${user.name} ${user.surname}`}</span>
					<span className={styles.separator}></span>
					{user.clan ? (
						<>
							<span className={styles.messageData}>{`Clan "${user.clan?.name}"`}</span>
							<span className={styles.separator}></span>
						</>
					) : null}
					<span className={styles.messageData}>{createdAt}</span>
				</div>
				<p className={styles.messageText}>{body}</p>
			</div>
		</div>
	);
};

export default FeedMessage;
