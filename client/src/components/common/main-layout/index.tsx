import React, { PropsWithChildren, FC, HTMLAttributes } from 'react';
import styles from './main-layout.module.scss';
import { MainSidebar } from 'components';
import Header from 'containers/header';

const MainLayout: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({ children }) => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header />
			</div>
			<div className={styles.sidebar}>
				<MainSidebar />
			</div>
			<div className={styles.main}>{children}</div>
		</div>
	);
};

export default MainLayout;
