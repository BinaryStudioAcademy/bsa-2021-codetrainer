import React, { useCallback, useEffect } from 'react';
import { ISignUpForm } from 'typings/sign-up-form';
import { SignUpPage, Spinner } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import { IRootState } from 'typings/root-state';
import { ROUTES } from 'constants/routes';
import { useHistory } from 'react-router-dom';

const SignUp: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const onFormSubmit = useCallback((userData: ISignUpForm) => {
		dispatch(actions.signUpUser({ userData }));
	}, []);

	const { error, isLoading, isSuccess } = useSelector((rootState: IRootState) => rootState.auth.signUp);

	useEffect(() => {
		if (isSuccess) {
			history.push(ROUTES.Home);
		}
	}, [isSuccess]);

	return isLoading ? <Spinner /> : <SignUpPage onFormSubmit={onFormSubmit} error={error} />;
};

export default SignUp;
