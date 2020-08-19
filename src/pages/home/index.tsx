import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Api from '@/services/api';
import { Flex } from '@/styled/flex';
import useApi from '@/hooks/useApi';
import { useSelector, useDispatch } from 'react-redux';
import { tasksSelector, tasksAction } from '@/store/ducks/tasks';

import Modal from '@/components/library/modal';
import TaskForm from './components/TaskForm';
import { subMilliseconds } from 'date-fns';
import { StylesProvider } from '@material-ui/core';

import Table from '@/components/library/table';
import AddIcon from '@material-ui/icons/Add';

export const Home = () => {
	const { t } = useTranslation();
	// const [tasks] = useApi(Api.tasks.getTasks);
	const _tasks = useSelector(tasksSelector.tasks);

	const newTask = {
		id: 1,
		title: 'Task 1',
		dueDate: 'today',
		createDate: 'yesterday',
		isResolved: false,
		description: "<div style='font-weight: bold'>This is a sample description</div>"
	};
	const editedTask = {
		id: 1,
		title: 'Task 1 edited',
		dueDate: 'tomorrow',
		createDate: 'today',
		isResolved: false,
		description: "<div style='font-weight: bold'>This is a sample description</div>"
	};

	const dispatch = useDispatch();

	const createTask = props => {
		dispatch(tasksAction.createTaskAction(props));
	};
	const deleteTask = props => {
		dispatch(tasksAction.deleteTaskAction(props));
	};

	useEffect(() => {
		dispatch(tasksAction.getTasksAction());
	}, []);

	const headers = [
		// { selector: 'id', title: '#' },
		{ selector: 'title', title: 'Title' },
		{ selector: 'reporter', title: 'Reporter' },
		{ selector: 'dueDate', title: 'Due Date' },
		{ selector: 'createDate', title: 'Creation Date' },
		{ selector: 'isResolved', title: 'Status' },
		// { selector: 'description', title: 'Description' },
		{ selector: 'actions', title: '' }
	];

	const renderModalBody = () => <TaskForm submitAction={createTask} />;

	const createTaskModal = () => (
		<Modal
			buttonText={
				<div style={{ display: 'flex', fontSize: '18px', lineHeight: '28px' }}>
					<AddIcon /> <div>add</div>
				</div>
			}
			modalTitle="Create a new issue"
			modalBody={renderModalBody()}
		/>
	);

	return (
		<>
			<Table data={_tasks} headers={headers} createTaskModal={createTaskModal} />
		</>
	);
};

export default Home;
