import type { Config } from '../../shared/config';
import { newUsersRepo, type UsersRepo } from './repo';
import { newUsersService, type UsersService } from './users.service';
import { newAuthService, type AuthService } from './auth.service';

export interface UsersModule {
	repo: UsersRepo;
	service: UsersService & AuthService;
}

export function createUsersModule(config: Config): UsersModule {
	const repo = newUsersRepo();
	const authService = newAuthService(config, repo);
	const usersService = newUsersService(repo, authService);

	return {
		repo,
		service: {
			...usersService,
			...authService
		}
	};
}
