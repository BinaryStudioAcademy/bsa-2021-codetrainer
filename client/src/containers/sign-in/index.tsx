import React, { useEffect, useCallback } from 'react';
import { ISignInForm } from 'typings/sign-in-form';
import { FullscreenLoader, SignInPage } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import * as actions from './logic/actions';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { redirect } from 'helpers/redirect-github.helper';
import { GithubEndpoints } from 'services/github.service';

const SignIn: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { error, isLoading, isSuccess } = useSelector((rootState: IRootState) => rootState.auth.signIn);

	const onFormSubmit = useCallback((userData: ISignInForm) => {
		dispatch(actions.signInUser({ userData }));
	}, []);

	const onGithubSignIn = useCallback(() => {
		redirect(GithubEndpoints.LOGIN);
	}, []);

	useEffect(() => {
		if (isSuccess) {
			history.push(ROUTES.Home);
		}
	}, [isSuccess]);

	return isLoading ? (
		<FullscreenLoader />
	) : (
		<SignInPage onFormSubmit={onFormSubmit} onGithubSignIn={onGithubSignIn} error={error} />
	);
};

export default SignIn;
