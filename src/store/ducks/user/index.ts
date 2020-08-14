import { createSlice, createSelector } from '@reduxjs/toolkit';

import { IRootStore } from '@/store/ducks/root-reducer';

import { IUserState, ILoginAction } from './user.types';
import * as actions from './user.actions';

const initialState: IUserState = {
	authToken: null,
	loginFailed: false
};

// slice
const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: ILoginAction) => ({ ...state, authToken: action.payload.token }),
		logout: state => ({ ...state, authToken: null }),
		loginFailed: state => ({ ...state, loginFailed: true })
	}
});

// selectors
export const userSelector = {
	authToken: createSelector(
		(state: IRootStore) => state.user,
		user => user.authToken
	),
	isUserLoggenIn: createSelector(
		(state: IRootStore) => state.user,
		user => !!user.authToken
	)
};

// actions
export const userAction = actions;

export default slice;
