import { FullscreenLoader } from 'components';
import { DetailsTab } from 'components/pages';
import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';

export const Details = () => {
	const task = useSelector((state: IRootState) => state.taskInfo.task);

	if (task) {
		return <DetailsTab task={task} />;
	}

	return <FullscreenLoader />;
};
