import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '@shared/config';
import { TokenPayload } from '@shared/types';

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header('Authorization')?.replace('Bearer ', '');
		if (!token) throw new Error('No token provided');

		jwt.verify(token, config.auth.secretKey, (err, decoded) => {
			if (err || !decoded) {
				throw new Error('Failed to authenticate token');
			}

			const payload = decoded as TokenPayload;
			req.tokenPayload = payload;

			return next();
		});
	} catch (e) {
		return res.status(401).send({ message: 'Invalid auth token' });
	}
};
