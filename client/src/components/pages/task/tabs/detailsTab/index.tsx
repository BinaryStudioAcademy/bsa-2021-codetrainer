// import { Avatar } from 'components/basic';
import React from 'react';
import styles from './details-tab.module.scss';
import { Description } from './description';
import { Contributors } from './contributors';
import { Stats } from './stats';

export const DetailsTab = () => {
	return (
		<div className={styles.detailsTab}>
			<Description />
			<Contributors />
			<Stats />
		</div>
	);
};
