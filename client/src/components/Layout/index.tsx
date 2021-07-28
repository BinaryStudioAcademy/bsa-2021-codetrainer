import React from 'react';
import styles from './Layout.module.scss';

type Props = {
    children: JSX.Element | JSX.Element[]
}

const Layout: React.FC<Props> = ({ children })  => {
	return (
        <div className={styles.wrapper}>
        <aside className={styles.logoContainer}></aside>
        <div>
		{children}
        </div>
        </div>
	);
}

export default Layout;