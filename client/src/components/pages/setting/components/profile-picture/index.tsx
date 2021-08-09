import React from 'react';
import Avatar from '../avatar';
import { Link } from 'react-router-dom';
import styles from './profile-picture.module.scss';

const ProfilePicture: React.FC = () => {
	return (
		<div className={styles.avatarContainer}>
			<h4 className={styles.header}>Profile Picture</h4>
			<Avatar size={130} />
			<Link to="/" className={styles.link}>
				Change profile picture
			</Link>
		</div>
	);
};

export default ProfilePicture;
