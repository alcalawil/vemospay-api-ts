import { Express } from 'express';
import { Modules } from '../../modules';
import { newAuthHandler, newUsersHandler } from '../handlers';
import { jwtAuth } from './middlewares';

export function createRoutes(mod: Modules, server: Express) {
	const usersHandler = newUsersHandler(mod.user);
	const authHandler = newAuthHandler(mod.user);

	server.post('/user', usersHandler.createUser);
	server.patch('/user', jwtAuth, usersHandler.updateUser);
	server.post('/auth/login', authHandler.login);
}
