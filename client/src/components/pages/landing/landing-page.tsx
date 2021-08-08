import React from 'react';
import { LandingHeader as Header } from './landing-header';
import { LandingLanguages as Languages } from './landing-languages';

interface ILandingPageProps {}
export const LandingPage = (props: ILandingPageProps) => {
	return (
		<>
			<Header />
			<Languages />
		</>
	);
};
