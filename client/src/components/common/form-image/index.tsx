import React, { FC, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getIn } from 'formik';
import { IFormImageProps } from './types';
import { defaultImage } from './config';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';
import styles from './form-image.module.scss';
import { uploadImage } from 'services/images.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../spinner';

const FormImage: FC<IFormImageProps> = ({
	id,
	title = 'Select an image',
	imageComponent: Image = defaultImage,
	imageProps,
	readonly = false,
	field: { name, value: image },
	form: { errors, touched, setFieldValue },
}: IFormImageProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const blocked = readonly || isLoading;
	const error = getIn(errors, name);
	const isTouched = getIn(touched, name);

	const changeImage = useCallback(async (blob?: Blob) => {
		if (!blocked) {
			try {
				setIsLoading(true);
				if (blob) {
					const href = await uploadImage(blob);
					setFieldValue(name, href);
				} else {
					setFieldValue(name, null);
				}
			} catch (error) {
				if (error instanceof Error) {
					dispatch(setNotificationState({
						state: {
							notificationType: NotificationType.Error,
							message: error.message,
						}
					}));
				}
			} finally {
				setIsLoading(false);
			}
		}
	}, [setFieldValue, blocked, ]);

	const cancelId = `${id}-cancel`;

	return (
		<div className={styles.container}>
			<input
				id={id}
				name={name}
				onChange={({ target : { files } }) => {
					changeImage(files && files[0] || undefined);
				}}
				type="file"
				accept="image/png, image/jpeg"
				disabled={blocked}
				className={styles.imageField}
			/>
			<input
				id={cancelId}
				type="button"
				onClick={() => changeImage()}
				disabled={blocked}
				className={styles.imageField}
			/>
			<div className={styles.imageWrapper}>
				<label htmlFor={id}>
					<Image {...imageProps} src={image}/>
				</label>
			</div>
			<div className={styles.labelWrapper}>
				<label htmlFor={id} className={styles.label}>
					{title}
					{
						!isLoading ? image && (
							<label
								htmlFor={cancelId}
								className={styles.cancel}
							>
								<FontAwesomeIcon icon={faTimes} size="lg" />
							</label>
						) : (
							<div className={styles.cancel}>
								<Spinner size="20px" />
							</div>
						)
					}
				</label>
			</div>
			{isTouched && error && <div className={styles.error}>{error}</div>}
		</div>
	);
}

export default FormImage;
