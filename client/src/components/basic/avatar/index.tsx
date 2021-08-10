import React from 'react';
import defaultAvatar from 'assets/images/header/default-avatar.png';
import { IAvatarProps } from './types';
import styles from './avatar.module.scss';

const Avatar: React.FC<IAvatarProps> = ({ avatar, width = '50px', height = '50px', color }) => {
	const changebleStyle = {
		width,
		height,
		backgroundColor: color,
	};

	return <img src={avatar || defaultAvatar} className={styles.avatar} style={changebleStyle} alt="Avatar" />;
};

export default Avatar;
