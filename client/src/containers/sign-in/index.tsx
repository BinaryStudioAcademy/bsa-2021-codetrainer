import React from 'react';
import { useCallback } from 'react';
import { ISignInForm } from 'typings/sign-in-form';
import { SignInPage, Spinner } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import * as actions from './logic/actions';

const SignIn: React.FC = () => {
	const dispatch = useDispatch();
	const { error, isLoading } = useSelector((rootState: IRootState) => rootState.signIn);

	const onFormSubmit = useCallback((userData: ISignInForm) => {
		dispatch(actions.signInUser({ userData }));
	}, []);

	const onGithubSignIn = useCallback(() => {
		// TODO: implement
	}, []);

	return isLoading ? (
		<Spinner />
	) : (
		<SignInPage onFormSubmit={onFormSubmit} onGithubSignIn={onGithubSignIn} error={error} />
	);
};

export default SignIn;
