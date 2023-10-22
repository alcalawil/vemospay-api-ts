import dotenv from 'dotenv';

dotenv.config();
const env = process.env;

if (!env.DB_URL) {
	throw new Error('DB_URL not set');
}

if (!env.JWT_SECRET_KEY) {
	throw new Error('JWT_SECRET_KEY not set');
}

export type Config = {
	server: {
		port: number;
	};
	db: {
		url: string;
	};
	auth: {
		secretKey: string;
	};
};

export const config: Config = {
	server: {
		port: Number(env.SERVER_PORT || 2023)
	},
	db: {
		url: env.DB_URL || 'mongodb://localhost:27017/myDb'
	},
	auth: {
		secretKey: env.JWT_SECRET_KEY
	}
};
