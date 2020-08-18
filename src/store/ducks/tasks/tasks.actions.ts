import api from '@/services/api';
import tasks from '.';

export const getTasksAction = () => dispatch => {
	dispatch(tasks.actions.setLoading(true));
	api.tasks
		.getTasks()
		.then(res => dispatch(tasks.actions.setTasks(res.data)))
		.catch(err => dispatch(dispatch(tasks.actions.setError(err))))
		.finally(() => dispatch(tasks.actions.setLoading(false)));
};

export const createTaskAction = (props: ITask) => dispatch => dispatch(tasks.actions.createTask(props));

export const updateTaskAction = (props: ITask) => dispatch => dispatch(tasks.actions.updateTask(props));

export const deleteTaskAction = (props: ITask) => dispatch => dispatch(tasks.actions.deleteTask(props));
