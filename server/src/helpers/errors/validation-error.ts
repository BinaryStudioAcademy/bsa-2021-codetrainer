import { CustomError } from './error';

class ValidationError extends CustomError {
	protected status: number;

	constructor({ message, status = 400 }: { message: string; status: number }) {
		super(message);
		this.status = status;
	}
}
