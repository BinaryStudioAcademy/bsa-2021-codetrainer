import React, { useCallback, useEffect } from 'react';
import { ISignUpForm } from 'typings/sign-up-form';
import { FullscreenLoader, SignUpPage } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import { IRootState } from 'typings/root-state';
import { ROUTES } from 'constants/routes';
import { useHistory } from 'react-router-dom';
import { GithubEndpoints } from 'services/github.service';
import { redirect } from '../../helpers/redirect-github.helper';

const SignUp: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const onFormSubmit = useCallback((userData: ISignUpForm) => {
		if (github) {
			dispatch(
				actions.signUpUserByGithub({
					userData: {
						...userData,
						githubId: github.id,
					},
				}),
			);
		} else {
			dispatch(actions.signUpUser({ userData }));
		}
	}, []);

	const onGithubSignUp = useCallback(() => {
		redirect(GithubEndpoints.REGISTER);
	}, []);

	const { error, github, isLoading, isSuccess } = useSelector((rootState: IRootState) => rootState.auth.signUp);

	useEffect(() => {
		if (isSuccess) {
			history.push(ROUTES.Home);
		}
	}, [isSuccess]);

	return isLoading ? (
		<FullscreenLoader />
	) : (
		<SignUpPage onFormSubmit={onFormSubmit} onGithubSignUp={onGithubSignUp} github={github} error={error} />
	);
};

export default SignUp;
