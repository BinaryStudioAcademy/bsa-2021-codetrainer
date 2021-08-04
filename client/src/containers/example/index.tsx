import React from 'react';
import styles from './example.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import { IRootState } from 'typings/root-state';
import { showNotification } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';

const Example: React.FC = () => {
	const dispatch = useDispatch();
	const text = useSelector((rootState: IRootState) => rootState.example.name);
	const getExampleText = (exampleName: string) => {
		dispatch(actions.getExampleText({ exampleName }));
	};
	console.log(getExampleText);

	return (
		<div className={styles.root}>
			<h2>Example Component</h2>
			<button
				className={styles.btn}
				onClick={() =>
					dispatch(
						showNotification({
							notification: { notificationType: NotificationType.Success, message: '234' },
						}),
					)
				}
			>
				get first text
			</button>
			<button
				className={styles.btn}
				onClick={() =>
					dispatch(
						showNotification({
							notification: { notificationType: NotificationType.Error, message: 'TEST' },
						}),
					)
				}
			>
				get second text
			</button>
			<p>{text}</p>
		</div>
	);
};

export default Example;
