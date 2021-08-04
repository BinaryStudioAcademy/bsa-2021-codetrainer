import * as yup from 'yup';

export const SIGN_IN_SCHEMA = yup.object().shape({
	email: yup.string().required('Enter email').email('Invalid email'),
	password: yup.string().required('Enter password'),
});
