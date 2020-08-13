import { get, post } from '../axios';

import { IUser } from '@/types/models/user';

export interface IAuthProps {
	email: string;
	password: string;
}

export interface IRegisterProps {
	email: string;
	password: string;
	repeatPassword: string;
}

export default {
	getUsers: () => get<IUser[]>('users'),
	authenticateUser: ({ email, password }: IAuthProps) => post<IAuthProps>('/auth', { identifier: email, password }),
	registerUser: ({ email, password, repeatPassword }: IRegisterProps) =>
		post<IRegisterProps>('/register', { identifier: email, password, repeatPassword })
};
