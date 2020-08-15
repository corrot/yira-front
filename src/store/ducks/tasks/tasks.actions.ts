import api from '@/services/api';

export const getTasksAction = () => dispatch => {
	api.tasks
		.getTasks()
		.then()
		.catch();
};

export const createTaskAction = (props: ITask) => dispatch => {
	api.tasks
		.createTask()
		.then()
		.catch();
};

export const updateTaskAction = (props: ITask) => dispatch => {
	api.tasks
		.updateTask()
		.then()
		.catch();
};

export const deleteTaskAction = (props: ITask) => dispatch => {
	api.tasks
		.deleteTask()
		.then()
		.catch();
};
