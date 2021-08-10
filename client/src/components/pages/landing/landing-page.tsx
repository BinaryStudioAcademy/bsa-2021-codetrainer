import React from 'react';
import { LandingHeader as Header } from './landing-header';
import { LandingLanguages as Languages } from './landing-languages';
import { InfoBlock } from './info-block';
import { TEXTS } from './info-block/texts';
import SharpenYourSkills from 'assets/images/landing/sharpenSkills.png';
import TrainKata from 'assets/images/landing/trainKata.png';
import EarnRanks from 'assets/images/landing/earnRanks.png';
import CreateKata from 'assets/images/landing/createkata.png';
import { Footer } from './footer';

interface ILandingPageProps {}
export const LandingPage = (props: ILandingPageProps) => {
	return (
		<>
			<Header />
			<Languages />
			<InfoBlock header="Sharpen your skills" text={TEXTS.SharpenYourSkills} picture={SharpenYourSkills} />
			<InfoBlock header="Train on kata" text={TEXTS.TrainKata} picture={TrainKata} />
			<InfoBlock header="Earn ranks and honor" text={TEXTS.EarnRanks} picture={EarnRanks} />
			<InfoBlock header="Gain collaborative wisdom" text={TEXTS.Wisdom} picture={TrainKata} />
			<InfoBlock header="Create your own kata" text={TEXTS.CreateKata} picture={CreateKata} />
			<Footer />
		</>
	);
};
