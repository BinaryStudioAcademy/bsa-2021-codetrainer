import { ActiveTabId } from './logic/models';

interface ITab {
	name: string;
	private?: boolean;
}

export const tabs: Record<ActiveTabId, ITab> = {
	[ActiveTabId.Stats]: {
		name: 'Stats',
	},
	[ActiveTabId.Challenge]: {
		name: 'Challenge',
	},
	[ActiveTabId.Solution]: {
		name: 'Solution',
		private: true,
	},
	[ActiveTabId.Social]: {
		name: 'Social',
	},
	[ActiveTabId.Collections]: {
		name: 'Collections',
	},
};

export const profilePageTabs = Object.entries(tabs).map(([id, tab]) => ({ id, tab }));
