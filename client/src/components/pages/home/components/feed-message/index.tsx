import React from 'react';
import { Link } from 'react-router-dom';
import styles from './feed-message.module.scss';
import { Avatar } from '../../../../basic';
import { ROUTES } from 'constants/routes';

interface IFeedMessageProps {
	id: string;
	user: {
		id: string;
		avatar?: string;
		name: string;
		surname: string;
		clan: {
			id: string;
			name: string;
		};
	};
	task: {
		name: string;
		id: string;
	};
	body: string;
	createdAt: string;
}

const FeedMessage: React.FC<IFeedMessageProps> = ({ user, createdAt, body, task }) => {
	return (
		<div className={styles.messageUser}>
			<div className={styles.avatar}>
				<Avatar avatar={user?.avatar ?? ''} size={25} />
			</div>

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
					{task ? (
						<>
							<span className={styles.messageData}>Comment on</span>
							<Link className={styles.link} to={`${ROUTES.TaskInfo}/${task.id}/train`}>
								{task.name}
							</Link>
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
