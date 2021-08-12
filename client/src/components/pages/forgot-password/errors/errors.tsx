import React from 'react';

import styles from './styles.module.scss';

interface IErrors {
	errors: { msg: string }[] | null;
}

export const Errors: React.FC<IErrors> = ({ errors }) => {
	return errors ? (
		<>
			{errors.map((error, index) => (
				<div key={index.toString()} className={styles.error}>
					{error.msg}
				</div>
			))}
		</>
	) : null;
};
