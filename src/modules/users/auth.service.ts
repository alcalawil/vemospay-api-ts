import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { User } from '@types';
import { INVALID_AUTH_PARAMS } from '@shared/errors';
import { Config } from '@shared/config';
import { UsersRepo } from './repo';

export interface AuthService {
	createToken: (user: User) => string;
	login: (email: string, password: string) => Promise<{ user: User; token: string }>;
}

export function newAuthService(config: Config, repo: UsersRepo): AuthService {
	function createToken(user: User): string {
		const secretKey = config.auth.secretKey;
		const jwtPayload = {
			userId: user._id,
			email: user.email,
			role: user.role
		};

		const token = jwt.sign(jwtPayload, secretKey, { expiresIn: '4h' });
		return token;
	}

	async function login(email: string, password: string): Promise<{ user: User; token: string }> {
		const user = await repo.getUserByEmail(email);
		if (!user) throw INVALID_AUTH_PARAMS;

		const match = await bcrypt.compare(password, user.password as string);
		if (!match) throw INVALID_AUTH_PARAMS;

		const token = createToken(user);

		return { user, token };
	}

	return {
		createToken,
		login
	};
}
