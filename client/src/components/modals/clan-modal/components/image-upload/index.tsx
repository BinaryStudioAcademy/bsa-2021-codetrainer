import React from 'react';
import styles from './image-upload.module.scss';

interface IImageUploadProps {
	label: string;
}

const ImageUpload: React.FC<IImageUploadProps> = (props) => {
	return (
		<div className={styles.container}>
			<img src="https://dess.gov.ua/wp-content/uploads/2020/05/placeholder-1.png" />
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
