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
			<Information list={props.information.list} formItems={props.information.formItems} />
			<div className={styles.gridContainer}>
				<Social
					twitterUrl={props.social.twitterUrl}
					linkedinUrl={props.social.linkedinUrl}
					stackUrl={props.social.stackUrl}
				/>
				<ProfilePicture />
			</div>
			<ChangePassword />
			<DeleteAccount />
		</div>
	);
};

export default Setting;
