import { createUsersModule, type UsersModule } from './users';
import { Config } from '../shared/config';

export interface Modules {
	user: UsersModule;
}

export function createModules(config: Config): Modules {
	const user = createUsersModule(config);

	return { user };
}

export * from './users';
