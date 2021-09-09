import { IInformationProps } from './components/information/interfaces';
import { ISocialProps } from './components/social/interfaces';

export interface ISettingProps {
	information: IInformationProps;
	social: ISocialProps;
	avatar?: string;
	onDelete: () => void;
	onSubmitPasswordChange: (form: any) => void;
}
