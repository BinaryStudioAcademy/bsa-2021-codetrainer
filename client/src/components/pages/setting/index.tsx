import React from 'react';
import Information from './components/information';
import Social from './components/social';
import ProfilePicture from './components/profile-picture';
import ChangePassword from './components/change-password';
import DeleteAccount from './components/delete-account';
import { ISettingProps } from './interfaces';
import styles from './setting-page.module.scss';

const Setting: React.FC<ISettingProps> = (props) => {
	return (
		<div className={styles.container}>
			<Information
				list={props.information.list}
				formItems={props.information.formItems}
				onSubmit={props.information.onSubmit}
				clan={props.information.clan}
			/>
			<div className={styles.gridContainer}>
				<Social {...props.social} />
				<ProfilePicture onSubmit={props.information.onSubmit} avatar={props.avatar} />
			</div>
			<ChangePassword onSubmitPasswordChange={props.onSubmitPasswordChange} />
			<DeleteAccount onDelete={props.onDelete} />
		</div>
	);
};

export default Setting;
