import mongoose from 'mongoose';
import { config } from './config';

export async function connectDb() {
	return mongoose.connect(config.db.url);
}

export async function closeDb() {
	return mongoose.connection.close();
}
