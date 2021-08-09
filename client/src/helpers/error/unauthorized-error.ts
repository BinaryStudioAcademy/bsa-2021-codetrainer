import { AppError } from './app-error';

export class UnauthorizedError extends AppError {
	status = 401;
}
