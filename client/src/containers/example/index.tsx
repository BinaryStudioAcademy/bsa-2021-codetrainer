import React from 'react';
import styles from './example.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import { IRootState } from 'typings/root-state';

import { ClanModal } from 'components';

const Example: React.FC = () => {
	const dispatch = useDispatch();
	const text = useSelector((rootState: IRootState) => rootState.example.name);
	const getExampleText = (exampleName: string) => {
		dispatch(actions.getExampleText({ exampleName }));
	};

	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjNzQ4YmQwLWQyNGQtNDY2Yi1iMWMxLTVkOTQ1MDczN2VhYSIsImlhdCI6MTYyODA5MTIwNywiZXhwIjoxNjI4MTc3NjA3fQ.5ChvB4gmO-R9EXfmakMcjtUZhKhnVDHFav_6-76xCHo';

	return (
		<div className={styles.root}>
			<h2>Example Component</h2>
			<button className={styles.btn} onClick={() => getExampleText('first')}>
				get first text
			</button>
			<button className={styles.btn} onClick={() => getExampleText('second')}>
				get second text
			</button>
			<p>{text}</p>
			<ClanModal token={token} />
		</div>
	);
};

export default Example;
