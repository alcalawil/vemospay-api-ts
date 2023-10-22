import Joi from 'joi';

export const UserJoiSchema = Joi.object({
	fullName: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required()
});

export const UpdateUserJoiSchema = Joi.object({
	fullName: Joi.string().required()
});

export const LoginJoiSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
});
