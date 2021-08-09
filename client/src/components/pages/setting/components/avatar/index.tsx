import React from 'react';
import styles from './avatar.module.scss';
import defaultAvatar from 'assets/images/header/default-avatar.png';

interface IAvatarProps {
	avatar?: string;
	size?: number;
	color?: string;
}

const Avatar: React.FC<IAvatarProps> = (props) => {
	const changebleStyle = {
		width: props.size,
		height: props.size,
		backgroundColor: props.color,
	};

	return (
		<img src={props.avatar || defaultAvatar} className={styles.avatar} style={changebleStyle} alt="userAvatar" />
	);
};

export default Avatar;
