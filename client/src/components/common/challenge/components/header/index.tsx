import React from 'react';
import { Link } from 'react-router-dom';
import { Rank } from 'components';
import { IHeaderProps } from '../../types';
import styles from './header.module.scss';

const Header: React.FC<IHeaderProps> = ({ rank, title, linkToAuthor }) => {
	return (
		<div className={styles.challengeHeader}>
			<Rank rank={rank} />
			<Link to={linkToAuthor} className={styles.challengeHeaderTitle}>
				<span>{title}</span>
			</Link>
		</div>
	);
};

export default Header;
