export const GET_MAILER_TEXTS = {
	ON_SIGNUP: (name: string, surname: string) => {
		const date = new Date();
		return `<h2>Congratulations!</h2><p>You, ${name} ${surname}, successfully did the registration on Codetrainer!</p><br><p>Hope you will learn a lot of new things!<p><br><br>This letter doesn't need a reply.<br>${date}`;
	},
};
