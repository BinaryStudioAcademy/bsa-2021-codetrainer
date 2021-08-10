import React from 'react';
import styles from './image-upload.module.scss';
import placeholderImage from '../../../../../assets/images/placeholder-image.png';
import { IImageUploadProps } from './types';

const ImageUpload: React.FC<IImageUploadProps> = ({ label }) => {
	return (
		<div className={styles.container}>
			<img src={placeholderImage} />
			<form action="#">
				<label>
					{label}
					<input type="file" accept="image/png, image/jpeg" />
				</label>
			</form>
		</div>
	);
};

export default ImageUpload;
