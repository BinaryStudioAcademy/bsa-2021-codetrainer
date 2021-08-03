import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import { IRootState } from 'typings/root-state';
import { uploadImage } from 'services/images.service';
import styles from './example.module.scss';
import { useState } from 'react';

const Example: React.FC = () => {
	const dispatch = useDispatch();
	const text = useSelector((rootState: IRootState) => rootState.example.name);
	const [file, setFile] = useState<Blob | null>(null);
	const getExampleText = (exampleName: string) => {
		dispatch(actions.getExampleText({ exampleName }));
	};
	return (
		<div className={styles.root}>
			<h2>Example Component</h2>
			<button className={styles.btn} onClick={() => getExampleText('first')}>
				get first text
			</button>
			<button className={styles.btn} onClick={() => getExampleText('second')}>
				get second text
			</button>
			<p>{text}</p>
			<form
				method="POST"
				onSubmit={async (event) => {
					event.preventDefault();
					await uploadImage(file as Blob);
				}}
			>
				<input
					type="file"
					required
					onChange={(event) => {
						setFile(event.target.files && event.target.files[0]);
					}}
				/>
				<input type="submit" />
			</form>
			<img src="api/images/0b5f991b-67cd-4991-b2bc-a704d5ea0d56" />
		</div>
	);
};

export default Example;
