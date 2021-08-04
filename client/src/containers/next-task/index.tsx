import React, { useState, useEffect } from 'react';
import { NextTask } from 'components/common';
import { ISelectValue } from 'components/basic/select/interface';
import fundamentalsIcon from './assets/fundamentalsIcon.svg';
import rankUpIcon from './assets/rankUpIcon.svg';
import practiceAndRepeatIcon from './assets/practiceAndRepeatIcon.svg';
import betaIcon from './assets/betaIcon.svg';
import randomIcon from './assets/randomIcon.svg';
import { FocusKeys } from 'constants/FocusKeys';
import { ITask } from 'components/common/next-task/interface';

// Stub for implementation until api is implemented
const task = {
	title: 'Stop gninnipS My sdroW!',
	description: `
	<div>
		<p>Write a function that takes in a string of one or more words, and returns the same string, but with all five or more letter words reversed.</p>
		<ul>
			<li>Strings passed in will consist of only letters and spaces.</li>
			<li>Spaces will be included only when more than one word is present.</li>
		</ul>
		<h6>Examples:</h6>
		<div>
			<code>
			spinWords("Hey fellow warriors") => "Hey wollef sroirraw" <br />
			spinWords("This is a test") => "This is a test" <br />
			spinWords("This is another test") => "This is rehtona test" <br />
			</code>
		</div>
	</div>
	`,
	rank: 6,
	tags: ['Algorithms', 'Strings', 'Data Types', 'Formatting', 'Logic', 'Data Types', 'Formatting', 'Logic'],
};

const icons = {
	Fundamentals: fundamentalsIcon,
	'Rank Up': rankUpIcon,
	'Practice and Repeat': practiceAndRepeatIcon,
	Beta: betaIcon,
	Random: randomIcon,
};

const NextTaskContainer = () => {
	const [activeFocusValue, setActiveFocusValue] = useState<ISelectValue>({ id: 0, title: '', icon: '' });
	const [focusValues, setFocusValues] = useState<ISelectValue[]>([]);
	const [currentTask, setCurrentTask] = useState<ITask>(task);

	useEffect(() => {
		const focusValues = Object.values(FocusKeys);
		const selectFocusValues = focusValues.map((value, index) => ({ id: index, title: value, icon: icons[value] }));

		setActiveFocusValue(selectFocusValues[0]);
		setFocusValues(selectFocusValues);
	}, []);

	useEffect(() => {
		// api request
		setCurrentTask(task);
	}, []);

	const handleTrainClick = () => {
		console.log('train click');
	};

	const handleSkipClick = () => {
		console.log('skip click');
	};

	return (
		<NextTask
			task={currentTask}
			focusValues={focusValues}
			activeFocusValue={activeFocusValue}
			setActiveFocusValue={setActiveFocusValue}
			handleTrainClick={handleTrainClick}
			handleSkipClick={handleSkipClick}
		/>
	);
};

export default NextTaskContainer;
