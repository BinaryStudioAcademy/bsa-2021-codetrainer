import React from 'react';
import moment from 'moment';
import InView from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { INotificationProps } from './interfaces';
import { mapNotificationToProps } from './helper';
import styles from './notification.module.scss';

const Notification: React.FC<INotificationProps> = ({ onRead = () => {}, ...props }) => {
	console.log(props);

	const notificationContent = (
		<>
			{props.icon ? <div className={styles.icon}>{props.icon}</div> : null}
			<div className={styles.message}>{props.children}</div>
			{!props.read ? <span className={styles.unread}>new</span> : null}
			<span className={styles.date}>{moment.duration(+new Date() - +props.date).humanize()}</span>
		</>
	);

	const notificationComponent = props.link ? (
		<Link to={props.link} className={styles.notification}>
			{notificationContent}
		</Link>
	) : (
		<div className={styles.notification}>{notificationContent}</div>
	);

	return !props.read ? (
		<InView
			onChange={(inView) => {
				if (inView) {
					onRead();
				}
			}}
		>
			{notificationComponent}
		</InView>
	) : (
		notificationComponent
	);
};

export default Notification;
export type { INotificationProps };
export { mapNotificationToProps };
