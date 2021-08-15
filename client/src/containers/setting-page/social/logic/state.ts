export type ISocialSettingsState = {
	github: {
		error?: string;
	};
};

export const initialState: ISocialSettingsState = {
	github: {
		error: undefined,
	},
};
