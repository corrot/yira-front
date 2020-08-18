import { createSlice, createSelector } from '@reduxjs/toolkit';

import { IRootStore } from '@/store/ducks/root-reducer';

import * as actions from './tasks.actions';

const initialState: ITasksState = {
	tasks: [],
	error: null,
	loading: false
};

// slice
const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks: (state, action) => ({ ...state, tasks: action.payload }),
		setError: (state, action) => ({ ...state, error: action.payload }),
		setLoading: (state, action) => ({ ...state, loading: action.payload }),
		createTask: (state, action) => ({ ...state, tasks: [...state.tasks, action.payload] }),
		updateTask: (state, action) => ({
			...state,
			tasks: [...state.tasks.filter(o => o.id !== action.payload.id), action.payload]
		}),
		deleteTask: (state, action) => ({ ...state, tasks: [...state.tasks.filter(o => o.id !== action.payload.id)] })
	}
});

// selectors
export const tasksSelector = {
	tasks: createSelector(
		(state: IRootStore) => state.tasks,
		tasks => tasks.tasks
	),
	error: createSelector(
		(state: IRootStore) => state.tasks,
		tasks => tasks.error
	),
	loading: createSelector(
		(state: IRootStore) => state.tasks,
		tasks => tasks.loading
	)
};

// actions
export const tasksAction = actions;

export default slice;
