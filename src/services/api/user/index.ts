import { get, post } from '../axios';

import { IUser } from '@/types/models/user';
import { IAuthProps, IRegisterProps } from '@/store/ducks/user/user.types';

export default {
	// getUsers: () => get<IUser[]>('users'),
	authenticateUser: ({ email, password }: IAuthProps) => post<IAuthProps>('/auth', { identifier: email, password }),
	logout: () => {
		localStorage.removeItem('authToken');
	},
	registerUser: ({ email, password, repeatPassword }: IRegisterProps) =>
		post<IRegisterProps>('/register', { identifier: email, password, repeatPassword })
};
