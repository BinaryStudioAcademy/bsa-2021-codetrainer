import { Social } from 'components';
import React from 'react';
import { IUser } from 'typings/common/IUser';

import styles from './styles.module.scss';

interface IProfileSocialList {
	items: IUser[];
}

export const ProfileSocialList: React.FC<IProfileSocialList> = ({ items }) => (
	<div className={styles.socialList}>
		{items.map((item, index) => (
			<Social key={index} user={item} />
		))}
	</div>
);
