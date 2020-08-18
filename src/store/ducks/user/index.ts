import { createSlice, createSelector } from '@reduxjs/toolkit';

import { IRootStore } from '@/store/ducks/root-reducer';

import { IUserState } from './user.types';
import * as actions from './user.actions';
import storage from '@/utils/storage';

const initialState: IUserState = {
	authToken: null,
	error: null,
	loading: false,
	userId: ''
};

// slice
const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => ({ ...state, authToken: action.payload.token }),
		logout: state => ({ ...state, authToken: null }),
		setError: (state, action) => ({ ...state, error: action.payload }),
		setLoading: (state, action) => ({ ...state, loading: action.payload })
	}
});

// selectors
export const userSelector = {
	authToken: createSelector(
		(state: IRootStore) => state.user,
		user => user.authToken
	),
	userId: createSelector(
		(state: IRootStore) => state.user,
		user => user.userId
	),
	isAuthenticated: createSelector(
		(state: IRootStore) => state.user,
		user => {
			return !!user.authToken || !!storage('authToken').get();
		}
	)
};

// actions
export const userAction = actions;

export default slice;
