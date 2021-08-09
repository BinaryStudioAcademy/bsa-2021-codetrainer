import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './logic/actions';

const TestPrivate: React.FC = () => {
	const dispatch = useDispatch();
	const handleLogout = async () => {
		dispatch(actions.logoutUser());
	};
	return (
		<div>
			<h2>Example Private Component</h2>
			<button onClick={() => handleLogout()}>logout</button>
		</div>
	);
};

export default TestPrivate;
