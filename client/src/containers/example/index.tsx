import React from 'react';
import styles from './example.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import { IRootState } from 'typings/root-state';
import { useToasts } from 'react-toast-notifications';
import { Button } from '../../components/basic';
import { setNotificationState } from '../notification/logic/actions';
import { NotificationType } from '../notification/logic/models';
import { TSetNotificationStateArgs } from '../notification/logic/action-types';

interface IToastDemoProps {
	content: string;
}

export const ToastDemo = ({ content }: IToastDemoProps) => {
	const { addToast } = useToasts();
	return (
		<Button
			onClick={() =>
				addToast(content, {
					appearance: 'warning',
					autoDismiss: true,
					onDismiss: () => {},
				})
			}
		>
			Add Toast
		</Button>
	);
};

const Example: React.FC = () => {
	const dispatch = useDispatch();
	const text = useSelector((rootState: IRootState) => rootState.example.name);
	const getExampleText = (exampleName: string) => {
		dispatch(actions.getExampleText({ exampleName }));
	};

	const notify = (notification: TSetNotificationStateArgs): void => {
		dispatch(setNotificationState(notification));
	};

	return (
		<div className={styles.root}>
			<h2>Example Component</h2>
			<button
				className={styles.btn}
				onClick={() => {
					getExampleText('first');
					notify({ notificationType: NotificationType.Error, message: 'fheeeeeyyfdsa' });
				}}
			>
				get first text
			</button>
			<button
				className={styles.btn}
				onClick={() => {
					getExampleText('second');
					notify({ notificationType: NotificationType.Info, message: 'fheeeeeyyfdsa' });
				}}
			>
				get second text
			</button>
			<p>{text}</p>
		</div>
	);
};

export default Example;
