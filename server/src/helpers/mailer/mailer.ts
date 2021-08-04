const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
	{
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: 'jerrod.kihn@ethereal.email',
			pass: 'wVmgeFA2kWjuaGv9gf',
		},
	},
	{
		from: 'Codetrainer, BSA <jerrod.kihn@ethereal.email>',
	},
);

export interface IMessageMailer {
	to: string;
	subject: string;
	text: string;
}

export const mailer = (message: IMessageMailer) => {
	transporter.sendMail(message, (err: any, info: any) => {
		if (err) {
			console.log(err);
		} else {
			console.log(info);
		}
	});
};
