import mongoose, { Model, Schema } from 'mongoose';
import { User } from '@types';

const UserSchema = new Schema<User>(
	{
		fullName: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true, select: false }
	},
	{ timestamps: true, versionKey: false }
);

export const UserModel: Model<User> = mongoose.model('User', UserSchema);
