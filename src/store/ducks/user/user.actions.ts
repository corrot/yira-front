import { AxiosResponse } from 'axios';
import { ThunkA } from '@/types';

import storage from '@/utils/storage';

import user from '.';
import api from '@/services/api';
import { IAuthProps } from './user.types';
import { setAuthHeader, deleteAuthHeader } from '@/services/api/axios';

export const loginAction = (params: IAuthProps): ThunkA => dispatch => {
	api.user
		.authenticateUser(params)
		.then((res: AxiosResponse) => {
			storage('authToken').set(res.data.token);
			setAuthHeader(res.data.token);
			dispatch(user.actions.login(res.data));
		})
		.catch(err => user.actions.loginFailed(err));
};

export const logoutAction = (): ThunkA => dispatch => {
	storage('authToken').unset();
	deleteAuthHeader();
	dispatch(user.actions.logout());
};
