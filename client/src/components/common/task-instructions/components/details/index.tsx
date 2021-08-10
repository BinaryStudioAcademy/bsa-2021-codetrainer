import React from 'react';
import { detailsData } from '../../mockData';
import { IDetailsProps } from './types';
import { TaskTabType } from '../../types';
import styles from './details.module.scss';

const Details: React.FC<IDetailsProps> = ({ tabType }) => {
	switch (tabType) {
		case TaskTabType.INSTRUCTIONS:
			return <div className={styles.taskInstructionsDetailsMockup}>{detailsData.instructions}</div>;
		case TaskTabType.OUTPUT:
			return <div className={styles.taskInstructionsDetailsMockup}>{detailsData.output}</div>;
		default:
			return <div />;
	}
};

export default Details;
