import { ThunkA } from '@/types';
import storage from '@/utils/storage';

import user from '.';
import api from '@/services/api';
import { IAuthProps } from '@/services/api/user';

export const loginAction = (params: IAuthProps): ThunkA => dispatch => {
	api.user
		.authenticateUser(params)
		.then(res => {
			storage('authToken').set(res.data.token);
			dispatch(user.actions.login(res.data));
		})
		.catch(err => user.actions.loginFailed());
};

export const logoutAction = (): ThunkA => dispatch => {
	storage('authToken').unset();
	dispatch(user.actions.logout());
};
