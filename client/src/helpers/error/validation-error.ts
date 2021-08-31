import { AppError } from './app-error';

export class ValidationError extends AppError {
	status = 400;
	errors: Record<string, string>;
	constructor(errors: Record<string, string>) {
		super(errors?.message || 'validation error');
		this.errors = errors;
	}
}
