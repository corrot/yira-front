import { createSlice, createSelector } from '@reduxjs/toolkit';

import { IRootStore } from '@/store/ducks/root-reducer';

import * as actions from './tasks.actions';
import storage from '@/utils/storage';

const initialState: ITasksState = {
	tasks: [];
};

// slice
const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		getTasks: (state, action) => ({ ...state, tasks: action.payload }),
	}
});

// selectors
export const userSelector = {
	tasks: createSelector(
		(state: IRootStore) => state.tasks,
		tasks => tasks
	)
};

// actions
export const tasksAction = actions;

export default slice;
