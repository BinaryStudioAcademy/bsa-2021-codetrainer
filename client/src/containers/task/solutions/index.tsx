import { FullscreenLoader } from 'components';
import { SolutionsTab } from 'components/pages/task/tabs/solutionsTab';
import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';

export const Solutions = () => {
	const task = useSelector((state: IRootState) => state.taskInfo.task);

	if (task) {
		return <SolutionsTab task={task} />;
	}

	return <FullscreenLoader />;
};
