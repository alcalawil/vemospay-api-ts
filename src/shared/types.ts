export type ApiError = {
	code: string;
	message: string;
	httpCode?: number;
};

export enum Role {
	ADMIN = 'admin',
	USER = 'user',
	GUEST = 'guest'
}

export type User = {
	_id?: string;
	fullName: string;
	email: string;
	role: Role;
	verified?: boolean;
	password?: string;
	createdAt?: string;
	updatedAt?: string;
};

export type TokenPayload = {
	userId: string;
	email: string;
	role: Role;
};

// extend express request object
declare module 'express' {
	export interface Request {
		tokenPayload?: TokenPayload;
	}
}
