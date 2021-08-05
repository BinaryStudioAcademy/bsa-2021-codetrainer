import React from 'react';
import styles from './avatar.module.scss';
import defaultAvatar from 'assets/images/header/default-avatar.png';

export interface IAvatarProps {
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
		<div className={styles.avatar} style={changebleStyle}>
			<img src={props.avatar || defaultAvatar} alt="userAvatar" />
		</div>
	);
};

export default Avatar;
