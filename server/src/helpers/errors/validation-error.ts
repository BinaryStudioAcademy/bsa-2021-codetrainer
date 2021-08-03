import { CustomError } from './error';

export class ValidationError extends CustomError {
	protected status: number;

	constructor({ message, status = 400 }: { message: string; status: number }) {
		super(message);
		this.status = status;
	}
}
