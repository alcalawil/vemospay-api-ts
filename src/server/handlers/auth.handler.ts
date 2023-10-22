import { Request, Response } from 'express';
import { UsersModule } from '../../modules';
import { LoginJoiSchema } from '../common/validators';

export function newAuthHandler(usersMod: UsersModule) {
	async function login(req: Request, res: Response) {
		const b = req.body;

		try {
			// validate body
			const { error } = LoginJoiSchema.validate(b);
			if (error) return res.status(400).json({ error: error.details[0].message });

			const { user, token } = await usersMod.service.login(b.email, b.password);

			res.status(201).json({ user, token });
		} catch (e: any) {
			if (e.code === 'INVALID_AUTH_PARAMS') return res.status(401).json({ error: e });

			res.status(500).json({ error: e.message });
		}
	}

	return {
		login
	};
}
