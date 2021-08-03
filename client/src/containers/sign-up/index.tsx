import React from 'react';
import { useCallback } from 'react';
import { ISignUpForm } from 'typings/sign-up-form';
import { SignUpPage } from 'components';

const SignUp: React.FC = () => {
	const onFormSubmit = useCallback((form: ISignUpForm) => {
		// TODO: implement
		console.info(form);
	}, []);

	return <SignUpPage onFormSubmit={onFormSubmit} />;
};

export default SignUp;
