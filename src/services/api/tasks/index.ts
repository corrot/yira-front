import { get, post, put, del } from '../axios';

export default {
	getTasks: () => get<ITask[]>('/tasks'),
	createTask: (props: ITask) => post<ITask>('/create-task', props),
	updateTask: (props: ITask) => post<ITask>('/update-task', props),
	deleteTask: (props: ITask) => post<ITask>('/delete-task', props)
};
