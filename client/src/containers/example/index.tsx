import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import { IRootState } from 'typings/root-state';
import { authServices } from 'services';
import { NotificationType } from '../notification/logic/models';
import { TSetNotificationArgs } from '../notification/logic/action-types';
import { setNotificationState } from '../notification/logic/actions';
import { uploadImage } from 'services/images.service';
import styles from './example.module.scss';

const Example: React.FC = () => {
	const dispatch = useDispatch();
	const text = useSelector((rootState: IRootState) => rootState.example.name);
	const [file, setFile] = useState<Blob | null>(null);
	const getExampleText = (exampleName: string) => {
		dispatch(actions.getExampleText({ exampleName }));
	};
	const handleLogin = async () => {
		await authServices.login({ email: 'test@test.com', password: '123' });
	};
	const showNotification = (notification: TSetNotificationArgs) => {
		dispatch(setNotificationState(notification));
	};

	return (
		<div className={styles.root}>
			<h2>Example Component</h2>
			<div>
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
			</div>

			<button className={styles.btn} onClick={() => getExampleText('first')}>
				get first text
			</button>
			<button className={styles.btn} onClick={() => getExampleText('second')}>
				get second text
			</button>
			<button className={styles.btn} onClick={() => handleLogin()}>
				login
			</button>
			<p>{text}</p>
			<form
				method="POST"
				onSubmit={async (event) => {
					event.preventDefault();
					await uploadImage(file as Blob);
				}}
			>
				<input
					type="file"
					required
					onChange={(event) => {
						setFile(event.target.files && event.target.files[0]);
					}}
				/>
				<input type="submit" />
			</form>
			<img src="https://codetrainer-images.s3.eu-north-1.amazonaws.com/7c79b29f-8b8e-4940-9402-8639f477825d.png" />
		</div>
	);
};

export default Example;
