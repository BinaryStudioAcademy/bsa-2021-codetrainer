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
	LeaderBoard: '/leaderboard',

	Clans: '/clans',
	Clan: '/clan',

	createTask: '/task/new',
	TaskInstructions: '/task/:id',
	TaskInfo: '/task-info',
	TaskTrain: '/task-info/:id/train',

	Setting: '/setting',

	Github: '/github',

	Collections: '/collections',

	Community: '/followers/community',
	Following: '/followers/following',

	Example: '/example',
};

export const TASK_ROUTES: Record<string, string> = {
	Train: '/train',
	Tab: '/:tab',
	Solutions: '/solutions',
	Discourse: '/discourse',
};
