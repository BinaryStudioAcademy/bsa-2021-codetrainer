import React from 'react';
import styles from './avatar.module.scss';

interface Prop {
	avatar: string;
	size: number;
	color: string;
}

const Avatar: React.FC<Prop> = (props) => {

	const changebleStyle = {
		width: props.size,
		height: props.size,
		backgroundColor: props.color
	}

	return (
		<div className={styles.avatar} style={changebleStyle}>
			<img src={props.avatar} alt="userAvatar"/>
		</div>
	)
}

export default Avatar;
