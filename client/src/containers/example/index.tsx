import React, { useState } from 'react';
import styles from './example.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import { showNotification } from '../notification/logic/actions';
import { IRootState } from 'typings/root-state';
import { Notification, TAlertTypes } from '../../components/basic/notification';
import { NotificationType } from '../notification/logic/models';

const props = {
	severity: 'error' as TAlertTypes,
	title: 'error',
};

const Example: React.FC = () => {
	const dispatch = useDispatch();
	const text = useSelector((rootState: IRootState) => rootState.example.name);
	const getExampleText = (exampleName: string) => {
		dispatch(actions.getExampleText({ exampleName }));
	};

	const setNotification = (notificationType: NotificationType, message: string, title?: string) => {
		dispatch(showNotification({ showNotification: true, notificationType, message, title }));
	};

	const [isOpen, setIsOpen] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	const [isOpen3, setIsOpen3] = useState(false);
	const [isOpen4, setIsOpen4] = useState(false);

	return (
		<div className={styles.root}>
			<Notification
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				{...props}
				text="hey fjdlska; kfjdslafjdslkajf sfajkldsjaflkdsja;flkdsh fhdslklaf dlsajflklds hh sf ds;"
			/>
			<Notification isOpen={isOpen2} setIsOpen={setIsOpen2} severity="info" text="info" />
			<Notification isOpen={isOpen3} setIsOpen={setIsOpen3} severity="success" text="success" />
			<Notification isOpen={isOpen4} setIsOpen={setIsOpen4} severity="warning" text="warning" />

			<h2>Example Component</h2>
			<button
				className={styles.btn}
				onClick={() => {
					setIsOpen(true);
				}}
			>
				get first text
			</button>
			<button
				className={styles.btn}
				onClick={() => {
					setIsOpen2(true);
				}}
			>
				get second text
			</button>
			<button
				className={styles.btn}
				onClick={() => {
					setIsOpen3(true);
				}}
			>
				get first text
			</button>
			<button
				className={styles.btn}
				onClick={() => {
					setIsOpen4(true);
				}}
			>
				get second text
			</button>

			<p>{text}</p>

			<h2>Example Component</h2>
			<button
				className={styles.btn}
				onClick={() => {
					getExampleText('first');
					setNotification(NotificationType.Warning, 'hey', 'hefjsa');
				}}
			>
				get first text
			</button>
			<button
				className={styles.btn}
				onClick={() => {
					getExampleText('second');
				}}
			>
				get second text
			</button>
			<p>{text}</p>
		</div>
	);
};

export default Example;
