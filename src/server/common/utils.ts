import { Response } from 'express';
import { ApiError } from '@types';

export function respondError(e: ApiError, res: Response) {
	console.log(e);

	if (e.httpCode) {
		return res.status(e.httpCode).json(e);
	}

	return res.status(500).json({ error: 'Internal Server Error' });
}
