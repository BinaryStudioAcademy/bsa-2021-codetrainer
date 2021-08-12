export const getMailerTexts = {
	onSignUp: ({ name, surname }: { name?: string; surname?: string }) => {
		const userName = `${name ?? ''} ${surname ?? ''}`;
		const date = new Date();
		return `<h2>Congratulations!</h2><p>You, ${
			userName.trim().length ? userName : 'user'
		}, successfully did the registration on Codetrainer!</p><br><p>Hope you will learn a lot of new things!<p><br><br>This letter doesn't need a reply.<br>${date}`;
	},
	forgotPassword: ({ name, link }: { name: string; link: string }) => `<h2>Hi ${name || 'user'}</h2>

	<p>You requested to reset your password.</p>
	
	<p>Please, click the link below to reset your password</p>
	<a href=${link}>Reset Password</a>`,
};
