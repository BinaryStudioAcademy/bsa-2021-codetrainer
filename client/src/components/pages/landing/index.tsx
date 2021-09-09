import React from 'react';
import Header from './sections/header';
import Welcome from './sections/welcome';
import Skills from './sections/skills';
import Training from './sections/training';
import Ranks from './sections/ranks';
import Collaborations from './sections/collaborations';
import Footer from './sections/footer';
import Creations from './sections/creations';

const LandingPage = () => {
	return (
		<>
			<Header />
			<Skills />
			<Training />
			<Ranks />
			<Collaborations />
			<Creations />
			<Welcome />
			<Footer />
		</>
	);
};

export default LandingPage;
