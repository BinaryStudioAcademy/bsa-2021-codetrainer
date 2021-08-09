import React from 'react';
import { detailsData } from '../../mockData';
import './task-details.scss';
import { TaskTabType } from '../../config';

interface IDetailsProps {
	tabType: string;
}

const style = 'task-instructions-details-mockup';

const Details: React.FC<IDetailsProps> = (props) => {
	switch (props.tabType) {
		case TaskTabType.instructions:
			return <div className={style}>{detailsData.instructions}</div>;
		case TaskTabType.output:
			return <div className={style}>{detailsData.output}</div>;
		default:
			return <div />;
	}
};

export default Details;
