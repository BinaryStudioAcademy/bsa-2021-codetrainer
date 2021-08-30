export const ROUTES = {
	Main: '/',
	Home: '/home',
	NotFound: '/not-found',

	SignIn: '/sign-in',
	SignUp: '/sign-up',

	ForgotPassword: '/forgot-password',
	ChangePassword: '/change-password',

	Search: '/search',
	Users: '/users',

	Clans: '/clans',
	Clan: '/clan',

	createTask: '/task/new',
	TaskInstructions: '/task/:id',
	TaskTrain: '/challenge-info/:id/train',

	Setting: '/setting',

	Github: '/github',

	Collections: '/collections',

	TaskInfo: '/challenge-info',

	Community: '/followers/community',

	Example: '/example',
};

export const TASK_ROUTES: Record<string, string> = {
	Train: '/train',
	Tab: '/:tab',
	Solutions: '/solutions',
	Discourse: '/discourse',
};
