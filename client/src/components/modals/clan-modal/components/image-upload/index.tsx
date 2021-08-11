import React from 'react';
import styles from './image-upload.module.scss';
import placeholderImage from '../../../../../assets/images/placeholder-image.png';

interface IImageUploadProps {
	label: string;
}

const ImageUpload: React.FC<IImageUploadProps> = (props) => {
	return (
		<div className={styles.container}>
			<img src={placeholderImage} />
			<form action="">
				<label>
					{props.label}
					<input type="file" accept="image/png, image/jpeg" />
				</label>
			</form>
		</div>
	);
};

export default ImageUpload;
