import React from 'react';
import { useCallback } from 'react';
import { ISignInForm } from 'typings/sign-in-form';
import { SignInPage } from 'components';

const SignIn: React.FC = () => {
	const onFormSubmit = useCallback((form: ISignInForm) => {
		// TODO: implement
		console.info(form);
	}, []);
	const onGithubSignIn = useCallback(() => {
		// TODO: implement
	}, []);

	return <SignInPage onFormSubmit={onFormSubmit} onGithubSignIn={onGithubSignIn} />;
};

export default SignIn;
