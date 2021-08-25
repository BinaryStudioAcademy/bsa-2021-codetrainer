import React, { useState } from 'react';
import { Avatar } from 'components';
import { uploadImage } from 'services/images.service';
import { IProfilePictureProps } from './interfaces';
import styles from './profile-picture.module.scss';

const ProfilePicture: React.FC<IProfilePictureProps> = (props) => {
	const [avatar, setAvatar] = useState(props.avatar);
	const [switchBtn, setSwitchBtn] = useState(true);

	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault();
				props.onSubmit({ avatar: avatar });
				setSwitchBtn(true);
			}}
			className={styles.avatarContainer}
		>
			<h4 className={styles.header}>Profile Picture</h4>
			<Avatar size={130} avatar={avatar} />
			<div className={styles.inputFileWrapper}>
				{switchBtn ? (
					<>
						<input
							type="file"
							id="file"
							required
							onChange={async (event) => {
								try {
									const file = event.target.files && event.target.files[0];
									const previewAvatar = await uploadImage(file as Blob);
									setAvatar(previewAvatar);
								} catch (err) {
									console.log(err);
								}
								setSwitchBtn(false);
							}}
							className={styles.input}
						/>
						<label htmlFor="file" className={styles.label}>
							Change profile picture
						</label>
					</>
				) : (
					<>
						<input type="submit" id="submit" className={styles.input} />
						<label htmlFor="submit" className={styles.label}>
							Save
						</label>
					</>
				)}
			</div>
		</form>
	);
};

export default ProfilePicture;
