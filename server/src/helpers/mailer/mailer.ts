import { ENV } from '../../common';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
	{
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: ENV.MAILER.ADDRESS,
			pass: ENV.MAILER.PASSWORD,
		},
	},
	{
		from: `Codetrainer <${ENV.MAILER.ADDRESS}>`,
	},
);

export interface IMessageMailer {
	to: string;
	subject: string;
	html: string;
}

export const mailer = (message: IMessageMailer) => {
	transporter.sendMail(message, (err: any, info: any) => {
		if (err) {
			throw new Error(`Something went wrong with sending email message to ${message.to}`);
		}
	});
};
