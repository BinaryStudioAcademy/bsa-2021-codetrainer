import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import { IRootState } from 'typings/root-state';
import { NotificationType } from '../notification/logic/models';
import { TSetNotificationArgs } from '../notification/logic/action-types';
import { setNotificationState } from '../notification/logic/actions';
import { uploadImage } from 'services/images.service';
import styles from './example.module.scss';
import { ROUTES } from 'constants/routes';
import historyHelper from 'helpers/history.helper';
import ThemeSwitcher from 'containers/theme-switcher';
import { CollectionModal } from 'components/modals';

interface IExample {
	theme: { theme: string };
}

const Example: React.FC<IExample> = (props) => {
	const dispatch = useDispatch();
	const text = useSelector((rootState: IRootState) => rootState.example.name);
	const [file, setFile] = useState<Blob | null>(null);
	const getExampleText = (exampleName: string) => {
		dispatch(actions.getExampleText({ exampleName }));
	};
	const showNotification = (notification: TSetNotificationArgs) => {
		dispatch(setNotificationState(notification));
	};

	const [isOpen, setIsOpen] = React.useState(true);

	return (
		<div className={styles.root}>
			<h2>Example Component</h2>
			<button className={styles.btn} onClick={() => historyHelper.push(ROUTES.SignIn)}>
				sign in
			</button>
			<button className={styles.btn} onClick={() => historyHelper.push(ROUTES.SignUp)}>
				sign up
			</button>
			<button className={styles.btn} onClick={() => historyHelper.push(ROUTES.Home)}>
				home
			</button>
			<button className={styles.btn} onClick={() => historyHelper.push(ROUTES.Home)}>
				HOME
			</button>

			<div>
				{Object.values(NotificationType).map((type) => {
					return (
						<button
							className={styles.btn}
							key={type}
							onClick={() => {
								showNotification({
									state: {
										notificationType: type,
										title: type,
										message: `${type} message`,
									},
								});
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
			<ThemeSwitcher />
			<CollectionModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	);
};

export default Example;
