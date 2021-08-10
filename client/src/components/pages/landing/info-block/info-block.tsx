import React from 'react';
import styles from './info-block.module.scss';
import clsx from 'clsx';

interface IInfoBlockProps {
	header: string;
	text: string;
	picture: string;
}

export const InfoBlock = ({ header, text, picture }: IInfoBlockProps) => {
	return (
		<div className={clsx(styles.infoBlock)}>
			<img src={picture} alt="No connection" />
			<div className={styles.textBlock}>
				<h1>{header}</h1>
				<p>{text}</p>
			</div>
		</div>
	);
};
