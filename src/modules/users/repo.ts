import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from '@shared/errors';
import { UserModel } from './model';
import { User } from '@types';
import bcrypt from 'bcrypt';

export interface UsersRepo {
	createUser: (fullName: string, email: string, password: string) => Promise<User>;
	getUserByEmail: (email: string) => Promise<User>;
	updateUser: (userId: string, fullName: string) => Promise<User>;
}

export function newUsersRepo(): UsersRepo {
	async function createUser(fullName: string, email: string, password: string): Promise<User> {
		// hash password before saving
		try {
			const hashedPassword = await bcrypt.hash(password, 10);

			const UserDoc = new UserModel({
				fullName,
				email,
				password: hashedPassword
			});

			const user = await UserDoc.save();
			user.password = undefined;

			return user;
		} catch (e: any) {
			if (e.code === 11000) throw USER_ALREADY_EXISTS; // duplicate email

			throw e;
		}
	}

	async function getUserByEmail(email: string): Promise<User> {
		const user = await UserModel.findOne({ email }).select('+password').lean();
		if (!user) throw USER_NOT_FOUND;

		return user;
	}

	async function updateUser(userId: string, fullName: string): Promise<User> {
		const user = await UserModel.findByIdAndUpdate(userId, { fullName }, { new: true }).lean();
		if (!user) throw USER_NOT_FOUND;

		return user;
	}

	return {
		createUser,
		getUserByEmail,
		updateUser
	};
}
