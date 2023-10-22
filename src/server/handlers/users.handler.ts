import { Request, Response } from 'express';
import { UsersModule } from '../../modules';
import { UpdateUserJoiSchema, UserJoiSchema } from '../common/validators';
import { respondError } from '../common/utils';
import { INVALID_AUTH_PARAMS } from '@shared/errors';

export function newUsersHandler(usersMod: UsersModule) {
	async function createUser(req: Request, res: Response) {
		const b = req.body;

		try {
			// validate body
			const { error } = UserJoiSchema.validate(b);
			if (error) return res.status(400).json({ error: error.details[0].message });

			const user = await usersMod.service.createUser(b.fullName, b.email, b.password);
			const token = usersMod.service.createToken(user);

			res.status(201).json({ user, token });
		} catch (e: any) {
			respondError(e, res);
		}
	}

	async function updateUser(req: Request, res: Response) {
		try {
			const userId = req.tokenPayload?.userId;
			if (!userId) throw INVALID_AUTH_PARAMS;

			const { error } = UpdateUserJoiSchema.validate(req.body);
			if (error) return res.status(400).json({ error: error.details[0].message });

			const { fullName } = req.body;
			const user = await usersMod.service.updateUser(userId, fullName);
			res.status(200).json({ user });
		} catch (e: any) {
			respondError(e, res);
		}
	}

	return {
		createUser,
		updateUser
	};
}
