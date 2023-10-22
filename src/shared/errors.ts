import { ApiError } from './types';

export const INVALID_AUTH_PARAMS: ApiError = {
	code: 'INVALID_AUTH_PARAMS',
	message: 'Invalid email or password',
	httpCode: 401
};

export const USER_ALREADY_EXISTS: ApiError = {
	code: 'USER_ALREADY_EXISTS',
	message: 'User already exists',
	httpCode: 409
};

export const USER_NOT_FOUND: ApiError = {
	code: 'USER_NOT_FOUND',
	message: 'User not found',
	httpCode: 404
};
