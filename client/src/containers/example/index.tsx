import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as actions from './logic/actions';
import { IRootState } from 'typings/root-state';
import { NotificationType } from '../notification/logic/models';
import { TSetNotificationArgs } from '../notification/logic/action-types';
import { setNotificationState } from '../notification/logic/actions';
import { uploadImage } from 'services/images.service';
import styles from './example.module.scss';
import { ROUTES } from 'constants/routes';
import historyHelper from 'helpers/history.helper';
import { setTheme } from 'components/common/theme-switcher/logic/actions';
import { TSetThemeArgs } from 'components/common/theme-switcher/logic/action-types';
import { ThemeType } from 'components/common/theme-switcher/logic/models';

interface IExample {
	theme: string;
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
	const kek = (name: TSetThemeArgs) => {
		dispatch(setTheme(name));
	};

	React.useEffect(() => {
		changeTheme();
	}, [props.theme]);

	const changeTheme = () => {
		const theme = localStorage.getItem('theme');
		switch (theme) {
			case 'light':
				localStorage.setItem('theme', 'dark');
				break;
			case 'dark':
				localStorage.setItem('theme', 'light');
				break;
			default:
				break;
		}
	};

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
			<button onClick={() => kek({ theme: ThemeType.Dark })}>DARK</button>
			<button onClick={() => kek({ theme: ThemeType.Light })}>LIGHT</button>
		</div>
	);
};

function mapStateToProps(state: any) {
	const { theme } = state;
	return { theme: theme };
}

export default connect(mapStateToProps)(Example);
