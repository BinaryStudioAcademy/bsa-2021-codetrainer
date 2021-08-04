import React from 'react';
import { useCallback } from 'react';
import { ISignUpForm } from 'typings/sign-up-form';
import { SignUpPage, Spinner } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import { IRootState } from 'typings/root-state';

const SignUp: React.FC = () => {
	const dispatch = useDispatch();
	const onFormSubmit = useCallback((user: ISignUpForm) => {
		dispatch(actions.signUpUser({ user }));
	}, []);

	const { error, isLoading } = useSelector((rootState: IRootState) => rootState.signUp);

	return isLoading ? <Spinner /> : <SignUpPage onFormSubmit={onFormSubmit} error={error} />;
};

export default SignUp;
