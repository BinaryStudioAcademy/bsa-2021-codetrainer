import React, { useState, useEffect } from 'react';

import styles from './nextTask.module.scss';
import Button from 'components/Button';
import Select from 'components/Select';
import Rank from 'components/Rank';

import fundamentalsIcon from './assets/fundamentalsIcon.svg';
import rankUpIcon from './assets/rankUpIcon.svg';
import practiceAndRepeatIcon from './assets/practiceAndRepeatIcon.svg';
import betaIcon from './assets/betaIcon.svg';
import randomIcon from './assets/randomIcon.svg';

import { FocusKeys } from 'constants/FocusKeys';
import { ISelectValue } from '../../components/Select/interface';
import { ITask } from './interface';
import Tag from '../../components/Tag/index';

// Stub for implementation until api is implemented
const task = {
	title: 'Stop gninnipS My sdroW!',
	description:
		'Write a function that takes in a string of one or more words, and returns the same string, but with all five or more letter words reversed.',
  conditionList: [
    'Strings passed in will consist of only letters and spaces.',
    'Spaces will be included only when more than one word is present.'
  ],
  rank: 6,
  tags: ['Algorithms', 'Strings', 'Data Types', 'Formatting', 'Logic']
};

const icons = {
	Fundamentals: fundamentalsIcon,
	'Rank Up': rankUpIcon,
	'Practice and Repeat': practiceAndRepeatIcon,
	Beta: betaIcon,
	Random: randomIcon,
};

const NextTask: React.FC = () => {
	const [activeFocusValue, setActiveFocusValue] = useState<ISelectValue>({ title: '', icon: '' });
	const [focusValues, setFocusValues] = useState<ISelectValue[]>([]);
  const [currentTask, setCurrentTask] = useState<ITask>(task);

	useEffect(() => {
		const focisValues = Object.values(FocusKeys);
		const selectFocusValues = focisValues.map((value) => ({ title: value, icon: icons[value] }));

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
		<article className={styles.wrapper}>
			<div className={styles.selectingContainer}>
				<h5 className={styles.title}>Next Task</h5>

				<div className={styles.focusWrapper}>
					<p className={styles.focusTitle}>Choose Today’s Focus</p>
					<Select values={focusValues} activeValue={activeFocusValue} onChange={setActiveFocusValue} />
				</div>

				<div>
					<Button text="Train" onClick={handleTrainClick} />
					<Button text="Skip" onClick={handleSkipClick} classList={styles.skipButton} />
				</div>
			</div>

			<div className={styles.taskContainer}>
				<span className={styles.taskTitleWrapper}>
					<Rank rankNumber={currentTask.rank} />
					<h6 className={styles.taskTitle}>
            {currentTask.title}
          </h6>
				</span>

				<p className={styles.taskDescription}>
					{currentTask.description}
				</p>

				<ul className={styles.taskConditionsList}>
					{currentTask.conditionList.map((condition, index) => <li key={index}>{condition}</li>)}
				</ul>

				<h6 className={styles.tagTitle}>Examples:</h6>
				<div>
          {currentTask.tags.map((tag, index) => <Tag key={index} text={tag} />)}
        </div>
			</div>
		</article>
	);
};

export default NextTask;
