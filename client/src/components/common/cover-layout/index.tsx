import React, { PropsWithChildren, FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import background from 'assets/icons/cover-background.svg';
import logo from 'assets/icons/logo.svg';
import styles from './cover.module.scss';

const CoverLayout: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = (props) => {
	return (
		<div className={styles.cover}>
			<div className={styles.image}>
				<img className={styles.background} src={background} alt="" />
				<img className={styles.logo} src={logo} alt="codetrainer" />
			</div>
			<div className={clsx(styles.main, props.className)}>{props.children}</div>
		</div>
	);
};

export default CoverLayout;
