import { ThemeType } from 'containers/theme-switcher/logic/models';

export const CreateCodeData = {
	MODE: 'javascript',
	PLACE_HOLDER: 'Start Coding',
	NAME: 'code-editor',
	FONT_SIZE: 18,
	SHOW_PRINT_MARGIN: true,
	SHOW_GUTTER: true,
	HIGHLIGH_ACTIVE_LINE: true,
	WRAP_ENABLED: true,
	HIGHLIGH_GUTTER_LINE: true,
	ENABLE_BASIC_AUTOCOMPLETION: true,
	ENABLE_LIVE_AUTOCOMPLETION: true,
	ENABLE_SNIPPETS: true,
	SHOW_LINE_NUMBER: true,
	USE_WORKER: false,
	TAB_SIZE: 2,
};

export const codeEditorThemes: Record<ThemeType, string> = {
	[ThemeType.Light]: 'tomorrow',
	[ThemeType.Dark]: 'dracula',
};
