import React from 'react';
import styles from './example.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import { IRootState } from 'typings/root-state';
import { NotificationType } from '../notification/logic/models';
import { TSetNotificationArgs } from '../notification/logic/action-types';
import { setNotificationState } from '../notification/logic/actions';

const Example: React.FC = () => {
	const dispatch = useDispatch();
	const text = useSelector((rootState: IRootState) => rootState.example.name);
	const getExampleText = (exampleName: string) => {
		dispatch(actions.getExampleText({ exampleName }));
	};
	const showNotification = (notification: TSetNotificationArgs) => {
		dispatch(setNotificationState(notification));
	};

	return (
		<div className={styles.root}>
			<h2>Notifications</h2>
			{Object.values(NotificationType).map((type) => {
				return (
					<button
						className={styles.btn}
						key={type}
						onClick={() => {
							showNotification({ notificationType: type, title: type, message: `${type} message` });
						}}
					>
						{type}
					</button>
				);
			})}
			<div>
				<button className={styles.btn} onClick={() => getExampleText('first')}>
					get first text
				</button>
				<button className={styles.btn} onClick={() => getExampleText('second')}>
					get second text
				</button>
				<p>{text}</p>
			</div>
		</div>
	);
};

export default Example;
