import React, { useState, useEffect } from 'react';
import { NextTask } from 'components/common';
import { ISelectValue } from 'components/basic/select/interface';
import fundamentalsIcon from './assets/fundamentalsIcon.svg';
import rankUpIcon from './assets/rankUpIcon.svg';
import practiceAndRepeatIcon from './assets/practiceAndRepeatIcon.svg';
import betaIcon from './assets/betaIcon.svg';
import randomIcon from './assets/randomIcon.svg';
import { FocusKeys } from 'constants/FocusKeys';
import { useDispatch } from 'react-redux';
import { getTasks } from '../home-page/logic/actions';
import { useAppSelector } from '../../hooks/useAppSelector';

const icons = {
	Fundamentals: fundamentalsIcon,
	'Rank Up': rankUpIcon,
	'Practice and Repeat': practiceAndRepeatIcon,
	Beta: betaIcon,
	Random: randomIcon,
};

const NextTaskContainer = () => {
	const [activeFocusValue, setActiveFocusValue] = useState<ISelectValue>({ id: 0, title: 'Fundamentals', icon: '' });
	const [focusValues, setFocusValues] = useState<ISelectValue[]>([]);
	const task = useAppSelector((rootState) => rootState.home.state?.nextTask);

	const dispatch = useDispatch();

	useEffect(() => {
		const focusValues = Object.values(FocusKeys);
		const selectFocusValues = focusValues.map((value, index) => ({ id: index, title: value, icon: icons[value] }));

		setActiveFocusValue(selectFocusValues[0]);
		setFocusValues(selectFocusValues);
	}, []);

	useEffect(() => {
		dispatch(getTasks({
			discipline: activeFocusValue.title,
			currentTask: task?.id
		}));
	}, [activeFocusValue.title]);

	const handleTrainClick = () => {
		console.log('train click');
	};

	const handleSkipClick = () => {
		dispatch(getTasks({
			discipline: activeFocusValue.title,
			currentTask: task?.id
		}));
	};

	return (
		<>
			<NextTask
				task={task}
				focusValues={focusValues}
				activeFocusValue={activeFocusValue}
				setActiveFocusValue={setActiveFocusValue}
				handleTrainClick={handleTrainClick}
				handleSkipClick={handleSkipClick} />

		</>
	);
};

export default NextTaskContainer;
