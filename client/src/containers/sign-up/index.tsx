import React from 'react';
import { useCallback } from 'react';
import { ISignUpForm } from 'typings/sign-up-form';
import { SignUpPage } from 'components';
import { useDispatch } from 'react-redux';
import * as actions from './logic/actions';

const SignUp: React.FC = () => {
	const dispatch = useDispatch();
	const onFormSubmit = useCallback((user: ISignUpForm) => {
		dispatch(actions.signUpUser({ user }));
	}, []);

	return <SignUpPage onFormSubmit={onFormSubmit} />;
};

export default SignUp;
