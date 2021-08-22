import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ENV } from '../../common';
import { User } from '../../data';
import { getMailerTexts } from './texts';

class Mailer {
	private getMailerTexts = getMailerTexts;

	private from = `Codetrain team - ${ENV.MAILER.ADDRESS}`;

	private getTransporter() {
		return createTransport({
			service: 'gmail',
			auth: {
				user: ENV.MAILER.ADDRESS,
				pass: ENV.MAILER.PASSWORD,
			},
		} as SMTPTransport.MailOptions);
	}

	async forgotPassword(email: string, payload: { name: string; link: string }) {
		return this.sendMail({
			from: this.from,
			to: email,
			subject: 'Reset Password',
			html: this.getMailerTexts.forgotPassword(payload),
		});
	}

	async signUp(user: User) {
		return this.sendMail({
			from: this.from,
			to: user.email,
			subject: 'Thank you for registration on Codetrainer!',
			html: this.getMailerTexts.onSignUp(user),
		});
	}

	async inviteToClan(fromUser: User, toUser: User) {
		return this.sendMail({
			from: this.from,
			to: toUser.email,
			subject: `Invitation to join ${fromUser.clan?.name} from your friend`,
			html: this.getMailerTexts.inviteToClan({toUser,fromUser})
		})
	}

	private async sendMail(options: Mail.Options) {
		try {
			const transport = this.getTransporter();
			await transport.sendMail(options);
			return { success: true };
		} catch (error) {
			throw new Error(error?.message ?? 'Send Error');
		}
	}
}

const mailer = new Mailer();

export { mailer };
