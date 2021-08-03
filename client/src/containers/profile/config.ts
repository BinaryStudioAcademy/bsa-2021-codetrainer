import { ActiveTabId } from './logic/models';

export const tabName: Record<ActiveTabId, string> = {
	[ActiveTabId.Stats]: 'Stats',
	[ActiveTabId.Challenge]: 'Challenge',
	[ActiveTabId.Solution]: 'Solution',
	[ActiveTabId.Social]: 'Social',
	[ActiveTabId.Collections]: 'Collections',
};
const ActiveTabIdArray = [
	ActiveTabId.Stats,
	ActiveTabId.Challenge,
	ActiveTabId.Solution,
	ActiveTabId.Social,
	ActiveTabId.Collections,
];
export const profilePageTabs = ActiveTabIdArray.map((id: ActiveTabId) => {
	return {
		id,
		name: tabName[id],
	};
});
