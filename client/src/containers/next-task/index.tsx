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
import { getFocusTask } from '../home-page/logic/actions';
import { useAppSelector } from '../../hooks/useAppSelector';
import historyHelper from 'helpers/history.helper';
import { ROUTES } from 'constants/routes';

const focusSelect: Array<{ iconM: React.ElementType; title: string; value: FocusKeys }> = [
	{ iconM: LibraryBooksIcon, title: 'Fundamentals', value: FocusKeys.FUNDAMENTALS },
	{ iconM: ArrowUpwardIcon, title: 'Rank Up', value: FocusKeys.RANK_UP },
	{ iconM: BugReportIcon, title: 'Bug fixes', value: FocusKeys.BUG_FIXES },
	{ iconM: TuneIcon, title: 'Algorithms', value: FocusKeys.ALGORITHMS },
	{ iconM: ShuffleIcon, title: 'Random', value: FocusKeys.RANDOM },
];

const NextTaskContainer = () => {
	const [activeFocus, setActiveFocus] = useState<number>(0);
	const [focusValues, setFocusValues] = useState<ISelectValue[]>([]);
	const task = useAppSelector((rootState) => rootState.home.state?.nextTask);

	const dispatch = useDispatch();

	useEffect(() => {
		const selectFocusValues = focusSelect.map(({ iconM, title }, index) => ({
			id: index.toString(),
			title,
			iconM,
		}));

		setFocusValues(selectFocusValues);
	}, []);

	useEffect(() => {
		dispatch(
			getFocusTask({
				discipline: focusSelect[activeFocus].value,
			}),
		);
	}, [activeFocus]);

	const handleTrainClick = () => {
		if (task) {
			const path = `${ROUTES.TaskInfo}/${task?.id}/train`;
			historyHelper.push(path);
		}
	};

	const handleSkipClick = () => {
		dispatch(
			getFocusTask({
				discipline: focusSelect[activeFocus].value,
			}),
		);
	};

	return (
		<>
			<NextTask
				task={task}
				focusValues={focusValues}
				activeFocusValue={focusValues[activeFocus]}
				handleTrainClick={handleTrainClick}
				handleSkipClick={handleSkipClick}
				onChangeSelect={setActiveFocus}
			/>
		</>
	);
};

export default NextTaskContainer;
