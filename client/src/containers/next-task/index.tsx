import React, { useState, useEffect } from 'react';
import { NextTask } from 'components/common';
import { ISelectValue } from 'components/basic/select/interface';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import TuneIcon from '@material-ui/icons/Tune';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BugReportIcon from '@material-ui/icons/BugReport';
import { FocusKeys } from 'constants/FocusKeys';
import { useDispatch } from 'react-redux';
import { getTasks } from '../home-page/logic/actions';
import { useAppSelector } from '../../hooks/useAppSelector';
import historyHelper from 'helpers/history.helper';
import { ROUTES } from 'constants/routes';

const icons: Record<string, React.ElementType> = {
	FUNDAMENTALS: LibraryBooksIcon,
	RANK_UP: ArrowUpwardIcon,
	BUG_FIXES: BugReportIcon,
	ALGORITHMS: TuneIcon,
	RANDOM: ShuffleIcon,
};

const NextTaskContainer = () => {
	const [activeFocusValue, setActiveFocusValue] = useState<ISelectValue>({
		id: '0',
		title: 'Fundamentals',
		icon: '',
	});
	const [focusValues, setFocusValues] = useState<ISelectValue[]>([]);
	const task = useAppSelector((rootState) => rootState.home.state?.nextTask);

	const dispatch = useDispatch();

	useEffect(() => {
		const focusValues = Object.entries(FocusKeys);
		const selectFocusValues = focusValues.map(([key, value], index) => ({
			id: index.toString(),
			title: value,
			iconM: icons[key],
		}));

		setActiveFocusValue(selectFocusValues[0]);
		setFocusValues(selectFocusValues);
	}, []);

	useEffect(() => {
		dispatch(
			getTasks({
				discipline: activeFocusValue.title,
				currentTask: task?.id,
			}),
		);
	}, [activeFocusValue.title]);

	const handleTrainClick = () => {
		if (task) {
			const path = `${ROUTES.TaskInfo}/${task?.id}/train`;
			historyHelper.push(path);
		}
	};

	const handleSkipClick = () => {
		dispatch(
			getTasks({
				discipline: activeFocusValue.title,
				currentTask: task?.id,
			}),
		);
	};

	return (
		<>
			<NextTask
				task={task}
				focusValues={focusValues}
				activeFocusValue={activeFocusValue}
				setActiveFocusValue={setActiveFocusValue}
				handleTrainClick={handleTrainClick}
				handleSkipClick={handleSkipClick}
			/>
		</>
	);
};

export default NextTaskContainer;
