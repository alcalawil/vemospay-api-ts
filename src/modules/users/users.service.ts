import { User } from '@shared/types';
import { AuthService } from './auth.service';
import { UsersRepo } from './repo';

export interface UsersService {
	createUser: (fullName: string, email: string, password: string) => Promise<User>;
	getUserByEmail: (email: string) => Promise<User>;
	updateUser: (userId: string, fullName: string) => Promise<User>;
}

export function newUsersService(repo: UsersRepo, authService: AuthService): UsersService {
	return {
		createUser: repo.createUser,
		getUserByEmail: repo.getUserByEmail,
		updateUser: repo.updateUser
	};
}
