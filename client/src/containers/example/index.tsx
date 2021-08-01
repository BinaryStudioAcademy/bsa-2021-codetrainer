import React from 'react';
// import styles from './example.module.scss';
// import { useDispatch, useSelector } from 'react-redux';
// import * as actions from './logic/actions';
// import { IRootState } from 'typings/root-state';
import SearchPage from 'components/pages/search-page';

const Example: React.FC = () => {
	// const dispatch = useDispatch();
	// const text = useSelector((rootState: IRootState) => rootState.example.name);
	// const getExampleText = (exampleName: string) => {
	// 	dispatch(actions.getExampleText({ exampleName }));
	// };
	return (
		// <div className={styles.root}>
		// 	<h2>Example Component</h2>
		// 	<button className={styles.btn} onClick={() => getExampleText('first')}>
		// 		get first text
		// 	</button>
		// 	<button className={styles.btn} onClick={() => getExampleText('second')}>
		// 		get second text
		// 	</button>
		// 	<p>{text}</p>
		// </div>
		<SearchPage />
	);
};

export default Example;
